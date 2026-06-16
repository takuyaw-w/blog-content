# blog-content

この Repo は、Astro ブログテンプレートへ同期するブログ本文と画像だけを管理します。Astro アプリ本体は別 Repo にあり、この Repo では Markdown、画像、textlint 設定を扱います。

## ディレクトリ

- `src/content/blog/`: 記事本文と記事ごとの画像を管理します。
- `src/content/projects/`: 制作物・個人開発のコンテンツを管理します。
- `src/content/about/`: プロフィール・ブログ説明を管理します。

## 同期先

- `src/content/blog/` は Astro テンプレート Repo の `src/content/blog/` へ同期されます。
- `src/content/projects/` は Astro テンプレート Repo の `src/content/projects/` へ同期されます。
- `src/content/about/` は Astro テンプレート Repo の `src/content/about/` へ同期されます。

記事画像や制作物画像は各 `index.md` と同じディレクトリ内の `assets/` に配置し、frontmatter と Markdown 本文からは `./assets/...` の相対パスで参照します。

## デプロイ連携

- GitHub Webhook から Cloudflare Workers Deploy Hook を直接叩く方式は廃止します。
- `blog-content` の `main` ブランチ push 時だけ GitHub Actions から Deploy Hook を叩きます。
- Repository Secret `CLOUDFLARE_WORKERS_DEPLOY_HOOK` に Cloudflare Workers Deploy Hook URL を設定します。
- 既存の GitHub Webhook は GitHub の Settings > Webhooks から削除または無効化します。

## 記事作成ルール

- 記事ごとに `src/content/blog/YYYY/MM/slug/` ディレクトリを作成します。
- 記事本文は `src/content/blog/YYYY/MM/slug/index.md` または `src/content/blog/YYYY/MM/slug/index.mdx` に作成します。
- 記事画像は `src/content/blog/YYYY/MM/slug/assets/` に配置します。
- 本文から記事画像を参照する場合は `./assets/image-name.jpg` のように相対パスを使います。
- frontmatter には `title`、`description`、`category`、`tags`、`draft`、`pubDate`、`updatedDate` を設定します。
- `heroImage` を使う場合も、記事ディレクトリ内の画像を相対パスで指定します。
- `draft: true` の記事は本番公開対象外です。

記事のスケルトンを作成します。

```bash
pnpm run new:post -- first-post "最初の記事"
pnpm run new:post -- /notes/astro/sample-post "Sample Post"
```

## 制作物作成ルール

- 制作物・個人開発ごとに `src/content/projects/slug/` ディレクトリを作成します。
- 本文は `src/content/projects/slug/index.md` に作成します。
- 画像は `src/content/projects/slug/assets/` に配置します。
- 表示順を制御する場合は frontmatter の `order` を設定します。
- frontmatter には `title`、`description`、`category`、`status`、`period`、`tags`、`order` を設定します。

制作物・個人開発のスケルトンを作成します。

```bash
pnpm run new:project -- my-project "My Project"
pnpm run new:project -- /apps/sample-project "Sample Project"
```

## About

- プロフィール・ブログ説明は `src/content/about/index.md` に作成します。
- frontmatter には `title`、`description`、`name`、`role`、`location`、`highlights`、`skillGroups` を設定します。

## Lint

Markdown のフォーマットを確認します。

```bash
pnpm run format:check
```

Markdown をフォーマットします。

```bash
pnpm run format
```

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
