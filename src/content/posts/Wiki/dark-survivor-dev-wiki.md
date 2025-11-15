---
title: Dark Survivor 開発 Wiki
published: 2025-11-15
description: ゲーム「Dark Survivor」の開発に参加するためのWikiです。
tags: ["Wiki", "開発ガイド"]
category: Wiki
draft: false
---

## はじめに

このページは、ゲーム『Dark Survivor』の開発に参加するための情報をまとめたWikiです。
開発を始める前に、このページを一読してください。

## 開発環境のセットアップ

開発に必要なソフトウェアです。各カードから公式サイトにアクセスし、ダウンロードとインストールを行ってください。

::link-card{url="https://zed.dev/" title="Zed" description="高速でモダンなコードエディタ"}

::link-card{url="https://git-scm.com/" title="Git" description="ソースコードのバージョン管理システム"}

::link-card{url="https://www.redotengine.org/" title="Redot Engine" description="オープンソースのゲームエンジン"}

## Gitの基本的な使い方

プロジェクトのソースコードはGitで管理されています。基本的な操作方法を覚えておきましょう。

:::note[リポジトリの場所]
プロジェクトのGitHubリポジトリは以下です。
::github{repo="[<owner>/<repository>](https://github.com/Sofia-Luceat-Project/dark-survivor)"}
:::

### リポジトリのクローン

最初に、上記のリポジトリをローカル環境にコピー（クローン）します。

```bash
git clone https://github.com/Sofia-Luceat-Project/dark-survivor.git
```

### 最新の変更を取り込む

:::tip[作業を始める前に]
コンフリクト（変更の衝突）を避けるため、作業を始める前には必ずリモートリポジトリの最新の変更を取り込みましょう。
:::

```bash
git pull origin main
```

### ブランチの作成と切り替え

新しい機能の実装やバグ修正など、作業単位でブランチを作成します。

```bash
# "feature/new-feature" という名前で新しいブランチを作成し、そのブランチに切り替える
git checkout -b feature/new-feature

# ブランチに切り替える
git checkout feature/new-feature
```

### 変更を記録する

変更したファイルをステージングし、コミットメッセージを付けて記録します。

```bash
# 変更したファイルをすべてステージングする
git add .

# コミットメッセージを付けてコミットする
git commit -m "feat: 新機能を追加"
```

### 変更をリモートに送信する

ローカルでの変更をリモートリポジトリに反映させます。

```bash
git push origin feature/new-feature
```

## 開発ルール

:::important[開発を円滑に進めるために]
以下のルールを守って開発を進めてください。
:::

### ブランチ運用ルール

- `main` ブランチには直接コミットせず、開発用のブランチ（例: `develop`）からブランチを作成してください。
- 機能追加は `feature/`、バグ修正は `fix/` などのプレフィックスをブランチ名に付けます。
- 作業が完了したら、プルリクエスト（またはマージリクエスト）を作成し、レビューを受けてからマージします。

### コミットメッセージ

コミットメッセージは、変更内容が分かりやすいように記述します。
フォーマット: `<type>: <subject>`
- **例:** `feat: プレイヤーの移動機能を追加`
- **例:** `fix: 敵が動かなくなるバグを修正`

### コーディングスタイル

#### Godotスタイルガイド
- **ファイル名**: `snake_case`（例: `player_controller.gd`, `main_menu.tscn`）
- **ノード名**: `PascalCase`（例: `Player`, `EnemySpawner`）
- **クラス名 (class_name)**: `PascalCase`（例: `PlayerController`）
- **シグナル名**: `past_tense`（過去形）（例: `tree_entered`, `health_depleted`）

#### コンポーネント指向アプローチ
- `player.tscn`や`enemy.tscn`のように、1つのエンティティは複数の子ノード（コンポーネント）から構成されます。
- 例えば、`Player`シーンは「移動を処理するスクリプト」「ステータスを管理するノード」「アニメーションを制御するノード」といったように、機能ごとにノードが分割されています。
- これにより、機能の再利用性が高まり、単一のスクリプトが肥大化するのを防ぎます。
