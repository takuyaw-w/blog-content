---
title: "random-password-generator"
description: "Deno Fresh、Preact、Deno Deployを使って作成した、ランダムパスワードとハッシュ値を生成するWebアプリです。文字種、ハッシュ方式、文字数、生成件数を指定し、生成結果を一覧表示・CSV出力できるようにしています。"
category: "Tool"
status: "Archived"
period: "2022"
tags: ["Deno", "Deno Deploy", "Fresh", "Preact", "TypeScript", "Password Generator"]
url: "https://random-passwd-gen-5yqpe3d6xccg.deno.dev/"
repository: "https://github.com/takuyaw-w/random-password-generator"
heroImage: "./assets/image.png"
heroImageAlt: "random-password-generatorのスクリーンショット"
order: 5
--------

`random-password-generator` は、ランダムなパスワードと、そのハッシュ値を生成するために作成したWebアプリです。

Deno FreshとPreactを使い、画面上からパスワードの文字種、ハッシュ方式、文字数、生成件数を指定できるようにしています。生成されたパスワードとハッシュ値はテーブルに表示し、必要に応じてCSVとして出力できる構成にしました。

また、Deno Deployを使って公開することも意識し、Deno上で動作するWebアプリケーションとして実装しました。

## 主な機能

* ランダムパスワードの生成
* 生成件数の指定
* パスワード長の指定
* 文字種の指定
* ハッシュ方式の指定
* 生成結果のテーブル表示
* 生成結果のCSVエクスポート

## 対応している文字種

* `hex`
* `base64`
* `url-safe`
* `numeric`
* `distinguishable`
* `ascii-printable`
* `alphanumeric`

## 対応しているハッシュ方式

* `bcrypto`
* `SHA-1`
* `SHA-256`
* `SHA-384`
* `SHA-512`

## 技術スタック

* Deno
* Deno Deploy
* Fresh
* Preact
* TypeScript
* Twind
* crypto_random_string
* bcrypt
* Web Crypto API

## 作成背景

パスワードや検証用の認証情報をまとめて生成したい場面を想定して作成しました。

単にランダム文字列を1つ生成するだけでなく、生成数、文字数、文字種、ハッシュ方式を画面から指定できるようにし、結果を一覧として確認できる形にしています。

## 実装で意識したこと

FreshのIslandとしてパスワード生成画面を実装し、画面上の入力値をPreactのstateで管理する構成にしました。

パスワード生成処理では、指定された文字種と文字数をもとにランダム文字列を生成し、選択された方式でハッシュ値を作成しています。生成結果は `password` と `hash` の組として保持し、テーブル表示とCSV出力の両方に利用しています。

また、Deno Deployでの公開を前提に、Deno/Freshの標準的な構成で動かせるようにしました。

## 学んだこと

Deno Freshでは、サーバーサイドのルーティングとクライアント側で動くIslandを分けて実装できます。

このプロジェクトでは、Freshの基本構成、Preactによるフォーム状態管理、Deno環境での外部モジュール利用、ブラウザ上でのCSVダウンロード処理を試しました。

また、Deno Deployを使うことで、Node.js向けのビルドやサーバー構築とは異なる形で、Denoアプリケーションを公開できることを確認しました。小さなアプリですが、Deno/FreshでインタラクティブなWebツールを作り、デプロイまで試したプロジェクトです。
