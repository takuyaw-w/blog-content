---
title: "vue3-uselist"
description: "Vue 3で配列状態を扱うための小さなComposableです。リストの状態管理と追加・削除・更新・並び替えなどの操作をまとめ、コンポーネント側の実装を簡潔に保つことを目的にしています。"
category: "Libraries"
status: "Active"
period: "2023"
tags: ["Vue", "TypeScript", "Composable", "npm", "Library"]
repository: "https://github.com/takuyaw-w/useList"
order: 1
--------

`vue3-uselist` は、Vue 3でリスト状態を扱うために作成したComposableです。

配列の状態を `ref` として保持し、要素の追加、削除、挿入、更新、絞り込み、並び替えといった操作を `actions` としてまとめています。コンポーネント内で配列操作の実装が散らばるのを避け、リスト操作の責務を小さなComposableに切り出すことを目的にしました。

## 主な機能

* 初期リストを受け取って、リアクティブな配列状態を作成
* `push` / `unshift` による要素追加
* `removeAt` / `insertAt` / `updateAt` によるインデックス指定の操作
* `filter` / `sort` によるリストの加工
* `clear` によるリスト初期化
* TypeScriptのジェネリクスを利用した型付きのリスト操作

## 技術スタック

* Vue 3
* TypeScript
* Vite
* npm package

## 作成背景

Vue 3のComposition APIで配列を扱う場面では、`ref` の更新処理や配列操作がコンポーネント内に散らばりやすくなります。

このライブラリでは、配列状態と操作メソッドをセットで返すことで、React Hooksに近い感覚でリスト操作を扱えるようにしています。小規模なユーティリティですが、Composableとして状態管理の責務を分離する実験として作成しました。

## 未対応だったこと

npm packageとして公開するにあたり、出力コードのマングル化にも関心がありました。

ただ、当時はViteのライブラリビルド、minify設定、型定義、外部公開APIの関係を十分に理解できず、マングル化までは対応できませんでした。

この経験を通じて、ライブラリ開発では実装だけでなく、ビルド成果物の形式や公開APIの扱いまで含めて理解する必要があると感じました。
