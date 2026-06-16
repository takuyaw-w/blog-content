---
title: "resume-jp"
description: "DenoとTypeScriptで作成した、日本語の職務経歴書・スキルシートをJSON、JSONC、YAMLで管理し、HTMLやPDFへ出力するCLIツールです。入力データの検証、ローカルプレビュー、編集用UI、複数テーマによる出力に対応しています。"
category: "Tool"
status: "Active"
period: "2026"
tags: ["Deno", "TypeScript", "CLI", "Resume", "Vue"]
repository: "https://github.com/takuyaw-w/resume-jp"
order: 6
---

`resume-jp` は、日本語の職務経歴書やスキルシートを構造化データとして管理し、HTMLやPDFへ出力するためのCLIツールです。

履歴書や職務経歴書は、内容の更新、レイアウト調整、PDF化を手作業で行うと差分管理が難しくなります。このツールでは、プロフィール、スキル、職務経歴などをJSON、JSONC、YAMLで管理し、テーマを通して出力する構成にしています。

## 主な機能

- JSON、JSONC、YAMLによる入力データ管理
- スターターファイルの生成
- スキーマによる入力データの検証
- HTML出力
- PDF出力
- ローカルプレビューサーバー
- 入力データを編集するためのローカルUI
- `jp-basic`、`jp-modern` の組み込みテーマ
- ローカルパスや外部モジュールによるカスタムテーマ指定

## 技術スタック

- Deno
- TypeScript
- Cliffy
- Hono
- Zod
- Preact
- Puppeteer Core
- Vue 3
- Vite
- Vuetify

## 作成背景

職務経歴書やスキルシートは、応募先や用途に応じて少しずつ内容を変えたくなる資料です。

一方で、ドキュメントファイルを直接編集していると、どこを変えたのか、どの内容が最新なのかを追いにくくなります。そこで、データと表示テーマを分け、入力内容はテキストとして管理し、出力だけをツール側で行う形にしました。

## 実装で意識したこと

リポジトリはDeno workspaceとして構成し、CLI、core、types、theme-api、組み込みテーマ、編集用UIをパッケージ単位で分けています。

CLIでは `init`、`validate`、`export`、`preview`、`ui` の各コマンドを用意しました。入力ファイルは拡張子をもとにJSON、JSONC、YAMLを読み分け、Zodによる検証を通してから正規化とレンダリングへ渡す流れにしています。

PDF出力ではChromeまたはChromiumを使うため、自動検出に加えて `--browser-path` や `RESUME_JP_CHROME_PATH` で明示指定できるようにしています。また、テーマは組み込みIDだけでなく、ローカルパスや外部モジュールも指定できるようにし、出力レイアウトを差し替えられる構造にしました。

## 学んだこと

履歴書や職務経歴書のような文書を扱う場合、単にHTMLを生成するだけでなく、入力スキーマ、出力テーマ、PDF化、プレビュー、編集補助をまとめて設計する必要があります。

また、CLIとUIを同じデータモデルの上に置くことで、ターミナルからの自動化と画面上での編集を両立しやすくなることを確認できました。
