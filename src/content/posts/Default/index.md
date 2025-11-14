---
title: Fuwari シンプルガイド
published: 1002-04-01
description: "このブログテンプレートの使い方"
image: "./index.jpeg"
tags: ["Fuwari", "Blogging", "Customization"]
category: Default
draft: false
series: Examples
---

> カバー画像のソース: [ソース](https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/208fc754-890d-4adb-9753-2c963332675d/width=2048/01651-1456859105-(colour_1.5),girl,_Blue,yellow,green,cyan,purple,red,pink,_best,8k,UHD,masterpiece,male%20focus,%201boy,gloves,%20ponytail,%20long%20hair,.jpeg)

このブログテンプレートは [Astro](https://astro.build/) で構築されています。このガイドで言及されていないことについては、[Astro のドキュメント](https://docs.astro.build/) で答えが見つかるかもしれません。

## 記事のFront-matter設定

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
---
```

| 属性          | 説明                                                                                                                                                                                                         |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`       | 記事のタイトル。                                                                                                                                                                                                 |
| `published`   | 記事の公開日。                                                                                                                                                                                                 |
| `description` | 記事の短い説明。インデックスページに表示されます。                                                                                                                                                                          |
| `image`       | 記事のカバー画像のパス。<br/>1. `http://` または `https://` で始まる場合：ウェブ画像を使用<br/>2. `/` で始まる場合：`public` ディレクトリ内の画像<br/>3. 上記の接頭辞がない場合：Markdownファイルからの相対パス                                     |
| `tags`        | 記事のタグ。                                                                                                                                                                                                    |
| `category`    | 記事のカテゴリ。                                                                                                                                                                                                 |
| `draft`       | この記事がまだ下書きの場合、表示されません。                                                                                                                                                                             |

## 記事ファイルの置き場所

記事ファイルは `src/content/posts/` ディレクトリに配置する必要があります。サブディレクトリを作成して、記事やアセットをより良く整理することもできます。

```
src/content/posts/
├── post-1.md
└── post-2/
    ├── cover.png
    └── index.md
```
