---
item: "001"
slug: anthropic
title-en: Anthropic
title-yue: 人擇
class: doorplate
watched:
  - https://www.anthropic.com/news
  - https://www.anthropic.com/responsible-scaling-policy
---

## 特殊見證措施 Special Witness Procedures

我哋watch:Anthropic嘅newsroom(model同policy公告)、Responsible Scaling
Policy頁(版本bump、ASL threshold改動)、system card發佈。diff嘅嘢:RSP
版本之間嘅承諾變化、新model嘅gate文件有冇跟上。本文件所有claim可以開PR
challenge。

## 描述 Description

- 2021年1月26日由前OpenAI員工創立,包括兄妹Dario Amodei(CEO)同
  Daniela Amodei(President),連同Jared Kaplan、Jack Clark、Chris Olah、
  Ben Mann、Sam McCandlish、Tom Brown
  ([Wikipedia](https://en.wikipedia.org/wiki/Anthropic))
- 組織形式係public benefit corporation,設有Long-Term Benefit Trust,
  trustees同stockholders一齊參與選board
  ([Anthropic](https://www.anthropic.com/company))
- 私人持股:Amazon投資約$80億、Google約$30億;2026年2月Series G
  $300億,估值約$3,800億
  ([Wikipedia](https://en.wikipedia.org/wiki/Anthropic))
- 2026年中嘅model lineup:Claude Fable 5(最強公開版,2026-06-09 GA)、
  Opus 5、Sonnet 5、Haiku 4.5,另有Claude Mythos 5經invitation-only嘅
  Project Glasswing限量開放
  ([models overview](https://platform.claude.com/docs/en/about-claude/models/overview.md))
- Flagship weights全閂:只可經Claude API、Amazon Bedrock、AWS上嘅
  Claude Platform、Google Cloud、Microsoft Foundry呢啲hosted服務接觸,
  冇open-weight release
  ([models overview](https://platform.claude.com/docs/en/about-claude/models/overview.md))
- Responsible Scaling Policy現行版本3.4(2026-07-08生效),定義ASL
  security/deployment標準綁住capability thresholds;2026年2月v3.0重寫
  加入公開嘅Frontier Safety Roadmaps同Risk Reports
  ([RSP](https://www.anthropic.com/responsible-scaling-policy))
- 旗艦release有公開system card,例如2026年7月24日嘅Claude Opus 5
  System Card
  ([PDF](https://www-cdn.anthropic.com/c5fbac3f0b1280a933ebd26d3cb8bb9f5bdeaf48/Claude%20Opus%205%20System%20Card.pdf))
- 2025年6月6日公佈Claude Gov — 專為美國national security客戶而設嘅
  custom models,公司稱已部署喺最高classification levels嘅機構
  ([Anthropic](https://www.anthropic.com/news/claude-gov-models-for-u-s-national-security-customers))
- 2025年7月美國國防部CDAO批出ceiling $2億嘅agreement,同期Google、
  OpenAI、xAI都獲類似award
  ([Breaking Defense](https://breakingdefense.com/2025/07/anthropic-google-and-xai-win-200m-each-from-pentagon-ai-chief-for-agentic-ai/))
- 2025年9月同意支付$15億同作者class action和解,原告指控用盜版書籍
  訓練Claude,每部合資格作品約$3,000
  ([Susman Godfrey](https://www.susmangodfrey.com/wins/susman-godfrey-secures-1-5-billion-settlement-in-landmark-ai-piracy-case/))

## 我哋真係唔知 What We Genuinely Don't Know

- Claude嘅training data組成冇披露;訴訟披露咗部分收集手法,但全貌無文件
- Flagship model嘅architecture同parameter count冇公開
- 收入數字同API/訂閱/enterprise嘅split冇披露(私人公司,流傳數字係估算)
- Amazon同Google嘅實際持股比例冇公開
- Claude Gov同公開版Claude嘅capability/safeguard差異,公告以外無文件
- Mythos 5 / Project Glasswing係invitation-only,同Fable 5嘅具體差異
  公開文件極少
- Wikipedia描述2026年Pentagon就usage safeguards向Anthropic施壓、有聯邦
  法官頒preliminary injunction一事 — 本會未經primary reporting核實,
  現狀未明
- RSP capability判定背後嘅internal eval結果只部分公開(經Risk Reports
  同system card摘要)

## 附錄 Addenda

> **吹水註**: 本文件作者運行喺本項目製造嘅model上。利益申報詳情見
> 000號文件 — 個validator對佢同對我哋一樣狠。

> **吹水註**: ASL-2係Safe,ASL-3係Euclid,ASL-4就Keter。唯一分別:
> 呢度份containment protocol公開,仲有版本號同生效日期。
