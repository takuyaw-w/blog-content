# blog-content

この Repo は、Astro ブログテンプレートへ同期するブログ本文と画像だけを管理します。Astro アプリ本体は別 Repo にあり、この Repo では Markdown、画像、textlint 設定を扱います。

## ディレクトリ

- `blog/`: 記事本文と記事ごとの画像を管理します。
- `projects/`: 制作物・個人開発のコンテンツを管理します。
- `about/`: プロフィール・ブログ説明を管理します。

## 同期先

- `blog/` は Astro テンプレート Repo の `src/content/blog/` へ同期されます。
- `projects/` は Astro テンプレート Repo の `src/content/projects/` へ同期されます。
- `about/` は Astro テンプレート Repo の `src/content/about/` へ同期されます。

記事画像は各記事ディレクトリの `assets/` に配置し、Markdown からは相対パスで参照します。

## 記事作成ルール

- 記事ごとに `blog/YYYY/MM/slug/` ディレクトリを作成します。
- 記事本文は `blog/YYYY/MM/slug/index.md` または `blog/YYYY/MM/slug/index.mdx` に作成します。
- 記事画像は `blog/YYYY/MM/slug/assets/` に配置します。
- 本文から記事画像を参照する場合は `./assets/image-name.jpg` のように相対パスを使います。
- frontmatter には `title`、`description`、`category`、`tags`、`draft`、`pubDate`、`updatedDate` を設定します。
- `heroImage` を使う場合も、記事ディレクトリ内の画像を相対パスで指定します。
- `draft: true` の記事は本番公開対象外です。

## 制作物作成ルール

- 制作物・個人開発の本文は `projects/*.md` に作成します。
- 表示順を制御する場合は frontmatter の `order` を設定します。
- frontmatter には `title`、`description`、`category`、`status`、`period`、`tags`、`order` を設定します。

## About

- プロフィール・ブログ説明は `about/index.md` に作成します。
- frontmatter には `title`、`description`、`name`、`role`、`location`、`highlights`、`skillGroups` を設定します。

## Lint

文章校正を実行します。

```bash
pnpm run lint
```

自動修正を実行します。

```bash
pnpm run lint:fix
```

個別に確認する場合は、次のコマンドを使います。

```bash
pnpm run lint:blog
pnpm run lint:projects
pnpm run lint:about
```
