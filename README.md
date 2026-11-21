# storybook-sample

動画「Storybook 11 beta を既存アプリに入れて、AI に画面を1枚頼む」（ずんだもん・四国めたんの解説動画 storybook/no02）で案内しているサンプルです。
動画で試した流れを、手元で同じ順に追えるようにしてあります。

- `main` は **開始状態**です。Storybook はまだ入っていません。
- 各段の結果は **タグ**で辿れます（下の表）。
- 試した版は **Storybook `11.0.0-beta.3`**（beta）です。`package.json` に版を固定してあります。`@next` や `latest` は安定版のあとで指す先が変わるため、追う場合は固定した版を使ってください。

## 動画との対応

| 動画の段 | 人がすること | タグ | その段で変わったこと |
|---|---|---|---|
| 開始状態 | - | `main`（= `step0-start`） | Storybook 無し。部品 8 つ（Badge・Button・Card・Checkbox・EmptyState・Select・Spinner・TextField）に用途の1文（JSDoc）つき |
| 段1 入れる | `storybook init` の問いに答える | `step1-init` | Storybook 11 beta が入り、AI 用のスキル 7 本と `AGENTS.md` の節ができる |
| 段2 見本を起こす | 頼んだ文 1 つ目 → 印を外す | `step2-setup` | 既存の部品のストーリー（見本）が起きる。`ai-generated` の印は人が外した状態 |
| 段3 新しい画面を頼む | 頼んだ文 2 つ目 | `step3-list` | タスクの一覧画面とそのストーリー・テストが増える |
| 段4 確かめる | レビューのページを見る | （コードの変化なし） | AI が出すレビューのページを人が見る段。リポにはファイルが残りません |
| 段5 アプリにつなぐ | 頼んだ文 3 つ目 | `step5-connect` | 画面の切り替え・一覧のデータ読み込み・追加後に一覧へ戻る動き |

タグ間の差は `git diff step2-setup step3-list` のように見られます。

## 頼んだ3つの文

動画で AI（Claude Code）に渡した文は、次の3つだけです。逐語で、回を足したり途中で変えたりしていません。同じ文が [`prompts/`](prompts/) にもあります。

### 段2 `prompts/step2_setup.txt`

```
storybook-setup スキルを使って、このアプリに Storybook を整えてください。
```

### 段3 `prompts/step3_list.txt`

```
タスクの一覧画面を1枚作ってください。上に検索の入力欄と、状態（すべて・未完了・完了）の絞り込みを置いて、その下にタスクを並べてください。読み込み中、タスクがまだ1件もないとき、検索に当たるものがないときの表示もお願いします。
```

### 段5 `prompts/step5_connect.txt`

```
一覧をアプリにつなぎます。決めたのは次の3つです。
1. ルーターは入れません。画面の上に「一覧」と「追加」の切り替えを置き、最初は一覧を出してください。
2. 一覧のデータは src/api/tasks.ts の fetchTasks から読んでください。
3. 追加の画面でタスクを追加したら、一覧に戻してください。
```

段1（`storybook init`）は AI への依頼ではなく、人が端末で `npm create storybook@next -- --no-dev` を実行し、出てくる問いに答える段です（動画の時点で `@next` は 11.0.0-beta.3 を指していました。開発サーバーを立てないよう `--no-dev` を付けています）。動画では 3 つの問いにすべて既定の答え（onboarding は Yes・AI 機能は Yes・Playwright は Yes）を選びました。

## 手順

必要なもの: Node 22.12 以上（試した環境は Node 22）・npm。

### 開始状態を動かす（`main`）

```bash
git clone https://github.com/zun-tools/storybook-sample.git
cd storybook-sample
npm install
npm run dev      # 開発サーバー（http://localhost:5173）
npm run build    # 型と本番ビルドの確認
```

「牛乳を買う」のようなタスクを追加でき、ブラウザの localStorage に保存されます。

### 各段の結果を見る

```bash
git checkout step3-list
npm install
npm run storybook          # 見本帳を開く（http://localhost:6006）
npx playwright install chromium   # テストの初回だけ。ブラウザが無いと次が動きません
npx vitest run             # ストーリーのテスト
```

`step5-connect` ではアプリ本体（`npm run dev`）に一覧画面がつながっています。

### 自分で同じ流れを試す

`main` から Claude Code などの AI エージェントで、動画と同じ順に進めます。

1. `main` で `npm create storybook@11.0.0-beta.3 -- --no-dev` を実行し、問いに答える（動画では `@next`。いま `@next` が指す版は変わっている可能性があるため、版を固定して試す場合はこちら）。
2. 上の「段2」の文を渡す。終わったら、ストーリーの `tags: ['ai-generated']` を外すかどうかを自分で決める。
3. 「段3」の文を渡す。
4. AI が出したレビューのページで、変えた所を自分の目で確かめる。
5. 「段5」の文を渡す。

## 注意

- **AI の出力は毎回違います。** 動画では同じ手順を 2 回通しました。ファイルの構成・部品の数・見本の数・まとまりの題といった大筋は同じでしたが、名前やまとめの文、つなぎ方の細部は回ごとに少し違いました。このリポにあるのは、そのうちの 1 回目の結果です。同じ文を渡しても、同じファイルにはなりません。
- 部品の用途の1文（JSDoc）は、公式の Best practices の例にならって、動画の作り手が書いたものです。AI が作った物ではありません。
- Storybook 11 は beta です。コマンドや出力は安定版で変わる可能性があります。
- テストの初回は、依存の最適化のために、各ストーリーファイルの最初のテストだけが失敗することがあります。同じコマンドをもう一度走らせると通ります。
- スキルの中身（`.agents/skills/`・`.claude/skills/`）と `AGENTS.md` の節は、`storybook init` が生成した物をそのまま置いています。

## 使った版

| もの | 版 |
|---|---|
| Storybook | 11.0.0-beta.3 |
| Claude Code | 2.1.330 |
| モデル | claude-opus-5-5 |
| Node | v22.22.1 |
| React / Vite | 19.3.1 / 8.3.8 |
| TypeScript | 6.0.3 |
| Vitest | 4.1.11 |

試した日は 2026-11-21 です。

## ライセンス

[MIT](LICENSE)
