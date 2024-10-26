# プロジェクト名

このプロジェクトは、[Next.js](https://nextjs.org/)を使用して作成されたブログアプリです。

## はじめに

このプロジェクトは、[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) を使用しました。


### 実装した機能一覧
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


#### 開発サーバーの起動

まず、以下のコードをターミナルに入力し開発サーバーを実行します。

```bash
npm run dev

ブラウザで http://localhost:3000 を開いて、結果を確認してください。

##### ページの編集
```bash
page/index.jsを修正することでページ（ホーム画面）の編集を開始できます。

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
