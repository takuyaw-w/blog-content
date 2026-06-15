# blog-content

この Repo は、Astro ブログテンプレートへ同期するブログ本文と画像だけを管理します。Astro アプリ本体は別 Repo にあり、この Repo では Markdown、画像、textlint 設定を扱います。

## ディレクトリ

- `posts/`: 記事を管理します。
- `projects/`: 制作物・個人開発のコンテンツを管理します。
- `about/`: プロフィール・ブログ説明を管理します。
- `assets/`: 公開画像を管理します。

## 同期先

- `posts/` は Astro テンプレート Repo の `src/content/posts/` へ同期されます。
- `projects/` は Astro テンプレート Repo の `src/content/projects/` へ同期されます。
- `about/` は Astro テンプレート Repo の `src/content/about/` へ同期されます。
- `assets/` は Astro テンプレート Repo の `public/content-assets/` へ同期されます。

画像は `assets/` 配下に配置し、Markdown からは `/content-assets/...` として参照します。

## 記事作成ルール

- 記事は `posts/YYYY/MM/slug.md` に作成します。
- 画像は記事と同じ年月の `assets/posts/YYYY/MM/` に配置します。
- frontmatter には `title`、`description`、`pubDate`、`updatedDate`、`tags`、`draft` を設定します。
- `heroImage` などの画像パスは `/content-assets/...` で指定します。
- `draft: true` の記事は本番公開対象外です。

## 制作物作成ルール

- 制作物・個人開発の本文は `projects/*.md` に作成します。
- 制作物ごとの画像は `assets/projects/{slug}/` に配置します。
- 表示順を制御する場合は frontmatter の `order` を設定します。
- `draft: true` の制作物は本番公開対象外です。

## About

- プロフィール・ブログ説明は `about/index.md` に作成します。
- アバター画像は `assets/about/` に配置し、`/content-assets/about/...` として参照します。

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
pnpm run lint:posts
pnpm run lint:projects
pnpm run lint:about
```
