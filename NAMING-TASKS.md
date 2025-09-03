# Naming Normalization Tasks

目的: Script.js 内のキー名・関連命名の揺れを解消するための TODO 一覧。コード変更はまだ行わない。

## 基本方針（提案）

- DOM 参照: 接尾辞を `El` に統一（例: `messageEl`, `xpValueEl`）。
- 表示テキストのキー: `message` を標準化（`text` との混同回避）。
- 配列の関数参照: `Fns` または `Actions` に統一（`Funs` は非推奨）。
- 攻撃関連の数値: `...Value` か `...Power` のどちらかに統一。

## タスク一覧（ファイル参照付き）

- scenes 内の関数配列キー `buttonFuns` を一般的な名前へ統一

  - 該当: `Dragon-Repeller/script.js:62` 付近（各シーン定義内）
  - 提案: `buttonFns` または `buttonActions`

- scenes 内の表示テキストキー `text` を `message` に変更（DOM の `text` と衝突回避）

  - 該当: `Dragon-Repeller/script.js:67`, `77`, `83`, `89`, `95`, `101`, `107`, `113`
  - 併せて使用箇所修正: `update(scene)` の `text.innerHTML = scene.text;` を `messageEl.innerHTML = scene.message;` 等へ
    - 該当: `Dragon-Repeller/script.js:135`

- weapons のキー `attackPower` の語彙を他と統一（`...Value` or `...Power`）

  - 該当: `Dragon-Repeller/script.js:36-50`（定義）と使用箇所 `:231`
  - 提案: `attackValue` に統一、もしくは関連関数名を `...Power` に合わせる

- DOM 参照の語尾統一（`...El` に揃える）

  - `monsterHealthText` → `monsterHealthEl`
    - 定義: `Dragon-Repeller/script.js:32`
    - 使用: `:218`, `:238`
  - `xpText`/`healthText`/`goldText` → `xpValueEl`/`healthValueEl`/`goldValueEl` など
    - 定義: `Dragon-Repeller/script.js:25-27`
    - 主な使用: `:157`, `:170`, `:237`, `:302-303`, `:317-319`, `:356`, `:360`
  - メッセージ表示 DOM `text` は `messageEl` などへ
    - 定義: `Dragon-Repeller/script.js:24`
    - 使用多数（`update(scene)`、`buyWeapon()`、`attack()`、`pick()` など）

- 変数名の明確化: 戦闘中モンスター体力 `monsterHealth` を `currentMonsterHealth` へ

  - 定義: `Dragon-Repeller/script.js:15`
  - セット/更新: `:213`, `:230-233`, `:238`, 判定: `:241-247`

- コメント/命名の不整合解消: `targetMonsterIndex` コメントが `currentWeaponIndex` 上に存在

  - 該当: `Dragon-Repeller/script.js:7-12`
  - 対応: コメント位置・内容の修正（`currentWeaponIndex` の説明に一致させる）

- scenes 配列の `buttonText` の命名検討（ラベルであることを明確化）

  - 該当: `Dragon-Repeller/script.js:62-115`
  - 提案: `buttonLabels` など（任意）

- 「power」表現の揺れの統一（コメントにも TODO あり）
  - 参照: `Dragon-Repeller/script.js:34` の TODO、および `attackPower`／`getMonsterAttackValue()` の語彙差

## 追随修正が必要な主な箇所

- `update(scene)` のプロパティ参照（`scene.buttonText`/`scene.buttonFuns`/`scene.text`）
  - 該当: `Dragon-Repeller/script.js:129-135`
- 各イベントハンドラの DOM 書き換え（`text.innerText/innerHTML` 系）
  - 例: `buyHealth()` `:159`, `buyWeapon()` `:171-175`, `sellWeapon()` `:188-191`, `attack()` `:221-236`, `pick()` `:344-360` ほか

## 決めたいポリシーの確認事項

- DOM 参照の接尾辞: `El` で統一して問題ないか。
- ステータス表示の接尾辞: `...ValueEl` か単に `...El` にするか。
- 攻撃関連語彙: `Power` と `Value` のどちらに統一するか。
- scenes の関数配列キー: `buttonFns` か `buttonActions` か。

以上の合意後に一括リネーム計画を作成可能です。
