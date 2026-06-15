#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const USAGE = `Usage:
  pnpm run new:post -- <slug-or-path> [title]
  pnpm run new:project -- <slug-or-path> [title]

Examples:
  pnpm run new:post -- first-post "最初の記事"
  pnpm run new:post -- /notes/astro/sample-post "Sample Post"
  pnpm run new:project -- my-project "My Project"
`;

const kind = process.argv[2];
const rawSlug = process.argv[3];
const title = process.argv[4] ?? rawSlug;

if (!["post", "project"].includes(kind) || !rawSlug) {
  console.error(USAGE.trim());
  process.exit(1);
}

const parseSlugPath = (value) => {
  const segments = value.split("/").filter(Boolean);

  if (segments.length === 0) {
    console.error("Slug path must include at least one segment.");
    process.exit(1);
  }

  for (const segment of segments) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(segment)) {
      console.error("Slug path segments must use lowercase letters, numbers, and hyphens only.");
      process.exit(1);
    }
  }

  return segments;
};

const slugSegments = parseSlugPath(rawSlug);
const slugPath = path.join(...slugSegments);

if (path.isAbsolute(slugPath) || slugPath.startsWith("..")) {
  console.error("Slug path must stay inside the content directory.");
  process.exit(1);
}

const quoteYaml = (value) => `"${String(value).replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`;

const tokyoDateParts = () => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return {
    year: values.year,
    month: values.month,
    day: values.day,
    date: `${values.year}-${values.month}-${values.day}`,
  };
};

const ensureNewPath = (targetPath) => {
  if (existsSync(targetPath)) {
    console.error(`Already exists: ${targetPath}`);
    process.exit(1);
  }
};

const ensureNewContentPath = (contentDir) => {
  ensureNewPath(contentDir);
  ensureNewPath(`${contentDir}.md`);
  ensureNewPath(`${contentDir}.mdx`);
};

const writeSkeleton = ({ contentDir, content }) => {
  const indexPath = path.join(contentDir, "index.md");
  const assetsDir = path.join(contentDir, "assets");
  const keepPath = path.join(assetsDir, ".gitkeep");

  ensureNewContentPath(contentDir);
  mkdirSync(assetsDir, { recursive: true });
  writeFileSync(indexPath, content, "utf8");
  writeFileSync(keepPath, "# Remove this file after adding assets.\n", "utf8");

  console.log(`Created ${indexPath}`);
  console.log(`Created ${keepPath}`);
};

const buildPost = () => {
  const { year, month, date } = tokyoDateParts();
  const contentDir = path.join("blog", year, month, slugPath);
  const content = `---
title: ${quoteYaml(title)}
description: "記事の説明をここに書きます"
category: "Uncategorized"
tags: []
draft: true
pubDate: ${date}
updatedDate: ${date}
# heroImage: "./assets/hero.png"
---

# ${title}

本文をここに書きます。
`;

  writeSkeleton({ contentDir, content });
};

const buildProject = () => {
  const { year } = tokyoDateParts();
  const contentDir = path.join("projects", slugPath);
  const content = `---
title: ${quoteYaml(title)}
description: "プロジェクトの説明をここに書きます"
category: "Uncategorized"
status: "Planning"
period: ${quoteYaml(year)}
tags: []
url: ""
repository: ""
# heroImage: "./assets/image.png"
heroImageAlt: ""
gallery: []
# gallery example:
#   - image: "./assets/gallery-1.png"
#     alt: "ギャラリー画像の説明"
#     caption: "ギャラリー画像のキャプション"
order: 0
---

# ${title}

本文をここに書きます。
`;

  writeSkeleton({ contentDir, content });
};

if (kind === "post") {
  buildPost();
} else {
  buildProject();
}
