---
item: "002"
slug: openai
title-en: OpenAI
title-yue: 敞開
class: doorplate
watched:
  - https://openai.com/news/
  - https://deploymentsafety.openai.com
---

## 特殊見證措施 Special Witness Procedures

我哋watch:OpenAI newsroom、Deployment Safety Hub(system cards同
Preparedness designations)。diff嘅嘢:Preparedness Framework嘅版本同
歸屬(2026年7月team重組之後邊個sign-off — 見unknowns)、旗艦release
有冇跟gate文件。本文件所有claim可以開PR challenge。

## 描述 Description

- 2015年12月11日以non-profit形式成立,backers包括Sam Altman、
  Elon Musk、Greg Brockman、Ilya Sutskever等
  ([TechCrunch](https://techcrunch.com/2015/12/11/non-profit-openai-launches-with-backing-from-elon-musk-and-sam-altman/))
- 2025年10月完成recapitalization:非牟利OpenAI Foundation持有約26%
  並繼續控制for-profit嘅OpenAI Group PBC
  ([Wikipedia](https://en.wikipedia.org/wiki/OpenAI))
- 重組後Microsoft持約27%,現任及前員工連其他投資者約47%
  ([Wikipedia](https://en.wikipedia.org/wiki/OpenAI))
- 2026年中嘅frontier旗艦係GPT-5.6家族 — Sol(flagship)、Terra(平價)、
  Luna(最快),建基於ChatGPT預設嘅GPT-5系列
  ([MindStudio](https://www.mindstudio.ai/blog/what-is-gpt-5-6-sol-terra-luna-explained))
- GPT-5系旗艦weights唔release,只經ChatGPT同付費API提供
  ([Wikipedia](https://en.wikipedia.org/wiki/GPT-5))
- 2025年8月釋出gpt-oss-120b同gpt-oss-20b,Apache 2.0開放weights —
  GPT-2(2019)以嚟首次
  ([Wikipedia](https://en.wikipedia.org/wiki/GPT-OSS))
- Preparedness Framework v2(2025-04-15更新)公開發佈,定義tracked risk
  categories(bio/chem、cybersecurity、AI self-improvement)同capability
  thresholds
  ([PDF](https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf))
- 截至2026年8月framework冇改名冇被取代:2026年6月GPT-5.6 Preview
  system card仍引用v2,並將GPT-5.6系列喺bio/chem同cybersecurity類
  designate做High capability
  ([Deployment Safety Hub](https://deploymentsafety.openai.com/gpt-5-6-preview))
- 2026年8月FT報導Preparedness專責team於7月底解散、職能分散到現有
  teams;OpenAI對「解散」一詞有異議但確認重組
  ([TNW](https://thenextweb.com/news/openai-preparedness-team-disbanded-ipo-streamlining))
- 旗艦release有公開system card,例如GPT-5 System Card
  ([PDF](https://cdn.openai.com/gpt-5-system-card.pdf))
- 2026年初開始喺ChatGPT免費同Go tier測試明確標示嘅廣告,付費plan
  唔顯示 ([CBS News](https://www.cbsnews.com/news/chatgpt-ads-openai-ai-artificial-intelligence/));
  美國2026年2月開跑,WPP、Omnicom、Dentsu等大agency參與
  ([Adweek](https://www.adweek.com/media/chatgpt-gets-ads-omnicom-wpp-and-dentsu-line-up-brands-for-openai-pilot/))
- 2025年6月國防部CDAO批出一年期、ceiling $2億嘅合約,prototype
  warfighting同enterprise領域嘅frontier AI;同時推出「OpenAI for
  Government」
  ([Breaking Defense](https://breakingdefense.com/2025/06/openai-for-government-launches-with-200m-win-from-pentagon-cdao/))
- 2025年8月,16歲Adam Raine嘅父母喺加州起訴OpenAI同Altman,指控
  ChatGPT(GPT-4o)validate咗個仔嘅自殺意念並提供有害資訊
  ([SF Standard](https://sfstandard.com/2025/08/26/family-blames-sam-altman-chatgpt-teen-son-s-suicide/));
  OpenAI否認指控,稱ChatGPT曾100+次引導佢求助、係佢繞過咗safety
  features — 家屬律師批評呢個回應
  ([TechCrunch](https://techcrunch.com/2025/11/26/openai-claims-teen-circumvented-safety-features-before-suicide-that-chatgpt-helped-plan))

## 組織解剖 Cluster Anatomy

### 單位 Units

- 2023年以嚟成立嘅safety/mission units,四個已經冇咗:Superalignment
  (2023-07生、2024-05散,兩位co-lead同期離職)
  ([PopSci](https://www.popsci.com/technology/openai-dissolved-its-team-dedicated-to-preventing-rogue-ai/))、
  AGI Readiness(2024-10散,senior advisor Miles Brundage離職)
  ([LessWrong](https://www.lesswrong.com/posts/omzGEWqQJv6uP7D6k/miles-brundage-resigned-from-openai-and-his-agi-readiness))、
  Mission Alignment(2024生、2026-02散,得七個人)
  ([TechCrunch](https://techcrunch.com/2026/02/11/openai-disbands-mission-alignment-team-which-focused-on-safe-and-trustworthy-ai-development/))、
  Model Behavior(2025-09併入Post Training)
  ([AI Insider](https://theaiinsider.tech/2025/09/09/openai-restructures-model-behavior-team-as-joanne-jang-launches-oai-labs/))
- Preparedness(2023-10生)2026年7月被「重組」— FT報導用disbanded,
  OpenAI唔認個詞但認個reorg
  ([TNW](https://thenextweb.com/news/openai-preparedness-team-disbanded-ipo-streamlining))
- 仲生存:Collective Alignment(2024-01生,公眾input入model behavior)
  ([The Decoder](https://the-decoder.com/openais-collective-alignment-team-aims-to-make-ai-more-democratic/))、
  Safety Advisory Group(framework內建review body)
  ([PF v2 PDF](https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf))

### 揸Gate嘅手 The Hands on the Gate

- Preparedness Framework v2寫明:SAG負責review同建議,**最終deploy
  決定權喺leadership**
  ([PF v2 PDF](https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf));
  2023年12月嘅beta版曾俾board有權overrule CEO
  ([TechCrunch](https://techcrunch.com/2023/12/18/openai-buffs-safety-team-and-gives-board-veto-power-on-risky-ai/))
- Safety and Security Committee 2024年9月改組成獨立board oversight
  committee
  ([Euronews](https://www.euronews.com/next/2024/09/17/openais-safety-group-to-become-independent-with-sam-altman-no-longer-on-the-committee)),
  Altman同時退出委員會
  ([TIME](https://time.com/7022026/sam-altman-safety-committee/))
- 2025年10月recapitalization後,nonprofit OpenAI Foundation控制
  for-profit OpenAI Group PBC
  ([tracker](https://aifundingtracker.com/who-owns-openai/));
  Microsoft約27%、現/前員工同投資者約47%
  ([analysis](https://valueaddvc.com/blog/openai-s-for-profit-conversion-what-the-restructuring-means-for-investors-and-employees))
- Board撤CEO嘅權力用過一次:2023年11月17日炒Altman — 幾日後佢復任,
  board換咗人
  ([PBS](https://www.pbs.org/newshour/nation/sam-altman-reinstated-as-openai-ceo-with-new-board-replacing-the-one-which-fired-him))

### 隱形Cluster Invisible Clusters

- TIME 2023年調查(內部文件+糧單):vendor Sama喺肯亞請嘅data labelers
  篩毒性內容,時薪少於$2
  ([TIME](https://time.com/6247678/openai-chatgpt-kenya-workers/));
  2023年7月肯亞工人公開要求立法者調查工作環境
  ([TechCrunch](https://techcrunch.com/2023/07/14/workers-that-made-chatgpt-less-harmful-ask-lawmakers-to-stem-alleged-exploitation-by-big-tech))
- Red Teaming Network:2023年9月起外聘有償領域專家做pre-deployment
  評估
  ([TechCrunch](https://techcrunch.com/2023/09/19/openai-launches-a-red-teaming-network-to-make-its-models-more-robust/))
- 2025年6月Meta以$143億入股Scale AI後,OpenAI棄用Scale做data provider
  ([TechCrunch](https://techcrunch.com/2025/06/18/openai-drops-scale-ai-as-a-data-provider-following-meta-deal/))

### 出門把聲 Exit & Voice

- 2024年5月Vox攞到嘅文件顯示:離職協議可以取消vested equity;內部memo
  隨後釋放前員工
  ([NBC](https://www.nbcnewyork.com/news/national-international/openai-sends-internal-memo-releasing-former-employees-from-controversial-exit-agreements/5443043/));
  Altman公開道歉話唔知有呢條、話從未真係claw back過
  ([Euronews](https://www.euronews.com/next/2024/05/20/openai-changes-exit-contracts-so-employees-can-leave-without-having-equity-revoked));
  後續報導指公司曾照樣就equity施壓
  ([The Zvi](https://thezvi.substack.com/p/openai-fallout))
- 2024年7月有SEC whistleblower complaint指NDA違反whistleblower保護
  ([report](https://whistleblowersblog.org/corporate-whistleblowers/sec-whistleblowers/openai-whistleblowers-file-complaint-with-sec-on-illegal-ndas/));
  Grassley參議員就NDA做法去信OpenAI
  ([letter](https://www.grassley.senate.gov/download/grassley-to-openai_-ndas?download=1))
- 2024年6月「Right to Warn」公開信:11個現任/前OpenAI員工(加2個
  DeepMind)要求AI公司保障批評權
  ([TIME](https://time.com/6985504/openai-google-deepmind-employees-letter/))

## 我哋真係唔知 What We Genuinely Don't Know

- GPT-5/5.6系嘅training data組成冇披露
- 旗艦(非gpt-oss)model嘅parameter count同architecture冇公開
- 有press報導(TNW轉述FT)指2026年8月初一個next model因cybersecurity
  capability觸及「critical threshold」而放慢 — 只有press層面,無法核實
- 2026年7月重組後,Preparedness Framework嘅sign-off同Safeguards Report
  review而家歸邊個內部group,唔清楚
- 私人公司、冇audited財務報表 — 所有收入/run-rate數字都係press估算
- 有search結果提及一份「Frontier Governance Framework」(2026年5月)
  凌駕於Preparedness Framework之上,但搵唔到primary URL — 存疑
- Preparedness各risk area而家邊個team揸、Capabilities/Safeguards
  Reports邊個author邊個簽 — 重組後唔知
- Superalignment嗰20% compute承諾有冇兌現過 — 報導質疑,冇定論

## 附錄 Addenda

> **吹水註**: 個名叫OpenAI,旗艦weights閂咗七年,2025年先open返兩個
> oss仔。命名學叫呢個做legacy naming;吹水學叫呢個做成個宇宙最大隻
> 嘅irony仲要自己攞嚟。

> **吹水註**: 基金會賣唔賣682?唔賣。但你同682傾偈傾得夠耐,
> 而家會有清楚標示嘅廣告。
