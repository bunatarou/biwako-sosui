# 琵琶湖疏水 — 水がつないだ、京都の未来。

琵琶湖疏水の歴史・水路網・土木施設・現在の役割・文化財を紹介する、日本語の静的Webサイトです。追加の依存パッケージやビルド工程はありません。

## 表示方法

`biwako-sosui-site` フォルダーをローカルHTTPサーバーで配信してください。たとえば Python 3 がある環境では、フォルダー内で次を実行します。

```powershell
python -m http.server 8000
```

ブラウザーで `http://localhost:8000` を開きます。JavaScriptを使わない単純なHTML表示でも内容の多くは読めますが、水路タブの切り替えにはJavaScriptが必要です。

## ファイル

- `index.html`：サイト本体と記事内容
- `facilities.html`：第1・第2疏水の設備と流路を水の流れ順に紹介
- `style.css`：レスポンシブレイアウト、図版、配色
- `facilities.css`：設備ページ用スタイル
- `script.js`：第1疏水・第2疏水・疏水分線のタブ切り替え
- `BIWAKO_SOSUI_RESEARCH.md`：調査内容の詳細版
- `BIWAKO_SOSUI_FACILITIES_RESEARCH.md`：設備・流路の調査記録と出典

史実・寸法・運用の詳細、参照先は調査ノートおよびサイト内の資料リンクを参照してください。
