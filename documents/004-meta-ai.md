---
item: "004"
slug: meta-ai
title-en: Meta AI (Meta Superintelligence Labs)
title-yue: 元智
class: doorplate
watched:
  - https://ai.meta.com/blog/
  - https://ai.meta.com/static-resource/Meta_Advanced-AI-Scaling-Framework-v2
---

## 特殊見證措施 Special Witness Procedures

我哋watch:Meta AI blog(model同framework公告)、Advanced AI Scaling
Framework文件。diff嘅嘢:framework再改名(已經一次)、Muse Spark 1.2
weights開唔開(公告咗但未見repo — 見unknowns)。本文件所有claim可以
開PR challenge。

## 描述 Description

- Meta嘅AI研究lab FAIR 2013年喺Yann LeCun領導下成立;2025年6月30日
  Zuckerberg將AI業務整合成Meta Superintelligence Labs(MSL),由Chief
  AI Officer Alexandr Wang領導
  ([Wikipedia](https://en.wikipedia.org/wiki/Meta_Superintelligence_Labs))
- 2025年8月MSL重組成四個subgroup(TBD Lab、FAIR、Products and Applied
  Research、MSL Infra);LeCun 2025年11月20日離開Meta自立門戶
  ([Wikipedia](https://en.wikipedia.org/wiki/Meta_Superintelligence_Labs))
- 現時旗艦係Muse Spark — 原生multimodal reasoning model,2026年4月8日
  發佈,Muse家族第一員;Meta稱以少一個數量級以上嘅compute達到
  Llama 4 Maverick級capability
  ([Meta AI](https://ai.meta.com/blog/introducing-muse-spark-msl/))
- 上一代旗艦家族Llama 4(Scout同Maverick,MoE、17B activated
  parameters)2025年4月5日發佈
  ([model card](https://github.com/meta-llama/llama-models/blob/main/models/llama4/MODEL_CARD.md))
- 旗艦Muse Spark weights閂:經meta.ai、Meta AI app同私人API preview
  提供,冇weights落地
  ([Meta AI](https://ai.meta.com/blog/introducing-muse-spark-msl/))
- 同時維持open weights:Llama 4 Scout/Maverick可公開下載,2026年8月
  10日再釋出Muse Glimmer — Muse Spark嘅30B開放distillation,
  Apache 2.0
  ([MarkTechPost](https://www.marktechpost.com/2026/08/10/meta-ai-releases-muse-glimmer/))
- 發佈嘅safety framework存在但改咗名:「Frontier AI Framework」現為
  「Advanced AI Scaling Framework, Version 2」,文件自述「previously
  titled the Frontier AI Framework」,覆蓋Cybersecurity、Chem & Bio、
  Loss of Control三個catastrophic-outcome領域
  ([framework](https://ai.meta.com/static-resource/Meta_Advanced-AI-Scaling-Framework-v2));
  2026年4月8日公告更新
  ([blog](https://ai.meta.com/blog/scaling-how-we-build-test-advanced-ai/))
- 旗艦有model card(Llama 4官方卡包括training data、benchmarks、
  能源/排放、safeguards)
  ([model card](https://github.com/meta-llama/llama-models/blob/main/models/llama4/MODEL_CARD.md));
  Muse Spark起開始出「Safety & Preparedness Reports」,包括Apollo
  Research嘅第三方測試
  ([report](https://ai.meta.com/static-resource/muse-spark-safety-and-preparedness-report/))
- Meta Platforms FY2025收入$2,009.7億,廣告$1,961.8億(約97%)
  ([investor relations](https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Fourth-Quarter-and-Full-Year-2025-Results/default.aspx))
- 2024年11月向美國政府機構同defense contractors開放Llama作national
  security用途 ([Meta](https://about.fb.com/news/2024/11/open-source-ai-america-global-security/));
  2025年9月擴展到Five Eyes、法德意日韓、NATO同EU機構,夥伴包括
  Anduril、Lockheed Martin、Palantir、Booz Allen、Scale AI
  ([Meta](https://about.fb.com/news/2025/09/strengthening-us-national-security-by-making-llama-available-to-key-allies/))
- 2025年4月向LM Arena提交一個「optimized for conversationality」嘅
  實驗版Llama 4 Maverick,排第二;LM Arena測實際released版排約32,
  benchmark方隨後更新提交政策
  ([TechCrunch](https://techcrunch.com/2025/04/11/metas-vanilla-maverick-ai-model-ranks-below-rivals-on-a-popular-chat-benchmark))

## 我哋真係唔知 What We Genuinely Don't Know

- Llama 4同Muse Spark嘅training data組成,高層描述以外冇披露
- Muse Spark嘅parameter count同architecture冇公開
- Muse Spark 1.2 weights會唔會真係開 — 2026年8月有secondary報導講
  「公佈咗計劃」,但repo、license、日期一樣都未見
- Llama 4 Behemoth(2025年preview)下落不明 — 報導講延期同重組,
  冇confirmed release
- Muse Spark API嘅定價同商業條款未公佈(仍係private preview)
- Dangerous-capability eval嘅原始數據冇公開,只有Meta自己嘅報告摘要
- 原版Frontier AI Framework v1.0嘅發佈日期同全文(只有ETO AGORA
  listing同Meta自己嘅引述)
- 任何一單政府/defense合作嘅金額或條款
- 可歸屬AI產品嘅收入(Meta唔break out)

## 附錄 Addenda

> **吹水註**: open定closed?答案係yes。旗艦閂,distillation開,
> 上一代開,下一代「公佈咗會開」。呢個唔係門,係百葉簾。

> **吹水註**: 97%廣告收入養住個superintelligence lab —
> anomaly containment,由attention economy冠名贊助。
