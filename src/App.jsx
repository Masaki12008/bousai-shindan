import { useState, useEffect } from "react";

const TRIVIA_LIST = [
  { icon: "💧", text: "水は1人1日最低3L必要。飲料用2L＋生活用1Lが目安。" },
  { icon: "🔦", text: "懐中電灯より「ランタン型」が便利。部屋全体を照らせるため避難所でも重宝する。" },
  { icon: "🍚", text: "アルファ米は水を注ぐだけで食べられる。温水なら15分、冷水なら60分で完成。" },
  { icon: "📱", text: "スマホのSOSモードを設定しておくと、緊急時にすぐ連絡できる。iPhoneは電源ボタン5回押し。" },
  { icon: "🔋", text: "モバイルバッテリーは半年に1回は充放電しないと性能が劣化する。定期メンテが大切。" },
  { icon: "🎒", text: "防災バッグは玄関に置くのが鉄則。寝室に置くと夜間の火災・地震で取り出せないことがある。" },
  { icon: "🚰", text: "浴槽に水を張る「お風呂の水はため置き」は断水対策に有効。トイレ用にも使える。" },
  { icon: "📻", text: "ラジオは電波が届く限り情報収集できる唯一のメディア。停電・通信障害時でも機能する。" },
  { icon: "🩹", text: "止血には清潔なタオルや布を傷口に押し当て、5〜10分圧迫し続けるのが基本。" },
  { icon: "🏠", text: "自宅の耐震チェックを。1981年以前の建物は旧耐震基準のため改修を検討すると安心。" },
  { icon: "💴", text: "停電時は電子マネー・クレジットカードが使えなくなる。千円札中心で2〜3万円の現金を。" },
  { icon: "🐾", text: "ペットとの同行避難を受け入れる避難所は限られる。事前に自治体のルールを確認しよう。" },
  { icon: "🌡️", text: "熱中症対策に経口補水液は必需品。水と塩と砂糖で自作もできる（水1L・砂糖40g・塩3g）。" },
  { icon: "🗺️", text: "ハザードマップは国土交通省の「重ねるハザードマップ」で自宅周辺を無料確認できる。" },
  { icon: "🔑", text: "家族の集合場所と連絡方法を事前に決めておく。災害用伝言ダイヤル「171」も覚えておこう。" },
];

const STEPS = [
  {
    id: "family",
    title: "家族構成",
    icon: "👨‍👩‍👧‍👦",
    questions: [
      {
        id: "count",
        label: "何人家族ですか？",
        type: "stepper",
        min: 1,
        max: 10,
        default: 2,
      },
      {
        id: "members",
        label: "家族の中にいる方を選んでください",
        type: "multi",
        options: [
          { value: "baby", label: "乳幼児（0〜3歳）", icon: "🍼" },
          { value: "child", label: "子ども（4〜12歳）", icon: "🧒" },
          { value: "elder", label: "高齢者（65歳以上）", icon: "👴" },
          { value: "pregnant", label: "妊婦・授乳中", icon: "🤱" },
          { value: "disabled", label: "障がい・持病あり", icon: "♿" },
          { value: "pet", label: "ペット", icon: "🐾" },
        ],
      },
    ],
  },
  {
    id: "housing",
    title: "住環境",
    icon: "🏠",
    questions: [
      {
        id: "housing_type",
        label: "住宅タイプは？",
        type: "single",
        options: [
          { value: "mansion_high", label: "マンション（4階以上）", icon: "🏢" },
          { value: "mansion_low", label: "マンション（3階以下）", icon: "🏬" },
          { value: "detached", label: "戸建て", icon: "🏠" },
        ],
      },
      {
        id: "risk",
        label: "お住まいの地域リスク（複数可）",
        type: "multi",
        options: [
          { value: "flood", label: "河川・洪水リスク", icon: "🌊" },
          { value: "tsunami", label: "津波・海岸沿い", icon: "🌏" },
          { value: "landslide", label: "土砂・山間部", icon: "⛰️" },
          { value: "quake", label: "地震リスク高め", icon: "🔴" },
          { value: "none", label: "特になし", icon: "✅" },
        ],
      },
    ],
  },
  {
    id: "current",
    title: "現在の備蓄",
    icon: "📦",
    questions: [
      {
        id: "days",
        label: "現在、何日分の備蓄がありますか？",
        type: "single",
        options: [
          { value: "0", label: "ほぼゼロ", icon: "😅" },
          { value: "1", label: "1〜2日分", icon: "🙂" },
          { value: "3", label: "3〜6日分", icon: "😊" },
          { value: "7", label: "7日分以上", icon: "💪" },
        ],
      },
      {
        id: "have",
        label: "すでに持っているものを選んでください",
        type: "multi",
        options: [
          { value: "water", label: "飲料水（ペットボトル）", icon: "💧" },
          { value: "food", label: "非常食・缶詰", icon: "🥫" },
          { value: "flashlight", label: "懐中電灯・ランタン", icon: "🔦" },
          { value: "radio", label: "ラジオ", icon: "📻" },
          { value: "firstaid", label: "救急セット", icon: "🩹" },
          { value: "blanket", label: "防災ブランケット", icon: "🛏️" },
          { value: "battery", label: "モバイルバッテリー", icon: "🔋" },
          { value: "bag", label: "防災バッグ", icon: "🎒" },
        ],
      },
    ],
  },
  {
    id: "style",
    title: "避難スタイル",
    icon: "🚶",
    questions: [
      {
        id: "evac_style",
        label: "主な避難スタイルは？",
        type: "single",
        options: [
          { value: "home", label: "在宅避難メイン", icon: "🏠" },
          { value: "shelter", label: "避難所メイン", icon: "🏫" },
          { value: "car", label: "車中泊メイン", icon: "🚗" },
          { value: "unknown", label: "まだ決めていない", icon: "🤔" },
        ],
      },
    ],
  },
];

const ITEM_DB = [
  {
    id: "water",
    name: "飲料水（2L×6本）",
    priority: "最重要",
    reason: "1人1日3Lが目安",
    icon: "💧",
    keyword: "防災 飲料水 備蓄",
  },
  {
    id: "food_staple",
    name: "アルファ米・乾パン（5日分）",
    priority: "最重要",
    reason: "火・水なしでも食べられる",
    icon: "🍚",
    keyword: "アルファ米 非常食 5年保存",
  },
  {
    id: "flashlight",
    name: "LEDランタン＋予備電池",
    priority: "最重要",
    reason: "停電時の照明",
    icon: "🔦",
    keyword: "防災 LEDランタン 電池式",
  },
  {
    id: "radio",
    name: "手回し充電ラジオ",
    priority: "高",
    reason: "停電時の情報収集",
    icon: "📻",
    keyword: "手回し ラジオ 防災 充電",
  },
  {
    id: "battery",
    name: "大容量モバイルバッテリー（20000mAh以上）",
    priority: "高",
    reason: "スマホ充電・通信維持",
    icon: "🔋",
    keyword: "モバイルバッテリー 20000mAh 防災",
  },
  {
    id: "firstaid",
    name: "救急セット",
    priority: "高",
    reason: "外傷・発熱対応",
    icon: "🩹",
    keyword: "防災 救急セット 応急処置",
  },
  {
    id: "blanket",
    name: "アルミ防災ブランケット（人数分）",
    priority: "高",
    reason: "低体温・防寒対策",
    icon: "🛏️",
    keyword: "防災 アルミブランケット 保温",
  },
  {
    id: "bag",
    name: "防水防災バッグ",
    priority: "高",
    reason: "避難時の持ち出しに必須",
    icon: "🎒",
    keyword: "防災バッグ 防水 リュック 非常持ち出し",
  },
  {
    id: "toilet",
    name: "携帯トイレ（30回分以上）",
    priority: "中",
    reason: "断水・避難所混雑時",
    icon: "🚽",
    keyword: "携帯トイレ 防災 凝固剤",
  },
  {
    id: "mask",
    name: "マスク・除菌ウェットティッシュ",
    priority: "中",
    reason: "衛生管理",
    icon: "😷",
    keyword: "防災 マスク 衛生 ウェットティッシュ",
  },
  {
    id: "gloves",
    name: "作業用手袋・ヘルメット",
    priority: "中",
    reason: "がれき撤去・頭部保護",
    icon: "🪖",
    keyword: "防災 ヘルメット 作業手袋",
  },
  {
    id: "cash",
    name: "小銭・現金（千円札中心）",
    priority: "中",
    reason: "停電時はカード使用不可",
    icon: "💴",
    keyword: null,
  },
  {
    id: "baby_food",
    name: "粉ミルク・離乳食（1週間分）",
    priority: "最重要",
    reason: "乳幼児がいる場合は必須",
    icon: "🍼",
    forMembers: ["baby"],
    keyword: "防災 粉ミルク 液体ミルク 備蓄",
  },
  {
    id: "diaper",
    name: "紙おむつ・おしりふき",
    priority: "最重要",
    reason: "乳幼児がいる場合は必須",
    icon: "👶",
    forMembers: ["baby"],
    keyword: "紙おむつ 防災 備蓄",
  },
  {
    id: "medicine",
    name: "常備薬・処方薬（2週間分）",
    priority: "最重要",
    reason: "持病・障がいがある場合",
    icon: "💊",
    forMembers: ["disabled", "elder"],
    keyword: "防災 薬 お薬手帳 コピー",
  },
  {
    id: "pad",
    name: "生理用品・産前産後用品",
    priority: "高",
    reason: "妊婦・授乳中の方に",
    icon: "🤱",
    forMembers: ["pregnant"],
    keyword: "防災 生理用品 母子手帳",
  },
  {
    id: "pet_food",
    name: "ペットフード・ケージ",
    priority: "高",
    reason: "ペット同行避難に対応",
    icon: "🐾",
    forMembers: ["pet"],
    keyword: "防災 ペット フード 避難 ケージ",
  },
  {
    id: "waterproof_bag",
    name: "防水ドキュメントケース",
    priority: "高",
    reason: "洪水・津波リスクがある地域に",
    icon: "📄",
    forRisk: ["flood", "tsunami"],
    keyword: "防水 書類ケース 防災",
  },
  {
    id: "lifejacket",
    name: "救命胴衣（ライフジャケット）",
    priority: "高",
    reason: "海岸・河川沿いは必携",
    icon: "🦺",
    forRisk: ["tsunami", "flood"],
    keyword: "ライフジャケット 防災 家庭用",
  },
  {
    id: "car_kit",
    name: "車載防災セット（ブースターケーブル等）",
    priority: "高",
    reason: "車中泊避難の方向け",
    icon: "🚗",
    forStyle: ["car"],
    keyword: "車載 防災セット 車中泊",
  },
  {
    id: "shelter_kit",
    name: "簡易テント・エアマット",
    priority: "中",
    reason: "避難所での快適性確保",
    icon: "⛺",
    forStyle: ["shelter"],
    keyword: "防災 簡易テント エアマット 避難所",
  },
];

const RAKUTEN_AFFILIATE_ID = "54457ec1.661a8d7b.54457ec2.a7f8b7fd";

function getRakutenUrl(keyword) {
  const searchUrl = encodeURIComponent(`https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/`);
  return `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=${searchUrl}`;
}

const AMAZON_ASSOCIATE_ID = "82dream-22";

function getAmazonUrl(keyword) {
  return `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}&tag=${AMAZON_ASSOCIATE_ID}`;
}

function generateRecommendations(answers) {
  const members = answers.members || [];
  const risks = answers.risk || [];
  const have = answers.have || [];
  const style = answers.evac_style;

  return ITEM_DB.filter((item) => {
    if (item.forMembers && !item.forMembers.some((m) => members.includes(m))) return false;
    if (item.forRisk && !item.forRisk.some((r) => risks.includes(r))) return false;
    if (item.forStyle && item.forStyle !== style && !item.forStyle.includes(style)) return false;
    return true;
  }).filter((item) => !have.includes(item.id));
}

const PRIORITY_COLOR = {
  最重要: { bg: "#FF4444", text: "#fff" },
  高: { bg: "#FF8C00", text: "#fff" },
  中: { bg: "#4CAF50", text: "#fff" },
};

export default function BousaiDiagnostic() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ count: 2, members: [], risk: [], have: [] });
  const [showResult, setShowResult] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [triviaIndex, setTriviaIndex] = useState(() => Math.floor(Math.random() * TRIVIA_LIST.length));
  const [triviaFade, setTriviaFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTriviaFade(false);
      setTimeout(() => {
        setTriviaIndex((i) => (i + 1) % TRIVIA_LIST.length);
        setTriviaFade(true);
      }, 400);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentStep = STEPS[step];
  const progress = ((step) / STEPS.length) * 100;

  function handleStepper(qid, val) {
    setAnswers((prev) => ({ ...prev, [qid]: Math.max(1, Math.min(10, val)) }));
  }

  function handleSingle(qid, val) {
    setAnswers((prev) => ({ ...prev, [qid]: val }));
  }

  function handleMulti(qid, val) {
    setAnswers((prev) => {
      const cur = prev[qid] || [];
      return {
        ...prev,
        [qid]: cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val],
      };
    });
  }

  function canNext() {
    const q = currentStep.questions;
    for (const question of q) {
      if (question.type === "single" && !answers[question.id]) return false;
    }
    return true;
  }

  async function handleFinish() {
    setShowResult(true);
    setAiLoading(true);
    const recs = generateRecommendations(answers);
    const prompt = `あなたは防災アドバイザーです。以下の情報をもとに、この家族に最適な防災準備についての短いアドバイス（200字以内）を日本語で書いてください。

家族情報:
- 人数: ${answers.count}人
- 家族構成の特徴: ${(answers.members || []).join(", ") || "なし"}
- 住宅タイプ: ${answers.housing_type || "未回答"}
- 地域リスク: ${(answers.risk || []).join(", ") || "特になし"}
- 現在の備蓄日数: ${answers.days || 0}日分
- 避難スタイル: ${answers.evac_style || "未定"}
- 不足しているアイテム数: ${recs.length}点

ポジティブで実践的なアドバイスをお願いします。`;

    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      setAiAnalysis(data.content?.[0]?.text || "");
    } catch {
      setAiAnalysis("アドバイスを取得できませんでした。");
    } finally {
      setAiLoading(false);
    }
  }

  const recommendations = generateRecommendations(answers);
  const urgent = recommendations.filter((i) => i.priority === "最重要");
  const high = recommendations.filter((i) => i.priority === "高");
  const medium = recommendations.filter((i) => i.priority === "中");

  if (showResult) {
    return (
      <div style={styles.container}>
        <div style={styles.resultWrap}>
          <div style={styles.resultHeader}>
            <div style={styles.resultIcon}>🛡️</div>
            <h1 style={styles.resultTitle}>あなたの防災診断結果</h1>
            <p style={styles.resultSub}>
              {answers.count}人家族 ・ 不足アイテム {recommendations.length}点
            </p>
          </div>

          {/* AIアドバイス */}
          <div style={styles.aiBox}>
            <div style={styles.aiLabel}>🤖 AIアドバイス</div>
            {aiLoading ? (
              <div style={styles.aiLoading}>
                <div style={styles.dot} />
                <div style={{ ...styles.dot, animationDelay: "0.2s" }} />
                <div style={{ ...styles.dot, animationDelay: "0.4s" }} />
              </div>
            ) : (
              <p style={styles.aiText}>{aiAnalysis}</p>
            )}
          </div>

          {/* リスト */}
          {[
            { items: urgent, label: "⚠️ 最重要 — 今すぐ揃えてください", color: "#FF4444" },
            { items: high, label: "🔶 優先度 高 — なるべく早めに", color: "#FF8C00" },
            { items: medium, label: "🟢 優先度 中 — 余裕があれば", color: "#4CAF50" },
          ].map(({ items, label, color }) =>
            items.length > 0 ? (
              <div key={label} style={styles.section}>
                <h2 style={{ ...styles.sectionTitle, color }}>{label}</h2>
                <div style={styles.itemGrid}>
                  {items.map((item) => (
                    <div key={item.id} style={styles.itemCard}>
                      <div style={styles.itemTop}>
                        <span style={styles.itemIcon}>{item.icon}</span>
                        <div>
                          <div style={styles.itemName}>{item.name}</div>
                          <div style={styles.itemReason}>{item.reason}</div>
                        </div>
                      </div>
                      {item.keyword && (
                        <div style={styles.shopLinks}>
                          <a
                            href={getRakutenUrl(item.keyword)}
                            target="_blank"
                            rel="noreferrer"
                            style={{ ...styles.shopBtn, background: "#BF0000" }}
                          >
                            楽天で探す
                          </a>
                          <a
                            href={getAmazonUrl(item.keyword)}
                            target="_blank"
                            rel="noreferrer"
                            style={{ ...styles.shopBtn, background: "#FF9900" }}
                          >
                            Amazonで探す
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}

          {recommendations.length === 0 && (
            <div style={styles.perfect}>
              🎉 素晴らしい！必要なものは揃っています。定期的な点検を続けましょう。
            </div>
          )}

          {/* 結果画面の豆知識 */}
          <div style={styles.triviaSectionWrap}>
            <h2 style={styles.triviaSectionTitle}>💡 防災豆知識一覧</h2>
            <div style={styles.triviaGrid}>
              {TRIVIA_LIST.map((t, i) => (
                <div key={i} style={styles.triviaCard}>
                  <span style={styles.triviaCardIcon}>{t.icon}</span>
                  <p style={styles.triviaCardText}>{t.text}</p>
                </div>
              ))}
            </div>
          </div>

          <button style={styles.retryBtn} onClick={() => { setShowResult(false); setStep(0); setAnswers({ count: 2, members: [], risk: [], have: [] }); setAiAnalysis(""); }}>
            ↩️ 最初からやり直す
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* ヘッダー */}
        <div style={styles.header}>
          <div style={styles.headerIcon}>🛡️</div>
          <h1 style={styles.title}>防災キット診断</h1>
          <p style={styles.subtitle}>あなたの家族に本当に必要なものがわかります</p>
        </div>

        {/* プログレス */}
        <div style={styles.progressWrap}>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
          <div style={styles.progressLabel}>
            STEP {step + 1} / {STEPS.length}
          </div>
        </div>

        {/* ステップ */}
        <div style={styles.stepHeader}>
          <span style={styles.stepIcon}>{currentStep.icon}</span>
          <h2 style={styles.stepTitle}>{currentStep.title}</h2>
        </div>

        {currentStep.questions.map((q) => (
          <div key={q.id} style={styles.question}>
            <p style={styles.qLabel}>{q.label}</p>

            {q.type === "stepper" && (
              <div style={styles.stepper}>
                <button style={styles.stepperBtn} onClick={() => handleStepper(q.id, (answers[q.id] || q.default) - 1)}>−</button>
                <span style={styles.stepperVal}>{answers[q.id] || q.default}</span>
                <button style={styles.stepperBtn} onClick={() => handleStepper(q.id, (answers[q.id] || q.default) + 1)}>＋</button>
              </div>
            )}

            {q.type === "single" && (
              <div style={styles.optionGrid}>
                {q.options.map((opt) => {
                  const selected = answers[q.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      style={{ ...styles.optionBtn, ...(selected ? styles.optionSelected : {}) }}
                      onClick={() => handleSingle(q.id, opt.value)}
                    >
                      <span style={styles.optIcon}>{opt.icon}</span>
                      <span style={styles.optLabel}>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {q.type === "multi" && (
              <div style={styles.optionGrid}>
                {q.options.map((opt) => {
                  const selected = (answers[q.id] || []).includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      style={{ ...styles.optionBtn, ...(selected ? styles.optionSelected : {}) }}
                      onClick={() => handleMulti(q.id, opt.value)}
                    >
                      <span style={styles.optIcon}>{opt.icon}</span>
                      <span style={styles.optLabel}>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {/* 豆知識 */}
        <div style={{ ...styles.triviaBox, opacity: triviaFade ? 1 : 0 }}>
          <div style={styles.triviaLabel}>💡 防災豆知識</div>
          <div style={styles.triviaContent}>
            <span style={styles.triviaIcon}>{TRIVIA_LIST[triviaIndex].icon}</span>
            <p style={styles.triviaText}>{TRIVIA_LIST[triviaIndex].text}</p>
          </div>
          <div style={styles.triviaDots}>
            {TRIVIA_LIST.map((_, i) => (
              <span
                key={i}
                style={{ ...styles.triviaDot, ...(i === triviaIndex ? styles.triviaDotActive : {}) }}
                onClick={() => { setTriviaFade(false); setTimeout(() => { setTriviaIndex(i); setTriviaFade(true); }, 200); }}
              />
            ))}
          </div>
        </div>

        {/* ナビ */}
        <div style={styles.nav}>
          {step > 0 && (
            <button style={styles.backBtn} onClick={() => setStep((s) => s - 1)}>← 戻る</button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              style={{ ...styles.nextBtn, opacity: canNext() ? 1 : 0.4 }}
              disabled={!canNext()}
              onClick={() => setStep((s) => s + 1)}
            >
              次へ →
            </button>
          ) : (
            <button
              style={{ ...styles.nextBtn, background: "linear-gradient(135deg, #FF4444, #FF8C00)" }}
              onClick={handleFinish}
            >
              診断結果を見る 🛡️
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #0a0a1a 0%, #1a1a2e 50%, #0d1b2a 100%)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "24px 16px",
    fontFamily: "'Hiragino Sans', 'Noto Sans JP', sans-serif",
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 24,
    padding: "32px 28px",
    width: "100%",
    maxWidth: 560,
  },
  header: {
    textAlign: "center",
    marginBottom: 28,
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 6px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    margin: 0,
  },
  progressWrap: {
    marginBottom: 28,
  },
  progressBar: {
    height: 4,
    background: "rgba(255,255,255,0.1)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #FF4444, #FF8C00)",
    borderRadius: 4,
    transition: "width 0.4s ease",
  },
  progressLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    textAlign: "right",
  },
  stepHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  stepIcon: { fontSize: 28 },
  stepTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#fff",
    margin: 0,
  },
  question: { marginBottom: 24 },
  qLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 12,
    fontWeight: 500,
  },
  stepper: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  stepperBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    fontSize: 22,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  stepperVal: {
    fontSize: 32,
    fontWeight: 800,
    color: "#fff",
    minWidth: 48,
    textAlign: "center",
  },
  optionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  optionBtn: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.8)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
    textAlign: "left",
    transition: "all 0.2s",
  },
  optionSelected: {
    background: "rgba(255,68,68,0.2)",
    border: "1px solid rgba(255,68,68,0.6)",
    color: "#fff",
  },
  optIcon: { fontSize: 20 },
  optLabel: { fontSize: 13, fontWeight: 500, lineHeight: 1.3 },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 12,
  },
  backBtn: {
    padding: "12px 20px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "transparent",
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    cursor: "pointer",
  },
  nextBtn: {
    flex: 1,
    padding: "14px 24px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #FF4444, #FF8C00)",
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  // Result styles
  resultWrap: {
    width: "100%",
    maxWidth: 620,
  },
  resultHeader: {
    textAlign: "center",
    marginBottom: 24,
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 24,
  },
  resultIcon: { fontSize: 52, marginBottom: 8 },
  resultTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 6px",
  },
  resultSub: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    margin: 0,
  },
  aiBox: {
    background: "linear-gradient(135deg, rgba(100,100,255,0.15), rgba(255,100,100,0.1))",
    border: "1px solid rgba(150,150,255,0.3)",
    borderRadius: 16,
    padding: "16px 20px",
    marginBottom: 20,
  },
  aiLabel: {
    fontSize: 12,
    color: "rgba(200,200,255,0.7)",
    fontWeight: 700,
    marginBottom: 8,
    letterSpacing: 1,
  },
  aiLoading: {
    display: "flex",
    gap: 6,
    alignItems: "center",
    padding: "8px 0",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "rgba(200,200,255,0.7)",
    animation: "bounce 1.2s infinite",
  },
  aiText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 1.7,
    margin: 0,
  },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  itemGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  itemCard: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: "14px 16px",
  },
  itemTop: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 10,
  },
  itemIcon: { fontSize: 24, marginTop: 2 },
  itemName: {
    fontSize: 14,
    fontWeight: 600,
    color: "#fff",
    marginBottom: 2,
  },
  itemReason: {
    fontSize: 12,
    color: "rgba(255,255,255,0.45)",
  },
  shopLinks: {
    display: "flex",
    gap: 8,
  },
  shopBtn: {
    padding: "7px 14px",
    borderRadius: 8,
    border: "none",
    color: "#fff",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
  },
  perfect: {
    textAlign: "center",
    padding: 32,
    fontSize: 16,
    color: "#4CAF50",
    background: "rgba(76,175,80,0.1)",
    borderRadius: 16,
    border: "1px solid rgba(76,175,80,0.3)",
    marginBottom: 20,
  },
  retryBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "transparent",
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    cursor: "pointer",
    marginTop: 8,
  },
  // 豆知識（診断中）
  triviaBox: {
    background: "rgba(255,220,50,0.06)",
    border: "1px solid rgba(255,220,50,0.2)",
    borderRadius: 14,
    padding: "14px 16px",
    marginBottom: 20,
    transition: "opacity 0.4s ease",
  },
  triviaLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "rgba(255,220,50,0.7)",
    letterSpacing: 1,
    marginBottom: 8,
  },
  triviaContent: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
  },
  triviaIcon: {
    fontSize: 22,
    flexShrink: 0,
    marginTop: 1,
  },
  triviaText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    lineHeight: 1.65,
    margin: 0,
  },
  triviaDots: {
    display: "flex",
    gap: 5,
    marginTop: 10,
    justifyContent: "center",
  },
  triviaDot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: "rgba(255,220,50,0.2)",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  triviaDotActive: {
    background: "rgba(255,220,50,0.7)",
  },
  // 豆知識（結果画面）
  triviaSectionWrap: {
    marginBottom: 20,
  },
  triviaSectionTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: "rgba(255,220,50,0.85)",
    marginBottom: 12,
  },
  triviaGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 8,
  },
  triviaCard: {
    background: "rgba(255,220,50,0.05)",
    border: "1px solid rgba(255,220,50,0.15)",
    borderRadius: 12,
    padding: "12px 14px",
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
  },
  triviaCardIcon: {
    fontSize: 20,
    flexShrink: 0,
    marginTop: 1,
  },
  triviaCardText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 1.6,
    margin: 0,
  },
};
