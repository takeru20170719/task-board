# CLAUDE.md

このファイルは、本プロジェクト(task-board)で作業する際のガイドラインです。

## プロジェクト概要

タスク管理ボード(task-board)アプリケーション。
タスクの作成・編集・削除、ステータス(例: 未着手 / 進行中 / 完了)間の移動を行う。

## 技術スタック

- フレームワーク: React 18(関数コンポーネント + Hooks)
- ビルドツール: Vite 5(`@vitejs/plugin-react`)
- 言語: JavaScript(JSX)
- スタイル: 素のCSS(`src/App.css`)
- データ保存: ブラウザの localStorage(キー: `task-board:tasks`)
- CI/CD: GitHub Actions(`.github/workflows/deploy.yml`)

### 主なコマンド

- `npm install` : 依存パッケージのインストール
- `npm run dev` : 開発サーバー起動(http://localhost:5173/)
- `npm run build` : 本番ビルド(`dist/` に出力)
- `npm run preview` : ビルド結果のプレビュー

## ディレクトリ構成

- `src/main.jsx` : エントリーポイント
- `src/App.jsx` : アプリ本体(現状は単一コンポーネント)
- `src/App.css` : スタイル
- `vite.config.js` : Vite設定(`base: '/task-board/'`)

## コンポーネントの命名規約

- コンポーネント名は PascalCase にする(例: `TaskList`, `TaskItem`, `AddTaskForm`)。
- コンポーネントのファイルは `.jsx` 拡張子とし、ファイル名はコンポーネント名と一致させる(例: `TaskItem.jsx`)。
- 1ファイルにつき1つのコンポーネントを `export default` する。
- カスタムフック(Hooks)は `use` で始まる camelCase にする(例: `useTasks`)。
- イベントハンドラ関数は動詞から始める(例: `addTask`, `toggleTask`, `deleteTask`)。
- 変数・関数は camelCase、定数は UPPER_SNAKE_CASE にする(例: `STORAGE_KEY`)。
- CSSクラス名は kebab-case にする(例: `task-list`, `add-form`)。状態を表すクラスは `done` のように短い形容詞で付ける。
- コンポーネントが増えた場合は `src/components/` に配置し、専用のCSSがあれば同名で並べる(例: `TaskItem.css`)。

## デプロイ先

https://takeru20170719.github.io/task-board/

- GitHub Pages に公開する。`main` にプッシュすると GitHub Actions が自動でビルド&デプロイする。
- Vite の `base` は `/task-board/` に設定済み。リポジトリ名を変える場合は `vite.config.js` も合わせて変更する。

## 開発ルール

- 回答・コミットメッセージ・コメントは原則として日本語で記述する。
- 変更は必要最小限にとどめ、既存のコードスタイルに合わせる。
- 新機能やバグ修正には、可能な限りテストを追加・更新する。
- 秘密情報(APIキー、パスワード、`.env` など)はコミットしない。`.gitignore` で除外する。

## Git運用ルール

- **コードを変更するたびに、変更をコミットして GitHub にプッシュする。**
  - 作業をまとめて溜め込まず、意味のある単位(1機能・1修正ごと)で小まめにコミット&プッシュする。
- コミット前に `git status` と `git diff` で変更内容を確認する。
- コミットメッセージは変更内容が分かるよう簡潔に書く(例: `タスク追加フォームを実装`)。
- `main` ブランチへの直接プッシュを避けたい場合は、作業ブランチを切ってプッシュし、Pull Request を作成する。
- 強制プッシュ(`git push --force`)や履歴の書き換えは、明示的な指示がない限り行わない。
- プッシュ前にテストやビルドが通ることを確認する(テストがある場合)。

## 補足

- リモートリポジトリ(GitHub)が未設定の場合は、最初にユーザーへ URL を確認してから `git remote add origin <URL>` で設定する。
