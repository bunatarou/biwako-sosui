# 琵琶湖疏水 — 水がつないだ、京都の未来。

琵琶湖疏水の概要・歴史・設備と流路を三つのページで紹介する、日本語の静的Webサイトです。追加の依存パッケージやビルド工程はありません。

## 表示方法

`biwako-sosui-site` フォルダーをローカルHTTPサーバーで配信してください。たとえば Python 3 がある環境では、フォルダー内で次を実行します。

```powershell
python -m http.server 8000
```

ブラウザーで `http://localhost:8000` を開きます。JavaScriptを使わない単純なHTML表示でも内容の多くは読めますが、水路タブの切り替えにはJavaScriptが必要です。

## ファイル

- `index.html`：琵琶湖疏水の概要と各テーマへの案内
- `history.html`：計画から現在までの歴史と年表
- `facilities.html`：第1・第2疏水の設備と流路を水の流れ順に紹介
- `style.css`：共通レイアウト、読みやすさ、図版、配色
- `history.css`：歴史ページ用スタイル
- `facilities.css`：設備ページ用スタイル
- `script.js`：第1疏水・第2疏水・疏水分線のタブ切り替え
- `BIWAKO_SOSUI_RESEARCH.md`：調査内容の詳細版
- `BIWAKO_SOSUI_FACILITIES_RESEARCH.md`：設備・流路の調査記録と出典
- `BIWAKO_SOSUI_FIELD_DATA.md`：施設別の所在地・最寄り・見学可否のデータ表

史実・寸法・運用の詳細、参照先は調査ノートおよびサイト内の資料リンクを参照してください。
