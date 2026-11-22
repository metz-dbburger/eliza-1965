# 和 1965 年的 ELIZA 聊天 · Chat with the 1965 ELIZA

[中文](#中文) | [English](#english)

在线地址 / Live: https://metz-dbburger.github.io/eliza-1965/

## 中文

一个单文件网页：用英文和 ELIZA 聊几句，每句回复都可以展开，看它命中了哪个关键词、用了哪条拆解和重组模板、记忆里存了几句、计数器走到第几格。

### 这里运行的是什么

- **剧本**：2021 年在 MIT 档案馆找到的打印件里、紧跟在 ELIZA 源码后面的 DOCTOR 剧本（`.TAPE. 100`）。页眉日期 03/06，推定为 1965 年 3 月 6 日，共 35 个关键词。魏岑鲍姆的遗产方以 CC0 开放。
- **引擎**：Anthony Hay 和 Max Hay 的 JavaScript 复刻（CC0）。`index.html` 里嵌入的是 [anthay/ELIZA](https://github.com/anthay/ELIZA) 中 `src/eliza.html` 1.00 版的第 39–976 行和第 1478–1943 行，没有改动。
- **这不是原始代码本身**。那 420 行左右的 MAD-SLIP 源码要在模拟的 IBM 7094 和 CTSS 上才能运行，见 [rupertl/eliza-ctss](https://github.com/rupertl/eliza-ctss)。

没有用 1966 年论文附录里的那份剧本，所以对 “Men are all alike.” 的回答和论文里的示例对话不同：1965 年这份剧本还没有 ALIKE 这个关键词。想试 1966 年的剧本，可以去 Hay 的页面 <https://anthay.github.io/eliza.html>。

### 核对

复原团队在模拟的 IBM 7094 上用原程序和这份剧本跑过一段对话，记录在 `eliza-ctss/etc/running-eliza.txt`。`test/acceptance.js` 从 `index.html` 里取出实际嵌入的引擎和剧本，喂入同样的 15 句输入，逐词比较回复：

```
git clone https://github.com/rupertl/eliza-ctss
node test/acceptance.js eliza-ctss/etc/running-eliza.txt
# opening line + 15 exchanges compared, mismatches: 0
```

比较时忽略标点前的空格（原机打印 `REALLY , EVERYONE`，这里是 `REALLY, EVERYONE`）。15 句一致不等于每种输入都一致。

### 和原机的差别

- 原机遇到带数字的输入可能崩溃或卡死，这里不会。
- 原机可以输入 `+` 进入修改剧本的模式，这里没有。
- 引擎实现的是 1966 年论文描述的 ELIZA，比 1965 年的源码多几项功能（关键词栈、NEWKEY、PRE）。这份剧本用不到它们。

### 来源与许可

- 原始源码（转录稿和扫描件）：<https://github.com/jeffshrager/elizagen.org/tree/master/1965_Weizenbaum_MAD-SLIP>，打印件扫描：<https://hdl.handle.net/1721.3/201699>
- 在模拟的 IBM 7094 上运行原程序：<https://github.com/rupertl/eliza-ctss>（它的 README 记录了遗产方以 CC0 开放源码一事）
- 引擎与剧本转录：<https://github.com/anthay/ELIZA>（CC0 1.0）
- 复原过程：Lane, Hay, Schwarz, Berry, Shrager, *ELIZA Reanimated*, [arXiv:2501.06707](https://arxiv.org/abs/2501.06707)

`index.html` 里嵌入的引擎和剧本来自上面的 CC0 来源，仍是 CC0。本仓库其余部分（界面、逐句拆解的代码、测试脚本）按 MIT 许可发布，见 [LICENSE](LICENSE)。

ELIZA 扮演的是一位心理咨询师，但它只是一段规则匹配程序，不能提供心理支持。页面不联网，输入的内容只在浏览器本地处理。

## English

A single-file web page. Type a sentence in English and ELIZA replies. Each reply can be expanded to show which keyword it hit, which decomposition and reassembly templates were applied, how many memories are stored, and where the counter stands. The page interface is in Chinese.

### What runs here

- **Script**: the DOCTOR script (`.TAPE. 100`) printed directly after the ELIZA source code in the listing found in Joseph Weizenbaum's MIT archive in 2021. The header date is 03/06, taken to be 6 March 1965. It has 35 keywords. The Weizenbaum estate released it under CC0.
- **Engine**: the JavaScript recreation by Anthony Hay and Max Hay (CC0). `index.html` embeds lines 39–976 and 1478–1943 of `src/eliza.html` version 1.00 from [anthay/ELIZA](https://github.com/anthay/ELIZA), unmodified.
- **This is not the original code itself.** The roughly 420 lines of MAD-SLIP only run on an emulated IBM 7094 with CTSS; see [rupertl/eliza-ctss](https://github.com/rupertl/eliza-ctss).

The script from the appendix of the 1966 CACM paper is not used, so the reply to “Men are all alike.” differs from the sample conversation in the paper: the 1965 script has no ALIKE keyword yet. To try the 1966 script, use Hay's page at <https://anthay.github.io/eliza.html>.

### Verification

The restoration team ran the original program with this script on an emulated IBM 7094 and kept the transcript in `eliza-ctss/etc/running-eliza.txt`. `test/acceptance.js` extracts the engine and the script from `index.html` exactly as shipped, feeds in the same 15 inputs, and compares the replies word for word:

```
git clone https://github.com/rupertl/eliza-ctss
node test/acceptance.js eliza-ctss/etc/running-eliza.txt
# opening line + 15 exchanges compared, mismatches: 0
```

Spaces before punctuation are ignored (the original prints `REALLY , EVERYONE`, this page prints `REALLY, EVERYONE`). Fifteen matching exchanges do not prove that every input behaves identically.

### Differences from the original program

- Input containing numbers may crash or hang the original. It does not here.
- The original lets you type `+` to enter a script-editing mode. That mode is not implemented here.
- The engine implements ELIZA as described in the 1966 paper, which has a few features the 1965 source lacks (keyword stack, NEWKEY, PRE). This script does not use them.

### Sources and licenses

- Original source (transcription and scan): <https://github.com/jeffshrager/elizagen.org/tree/master/1965_Weizenbaum_MAD-SLIP>; scan of the printout: <https://hdl.handle.net/1721.3/201699>
- Running the original on an emulated IBM 7094: <https://github.com/rupertl/eliza-ctss> (its README records the CC0 release by the Weizenbaum estate)
- Engine and script transcription: <https://github.com/anthay/ELIZA> (CC0 1.0)
- The restoration: Lane, Hay, Schwarz, Berry, Shrager, *ELIZA Reanimated*, [arXiv:2501.06707](https://arxiv.org/abs/2501.06707)

The engine and script embedded in `index.html` come from the CC0 sources above and remain CC0. Everything else in this repository (interface, per-reply breakdown code, test script) is released under the MIT License; see [LICENSE](LICENSE).

ELIZA plays a psychotherapist, but it is a rule-matching program and cannot provide mental-health support. The page makes no network requests; what you type stays in your browser.
