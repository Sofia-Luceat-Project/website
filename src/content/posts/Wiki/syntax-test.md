---
title: "カスタムMarkdown構文テスト"
published: 2025-11-21
description: "カスタムMarkdownコンポーネントの使用例とテスト"
tags: ["テスト", "Markdown", "構文"]
category: Wiki
draft: false
---

# カスタムMarkdown構文テスト

この記事では、実装されたカスタムMarkdownコンポーネントの使用例を示します。

## 1. ゲームスペック (game-spec)

ゲームの情報を表示します。

::game-spec{genre="Action RPG" players="1-4" platform="PC, PlayStation 5, Xbox Series X|S" release="2024-01-15"}

## 2. YouTube埋め込み (youtube)

YouTube動画を軽量な埋め込み形式で表示します。クリックするまで読み込まれません。

::youtube{id="dQw4w9WgXcQ"}

## 3. 画像比較 (compare-image)

2つの画像をスライダーで比較できます。

::compare-image{before="./avatar.webp" after="./137103134master1200.jpg" label="改善前と改善後の比較"}

