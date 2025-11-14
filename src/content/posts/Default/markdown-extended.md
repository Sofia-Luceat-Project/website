---
title: Markdown拡張機能
published: 1002-05-01
updated: 1002-11-29
description: 'FuwariでのMarkdown機能について詳しく知る'
image: 'https://api.lxtu.cn/api.php?category=ys'
tags: [Demo, Example, Markdown, Fuwari]
category: 'Default'
draft: false
series: Examples
---

## GitHubリポジトリカード

GitHubリポジトリにリンクする動的なカードを追加できます。ページ読み込み時に、リポジトリ情報がGitHub APIから取得されます。

::github{repo="Fabrizz/MMM-OnSpotify"}

`::github{repo="<owner>/<repo>"}` というコードでGitHubリポジトリカードを作成します。

```markdown
::github{repo="saicaca/fuwari"}
```

## アドモニション（注意喚起ボックス）

次のタイプの注意喚起ボックスがサポートされています：`note`（注釈）`tip`（ヒント）`important`（重要）`warning`（警告）`caution`（注意）

:::note
ユーザーがざっと目を通しているときでも考慮すべき情報を強調します。
:::

:::tip
ユーザーがより成功するための任意選択の情報。
:::

:::important
ユーザーが成功するために必要な重要な情報。
:::

:::warning
潜在的なリスクがあるため、ユーザーが直ちに注意を払う必要がある重要なコンテンツ。
:::

:::caution
ある行動がもたらす可能性のある否定的な結果。
:::

### 基本構文

```markdown
:::note
ユーザーがざっと目を通しているときでも考慮すべき情報を強調します。
:::

:::tip
ユーザーがより成功するための任意選択の情報。
:::
```

### カスタムタイトル

注意喚起ボックスのタイトルはカスタマイズできます。

:::note[私のカスタムタイトル]
これはカスタムタイトル付きの注釈です。
:::

```markdown
:::note[私のカスタムタイトル]
これはカスタムタイトル付きの注釈です。
:::
```

### GitHub構文

> [!TIP]
> [GitHub構文](https://github.com/orgs/community/discussions/16925)もサポートされています。

```
> [!NOTE]
> GitHub構文もサポートされています。

> [!TIP]
> GitHub構文もサポートされています。
```

### スポイラー

テキストにスポイラーを追加できます。テキストは**Markdown**構文もサポートしています。

内容：スポイラー[:spoiler[は隠されています **えへへ**]]！

```markdown
内容：スポイラー[:spoiler[は隠されています **えへへ**]]！
```
