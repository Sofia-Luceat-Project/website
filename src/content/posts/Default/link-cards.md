---
title: リンクカードの例
published: 2025-02-23T00:00:00+00:00
description: リンクカード機能の使用ガイド。
tags: [Markdown, Blogging, Demo]
category: Default
draft: false
series: Examples
---

## リンクカードについて

リンクカードは [Starlight](https://starlight.astro.build) の `<LinkCard>` コンポーネントに似ており、リンクをカード形式で表示します。

## 使用方法
> 更新され、呼び出し方法は以下のようになりました

### カスタムタイトルと説明
```
::link-card{url="https://fuwari.oh1.top" title="yCENzh's Blog" description="Ciallo~"}
```
::link-card{url="https://fuwari.oh1.top" title="yCENzh's Blog" description="Ciallo~"}

### 画像付き
```
::link-card{url="https://github.com" title="Github" description="Hello World!" icon="https://github.com/github.png"}
```
::link-card{url="https://github.com" title="Github" description="Hello World!" icon="https://github.com/github.png"}

> 以下はすべて無効になりました

Markdownの段落内に「裸の」リンク（説明文のないリンク）などを一つだけ含めると、自動的にリンクカードに変換されます。

```markdown
**外部リンク**

https://astro.build/

<https://github.com/saicaca/fuwari/>

[https://fuwari.oh1.top/](https://fuwari.oh1.top/)

**内部リンク**

[/archive/](/archive/)

詳細については、internalLinkオプションのセクションを参照してください。

**IDN（国際化ドメイン名）**

https://はじめよう.みんな/
```

https://astro.build/

<https://github.com/yCENzh/Fuwari-yCENzh/>

[https://fuwari.oh1.top/](https://fuwari.oh1.top/)

[/archive/](/archive/)

https://はじめよう.みんな/

> [!NOTE]
> カードが表示されたら、テーマカラーを変更したり、ダークモードを有効にしてみてください！

## 設定オプション

オプションは `astro.config.mjs` ファイルで指定できます。

```javascript
...
import fuwariLinkCard from "./src/plugins/fuwari-link-card.ts"
...
export default defineConfig({
  ...
  integrations: [
    ...
    fuwariLinkCard(), // ここにプラグインを追加
    ...
```

プラグインの順序が複雑な場合は、remark プラグインとして指定することもできます。

```javascript
...
import remarkLinkCard from "./src/plugins/remark-link-card.ts"
...
export default defineConfig({
  ...
  markdown: {
    ...
    remarkPlugins: [
      ...
      remarkLinkCard, // ここにプラグインを追加
      ...
```

| 名前             | 型            | デフォルト                                                                                                                                        | 説明                                                                                                                                                                                                                                                                    |
|------------------|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| devMode          | boolean         | [import.meta.env.DEV](https://docs.astro.build/en/guides/environment-variables/#default-environment-variables "Default environment variables") | 開発モードを有効または無効にします。                                                                                                                                                                                                                                            |
| excludedUrls     | Array<string \| RegExp> | []                                                                                                                                     | 特定のURLを処理から除外するための文字列または正規表現のリスト。これは他のプラグインとの競合を防ぐのにも役立ちます。                                                                                                                                    |
| linkAttributes   | Object          | { target: '', rel: '' }                                                                                                                        | 外部リンクのターゲットと関係属性を設定します。これらの属性を未設定のままにして、他のプラグインに処理を委任することもできます。                                                                                                                                  |
| rewriteRules     | Array\<Object\> | []                                                                                                                                             | タイトルや説明など、リンクから取得した特定のメタデータ属性を書き換えます。                                                                                                                                                                                                                   |
| base             | string          | '/'                                                                                                                                            | Astroと同じベースパスを指定します。詳細は[こちら](https://docs.astro.build/en/reference/configuration-reference/#base "Configuration Reference")を参照してください。**インテグレーションとして使用する場合、指定しないと自動的に決定されます。**              |
| defaultThumbnail | string          | ''                                                                                                                                             | メタデータに画像データが含まれていない場合に使用するデフォルトのサムネイル画像のパス。publicディレクトリからの相対パスである必要があります。例えば、画像がpublic/images/default-thumbnail.jpgにある場合、`defaultThumbnail`を'images/default-thumbnail.jpg'に設定します。 |
| internalLink     | Object          | { enabled: false, site: '' }                                                                                                                   | サイト内の内部リンク処理を有効にします。                                                                                                                                                                                                                              |
| cache            | Object          | 以下の詳細オプションを参照してください。                                                                                                                    | ビルドプロセス中に画像をダウンロードしてキャッシュします。                                                                                                                                                                                                                                                    |

### リンク属性の設定

| 名前   | 型   | デフォルト | 説明                                                                                                                      |
|--------|--------|---------|----------------------------------------------------------------------------------------------------------------------------------|
| target | string | ''      | リンクされたドキュメントを開く場所を指定します。デフォルト（空）では、リンクにターゲットは設定されません。                                      |
| rel    | string | ''      | 現在のドキュメントとリンクされたドキュメントの関係を定義します。デフォルト（空）では、関係は設定されません。 |

### 書き換えルール

| 名前         | 型            | デフォルト | 説明                                                   |
|--------------|-----------------|---------|---------------------------------------------------------------|
| url          | RegExp          |         | 特定のURLに一致させるために使用される正規表現パターン。 |
| rewriteSteps | Array\<Object\> |         | 特定のメタデータ属性の書き換えルールを定義します。       |

以下は、GitHubリポジトリを指すリンクから取得したメタデータの「title」と「description」を書き換える方法を示す例です。

```javascript
rewriteRules: [
  {
    url: /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/,
    rewriteSteps: [
      { key: "title", pattern: /:.*/, replacement: "" },
      {
        key: "description",
        pattern: /(?: (?:\. )?Contribute to (?:.+\/.+) .+\.?)|(?: - (?:.+\/.+))$/,
        replacement: "",
      },
      {
        key: "description",
        pattern: /^Contribute to (?:.+\/.+) .+\.?$/,
        replacement: "No description provided.",
      },
    ],
  },
],
```

| 名前        | 型   | デフォルト | 説明                                                                                                                                             |
|-------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| key         | string |         | 書き換えられるメタデータ属性のキー。                                                                                                                                  |
| pattern     | RegExp |         | メタデータ属性の現在の値に一致させるために使用される正規表現パターン。このパターンに一致する値の部分が置換されます。 |
| replacement | string |         | メタデータ属性で一致したパターンを置換する文字列。                                                                                        |

### 内部リンクの設定

| 名前    | 型    | デフォルト | 説明                                                                                                                                                                                                                                                          |
|---------|---------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| enabled | boolean | false   | 内部リンク処理を有効または無効にします。                                                                                                                                                                                                                          |
| site    | string  | ''      | Astroと同じデプロイ済みURLを指定します。詳細は[こちら](https://docs.astro.build/en/reference/configuration-reference/#site "Configuration Reference")を参照してください。**インテグレーションとして使用する場合、指定しないと自動的に決定されます。** |

### キャッシュ設定

| 名前         | 型    | デフォルト                                                                                                           | 説明                                                                                                                                                                                                                              |
|--------------|---------|-------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| enabled      | boolean | false                                                                                                             | キャッシュを有効または無効にします。                                                                                                                                                                                                               |
| outDir       | string  | './dist/'                                                                                                         | 出力ディレクトリのパス。詳細は[こちら](https://docs.astro.build/en/reference/configuration-reference/#outdir "Configuration Reference")を参照してください。**Astroと揃えることで、画像最適化などの機能の恩恵を受けることができます。** |
| cacheDir     | string  | './link-card/'                                                                                                    | キャッシュディレクトリのパス。`devMode`がtrueに設定されている場合、キャッシュされた画像への最終的なURLは`base + outDir + cacheDir`になります。それ以外の場合は`base + cacheDir`になります。                                                                       |
| maxFileSize  | number  | 0                                                                                                                 | キャッシュする最大ファイルサイズ（バイト単位）。0で無制限。                                                                                                                                                                            |
| maxCacheSize | number  | 0                                                                                                                 | キャッシュの合計最大サイズ（バイト単位）。0で無制限。                                                                                                                                                                              |
| userAgent    | string  | 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36' | クライアントを指定するためにHTTPリクエストヘッダーに含まれる識別子。                                                                                                                                                                       |

### 簡単なオプション設定

このプラグインは、オプション設定を簡素化するために`@fastify/deepmerge`を使用しています。

<https://www.npmjs.com/package/@fastify/deepmerge>

## スタイリング用のHTML構造

スタイルは`src/styles/link-card.css`で指定され、HTMLは自動的に生成されます。以下は、スタイルをカスタマイズする際の参考となる構造の例です。

```html
<div class="link-card__container">
  <a href="https://astro.build/" class="link-card">
    <div class="link-card__info">
      <div class="link-card__title">Astro</div>
      <div class="link-card__description">Astro builds fast content sites, powerful web applications, dynamic server APIs, and everything in-between.</div>
      <div class="link-card__metadata">
        <div class="link-card__domain">
          <img alt="favicon" class="link-card__favicon" src="https://www.google.com/s2/favicons?domain=astro.build">
          <span class="link-card__domain-name">astro.build</span>
        </div>
      </div>
    </div>
    <div class="link-card__thumbnail">
      <img alt="Astro - Build the web you want." class="link-card__image" src="https://astro.build/og/astro.jpg">
    </div>
  </a>
</div>
```
