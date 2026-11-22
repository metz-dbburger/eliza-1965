// Acceptance test for index.html.
//
// It pulls the engine and the script text out of index.html exactly as shipped, feeds the
// engine the inputs from a transcript recorded on the ORIGINAL MAD-SLIP ELIZA running on
// CTSS, and checks that every reply matches word for word. Spaces before punctuation are
// ignored: the original prints "REALLY , EVERYONE", this engine prints "REALLY, EVERYONE".
//
// Usage:
//   git clone https://github.com/rupertl/eliza-ctss
//   node test/acceptance.js eliza-ctss/etc/running-eliza.txt
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const transcriptPath = process.argv[2];
if (!transcriptPath) {
  console.error('usage: node test/acceptance.js <path to eliza-ctss/etc/running-eliza.txt>');
  process.exit(2);
}

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const tapeMatch = /<script type="text\/plain" id="tape100">([\s\S]*?)<\/script>/.exec(html);
const engineMatch = /<script>\s*(\/\* -+\s*ELIZA engine by Anthony Hay[\s\S]*?)<\/script>/.exec(html);
if (!tapeMatch || !engineMatch) {
  console.error('could not find the script text or the engine block in index.html');
  process.exit(2);
}

const ctx = { console, setTimeout, TextEncoder };
vm.createContext(ctx);
vm.runInContext(engineMatch[1] + '\n;globalThis.__api = { readScript, Eliza, nullTracer, join };', ctx);
const { readScript, Eliza, nullTracer, join } = ctx.__api;

const [status, script] = readScript(tapeMatch[1]);
if (status !== 'success') {
  console.error('script did not load: ' + status);
  process.exit(2);
}

const norm = s => s.replace(/\s+/g, ' ').replace(/ ([.,?!])/g, '$1').trim();
const all = fs.readFileSync(transcriptPath, 'utf8').split('\n');
const from = all.findIndex(l => l.includes('script 100'));
const to = all.findIndex(l => l.includes('script 200'));
if (from < 0 || to < 0) {
  console.error('transcript does not have the expected "script 100" and "script 200" sections');
  process.exit(2);
}
const seg = all.slice(from, to);
const i100 = seg.findIndex(l => l.trim() === '100');
const firstInput = seg.findIndex(l => l.trim() === 'INPUT');
const helloExpected = norm(seg.slice(i100 + 1, firstInput).join(' '));

const pairs = [];
for (let i = firstInput; i < seg.length; i++) {
  if (seg[i].trim() !== 'INPUT') continue;
  const input = seg[i + 1];
  if (input === undefined || input.trim() === '') continue;
  const reply = [];
  for (let j = i + 2; j < seg.length && seg[j].trim() !== 'INPUT'; j++) {
    if (seg[j].trim() !== '') reply.push(seg[j]);
  }
  if (reply.length) pairs.push([input, norm(reply.join(' '))]);
}

(async () => {
  const eliza = new Eliza(script.rules, script.memoryRule, new nullTracer(), 500);
  let bad = 0;
  const hello = norm(join(script.helloMessage));
  if (hello !== helloExpected) { bad++; console.log('DIFF opening line\n  got      ' + hello + '\n  expected ' + helloExpected); }
  for (const [input, expected] of pairs) {
    const got = norm(await eliza.response(input));
    if (got !== expected) { bad++; console.log('DIFF ' + input + '\n  got      ' + got + '\n  expected ' + expected); }
  }
  console.log('opening line + ' + pairs.length + ' exchanges compared, mismatches: ' + bad);
  process.exit(bad ? 1 : 0);
})();
