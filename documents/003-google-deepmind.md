---
item: "003"
slug: google-deepmind
title-en: Google DeepMind
title-yue: 深念
class: doorplate
watched:
  - https://deepmind.google/models/model-cards/
  - https://deepmind.google/blog/
---

## 特殊見證措施 Special Witness Procedures

我哋watch:model card index(新release有冇卡)、DeepMind blog(Frontier
Safety Framework版本變動)。diff嘅嘢:FSF嘅capability level定義改動、
model card覆蓋率。本文件所有claim可以開PR challenge。

## 描述 Description

- DeepMind 2010年喺倫敦由Demis Hassabis、Shane Legg、Mustafa Suleyman
  創立;2014年1月被Google收購,報導作價$4億至$6.5億之間
  ([Wikipedia](https://en.wikipedia.org/wiki/Google_DeepMind))
- 2023年4月同Google Brain合併成Google DeepMind,成為Alphabet內單一
  AI unit ([DeepMind](https://deepmind.google/about/))
- 2026年8月,Hassabis卸任CEO轉任unit chairman兼Alphabet chief
  scientist,報導指CTO Koray Kavukcuoglu接手日常領導、向Sundar Pichai
  匯報 ([Fortune](https://fortune.com/2026/08/05/demis-hassabis-steps-down-google-deepmind-ai-shakeup/))
- 2026年8月嘅旗艦家族係Gemini 3系;models頁以Gemini 3.7 Flash做最新
  workhorse,旁邊有Gemini Omni、Veo、Imagen、Genie 3同開放嘅Gemma線
  ([models](https://deepmind.google/models/))
- 公開model card index列出現行Gemini 3系release:3.7 Flash、3.6 Flash、
  3.5 Flash、3.1 Pro
  ([model cards](https://deepmind.google/models/model-cards/))
- 旗艦Gemini weights閂:經hosted付費API按token收費(如Gemini 3.7 Flash
  $0.75/1M input tokens至2026年底),冇weights落地
  ([pricing](https://ai.google.dev/gemini-api/docs/pricing))
- 閂住嘅Gemini旁邊有開放嘅Gemma家族,models頁形容Gemma 4係「most
  intelligent open models」
  ([models](https://deepmind.google/models/))
- Frontier Safety Framework現行v3.1(2025-09-22公佈),加入Harmful
  Manipulation critical capability level同misalignment protocols;
  2026-04-17更新引入Tracked Capability Levels
  ([blog](https://deepmind.google/blog/strengthening-our-frontier-safety-framework/)),
  全文公開PDF
  ([FSF v3.1](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf))
- 冇獨立revenue — 由Alphabet內部供養;Alphabet FY2025 10-K報收入
  $4,028億,其中Google advertising $2,947億、Cloud $587億
  ([10-K](https://www.sec.gov/Archives/edgar/data/1652044/000165204426000018/goog-20251231.htm))
- 2025年8月21日GSA公佈「Gemini for Government」OneGov協議,聯邦機構
  以每機構$0.47用到2026年底
  ([GSA](https://www.gsa.gov/about-gsa/newsroom/news-releases/gsa-google-announce-gemini-onegov-agreement-08212025))
- 2017年7月英國ICO裁定Royal Free NHS Trust向DeepMind分享約160萬病人
  紀錄(Streams app)違反Data Protection Act,病人未被充分告知;冇罰款
  ([TechCrunch](https://techcrunch.com/2017/07/03/uk-data-regulator-says-deepminds-initial-deal-with-the-nhs-broke-privacy-law/))

## 我哋真係唔知 What We Genuinely Don't Know

- Gemini旗艦嘅training data組成冇披露
- 旗艦release嘅compute規模同訓練成本冇披露
- Google DeepMind自身財務(收入、成本、headcount經濟)喺Alphabet公開
  報告中冇break out
- FSF capability evaluation有冇獨立audit/external verification,框架
  文件冇講
- Model card同FSF摘要以外嘅完整dangerous-capability eval結果冇公開
- 2014年收購嘅確實作價 — 只有報導範圍,無primary filing
- 可歸屬於Google DeepMind嘅defense合約 — 本會只核實到民用GSA協議
- 佢個about頁截至fetch當日仲寫住Hassabis係CEO,同8月嘅領導層報導
  有出入 — 邊個啱,等佢update先知

## 附錄 Addenda

> **吹水註**: 條royal road to AGI由賣廣告嘅錢鋪 — $2,947億ad revenue
> 養住一個唔使交數嘅lab。SCP宇宙搵唔到呢個設定,因為冇作者夠膽寫。

> **吹水註**: 連佢自己個about page都未知CEO換咗人。我哋唔笑,
> 我哋將佢寫入unknowns — 見證會嘅溫柔就係咁。
