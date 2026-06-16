---
title: "Tsuzuru"
description: "TypeScriptで作成した、ブラウザ向けノベルゲームを構築するためのビジュアルノベルエンジンです。読みやすい.tzrシナリオDSL、framework-neutralなcore runtime、Vite連携、Preactベースの公式UI、標準プラグイン群を提供しています。"
category: "Game Engine"
status: "In Development"
period: "2026"
tags: ["TypeScript", "Game Engine", "Visual Novel", "Preact", "Vite"]
url: ""
repository: "https://github.com/tsuzuru-engine/tsuzuru"
order: 7
---

`Tsuzuru` は、ブラウザで動くノベルゲームを作るためのTypeScript製ビジュアルノベルエンジンです。

現在は開発中のプロジェクトであり、成熟したノベルゲームエンジンとして安定運用する段階ではありません。使い方や提供する機能は、今後の開発に合わせて変わる前提で扱っています。

物語の流れは読みやすい `.tzr` シナリオファイルで記述し、runtime behavior、描画、プラグイン、アセット解決、保存方針、アプリ画面はTypeScript側で扱う設計になっています。汎用スクリプト言語や既存エンジンのcloneではなく、parse、validate、compileしやすい小さなシナリオDSLとして設計している点が特徴です。

## 主な機能

- インデントベースの `.tzr` シナリオDSL
- `title`、`character`、`include`、`scene`、dialogue、narration、choice、conditional choice、`jump`、`wait`、`end` の記述
- `parseTzr`、`compileTzr`、`compileTzrProject` を含むcore parser、compiler、runtime
- runtime stepping、choices、jumps、waits、snapshots、restore helpers
- `.tzr` をViteアプリからcompiled runtime documentとしてimportするVite plugin
- `tsuzuru check` によるシナリオ検証CLI
- Preact runtime adapterと `RuntimeView`
- 再利用可能な標準UIコンポーネントと `TsuzuruGame` starter component
- standard、classic、dark novel、minimalの公式テーマ
- visual、audio、text-sound、effect、camera、particle、system向けの標準プラグイン
- preferences、read tracking、save slot store、standard runtime save adapterを提供するstorage helpers
- Vite + Preact starterを生成する `create-tsuzuru`

## 技術スタック

- TypeScript
- pnpm workspace
- Vite
- Preact
- Vitest
- Playwright
- Biome
- CSS

## 作成背景

ノベルゲームでは、シナリオの読みやすさとアプリケーションとしての拡張性を両立する必要があります。

すべてをシナリオファイルに閉じ込めると、実装の自由度は下がります。一方で、すべてをTypeScriptコードだけで書くと、物語の流れを読みづらくなります。Tsuzuruでは、シナリオの記述とruntime、UI、プラグイン、保存処理の責務を分けることで、物語を編集しやすくしながら、Webアプリとしての実装も保てる形を目指しました。

## 実装で意識したこと

リポジトリは `packages/*` と `examples/*` を持つpnpm workspaceとして構成しています。

`@tsuzuru/core` は、Preact、DOM、CSS、Vite、browser storage、asset loadingから独立したparser、compiler、runtime層です。その上に、Vite plugin、CLI、Preact adapter、standard UI、theme packages、standard plugin packagesを重ねる構成にしています。

公式starterでは、`scenario/main.tzr` に物語とscene flowを書き、`src/assets.ts` でscenario asset IDsと実ファイルを対応させます。

`tsuzuru.config.ts` ではscenario files、compile-time plugins、project identity、storage settingsを定義します。ゲーム固有のSave / Load、Settings、Backlog、Galleryなどはapplication code側の責務として残しています。

## 学んだこと

ゲームエンジンでは、機能を増やすことよりも、責務の境界を明確にすることが重要だと分かりました。

シナリオDSL、runtime、UI adapter、standard UI、plugin、storage helperを分けることで、それぞれの変更理由を小さくできます。また、starterやexamplesを用意することで、core runtimeの抽象だけでなく、実際にノベルゲームとして動く形まで検証できることを確認できました。
