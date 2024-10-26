# プロジェクト名

このプロジェクトは、[`Next.js`](https://nextjs.org/)を使用して作成されたブログアプリです。

## はじめに

このプロジェクトは、[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) を使用しました。


## 実装した機能一覧
構成
・各記事タイトルをクリックすると、記事の詳細ページに遷移する。
・Markdownファイルを読み込み、記事のタイトル、本文の初め100文字、サムネイルの3つを全ての記事について表示。
・記事詳細ページでは、サムネイル、タイトル、本文、投稿日が最低でも表示されている
デザイン
・ヘッダーとフッターがある。(ヘッダーの左上にブログ名があり、そこを押すと/に戻る)
・CSSフレームワークが何か導入されている＝＞tailwind
環境設定
・TypeScriptで書かれている
・フォーマッターが導入されている＝＞Pretter
・Vercelにデプロイ
・実行までのコマンドがreadmeに分かりやすく書かれている。
追加課題(腕試し課題)→オフィスの本1冊プレゼント
・記事にタグ付け＋記事検索
・記事へのコメント入力フォーム＋記事へのコメントをmarkdownに書き込み＋記事へのコメントを表示


### 開発サーバーの起動

まず、以下のコードをターミナルに入力し開発サーバーを実行します。

`npm run dev`

ブラウザで [`localhost/3000`](http://localhost:300) を開いて、結果を確認してください。

### ページの編集
`page/index.js`を修正することでページ（ホーム画面）の編集を開始できます。

### APIルート
API ルート は、[`api/comments`](http://localhost:3000/api/comments) でアクセスできます。このエンドポイントは `pages/api/comments.js` で編集できます。
pages/api ディレクトリは /api/* にマッピングされています。このディレクトリ内のファイルは、React ページではなく、API ルート として扱われます。

### 参考にしたサイト
・[`Next.jsを利用した初めての本格的Markdownブログサイトの構築`](https://reffect.co.jp/react/nextjs-markdown-blog#md)

・[`作って学ぶ Next.js 13！マークダウンブログを作ってみよう | App Router対応`](https://musclecoding.com/nextjs-app-router-markdown-blog/#nextjs%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97)

・[`Vercelにデプロイしてみよう`](https://typescriptbook.jp/tutorials/vercel-deploy)
