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

## 組織解剖 Cluster Anatomy

### 單位 Units

- 死亡名冊有份量:Google Brain(2023-04併入,合組Google DeepMind)
  ([blog](https://deepmind.google/blog/announcing-google-deepmind/))、
  DeepMind Health(2019-09轉入Google Health,終結咗DeepMind獨立
  health線)
  ([TechCrunch](https://techcrunch.com/2019/09/19/google-completes-controversial-takeover-of-deepmind-health/))、
  埋佢個Independent Review Panel(2019散 — 外部監察隨收購消失)
  ([Engadget](https://www.engadget.com/2019-04-15-google-deepmind-health-ai-review-board.html))
- **AlphaFold team — 攞完Nobel,2026年7月解散**,成員調去Gemini項目
  或Isomorphic Labs
  ([Engadget](https://www.engadget.com/2225849/google-shuts-down-alphafold/))
- 現役:AI Safety and Alignment organization(2024-02成立,整合
  present-day harms同frontier risks)
  ([TechCrunch](https://techcrunch.com/2024/02/21/google-deepmind-forms-a-new-org-focused-on-ai-safety/)),
  下轄AGI Safety & Alignment、Gemini Safety、Voices of All in Alignment
  ([Alignment Forum](https://www.alignmentforum.org/posts/79BPxvSsjzBkiSyTq/agi-safety-and-alignment-at-google-deepmind-a-summary-of))

### 揸Gate嘅手 The Hands on the Gate

- FSF 2.0寫明threshold觸發時由「appropriate corporate governance
  bodies」review — 冇named個人
  ([AGORA](https://agora.eto.tech/instrument/2040));
  AGI Safety Council由co-founder Shane Legg領導,Responsibility and
  Safety Council由COO co-chair
  ([blog](https://deepmind.google/blog/taking-a-responsible-path-to-agi/))
- 2026年8月Hassabis上調做chairman兼Alphabet chief scientist,
  Kavukcuoglu接日常
  ([Fortune](https://fortune.com/2026/08/05/demis-hassabis-steps-down-google-deepmind-ai-shakeup/))
- 最終控制喺成個lab之上:Alphabet創辦人Page同Brin經super-voting股份
  持有控制性投票權(2026年4月SEC文件)
  ([SEC](https://www.sec.gov/Archives/edgar/data/0001652044/000119312526257690/d159942d424b5.htm))
- 框架上面嗰層原則可以喺corporate level改寫:2025年2月Google刪走
  「唔用AI做武器」承諾
  ([Google blog](https://blog.google/technology/ai/responsible-ai-2024-report-ongoing-work/))
- 收購年代報導中嗰個「AGI ethics board」被指2019年仍擬於AGI出現時
  接管控制、名單從未公開
  ([9to5Google](https://9to5google.com/2019/03/18/deepmind-agi-control/));
  Google亦曾中止俾DeepMind更大自主權(獨立法律實體)嘅談判
  ([The Information](https://www.theinformation.com/briefings/7bb1b7))

### 隱形Cluster Invisible Clusters

- 2024年1月Alphabet終止同vendor Appen嘅合約 — 幫手訓練Bard/Search嘅
  數千contract workers隨之冚旗
  ([Analytics Vidhya](https://www.analyticsvidhya.com/blog/2024/01/google-cuts-off-bard-training-team-appen/) /
  [Vice](https://www.vice.com/en/article/google-cuts-search-results-algorithm-quality-rater-jobs-appen-contract/))
- Raters組織後2023年加薪至約$14-14.50/hr;六位公開發聲被炒嘅raters
  經union爭取後復職
  ([CWA](https://cwa-union.org/news/e-newsletter/2023-06-29) /
  [AWU](https://www.alphabetworkersunion.org/press/raters-reinstated))
- GlobalLogic(以數千US-based raters訓練Gemini嘅承包商)2025年8月
  裁200+ AI raters
  ([Yahoo](https://tech.yahoo.com/ai/articles/google-contractor-globallogic-laid-off-184236451.html))

### 出門把聲 Exit & Voice

- 報導(Business Insider,四位前員工):UK AI staff有noncompete條款
  限制過檔對手,部分獲「garden leave」— 支薪唔做嘢最長一年
  ([Business Today](https://www.businesstoday.in/technology/news/story/amid-ai-race-google-paying-deepmind-staff-to-do-nothing-for-a-year-what-is-it-garden-leave-471417-2025-04-09))

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
- FSF決策冇公開named signatory;三個safety council有冇試過真係block
  一個deployment — 唔知
- 2017年開嘅DeepMind Ethics & Society unit下落 — 查唔到
- 2026年8月領導層change之後FSF sign-off有冇跟住變 — 唔知

## 附錄 Addenda

> **吹水註**: 條royal road to AGI由賣廣告嘅錢鋪 — $2,947億ad revenue
> 養住一個唔使交數嘅lab。SCP宇宙搵唔到呢個設定,因為冇作者夠膽寫。

> **吹水註**: 連佢自己個about page都未知CEO換咗人。我哋唔笑,
> 我哋將佢寫入unknowns — 見證會嘅溫柔就係咁。
