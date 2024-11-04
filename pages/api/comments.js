import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // GETメソッドの処理
  if (req.method === 'GET') {
    const { slug } = req.query; // slugを取得

    // コメントファイルのパスを設定
    const commentsFilePath = path.join(
      process.cwd(),
      'comments',
      `${slug}.json`
    );

    // コメントを読み込み
    if (fs.existsSync(commentsFilePath)) {
      const fileContents = fs.readFileSync(commentsFilePath, 'utf-8');
      const comments = JSON.parse(fileContents);
      return res.status(200).json({ comments }); // 取得したコメントを返す
    } else {
      return res.status(404).json({ message: 'コメントが見つかりません。' });
    }
  }

  // POSTメソッドの処理
  if (req.method === 'POST') {
    const { slug, name, content } = req.body;

    // バリデーションチェック
    if (!name || name.trim() === '') {
      return res.status(400).json({ message: '名前は必須です。' });
    }
    if (name.length > 20) {
      return res
        .status(400)
        .json({ message: '名前は20文字以内で入力してください。' });
    }
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'コメント内容は必須です。' });
    }
    if (content.length > 300) {
      return res
        .status(400)
        .json({ message: 'コメントは300文字以内で入力してください。' });
    }
    if (!slug) {
      return res.status(400).json({ message: 'スラッグが必要です。' });
    }

    // コメントをファイルに保存するためのパスを設定
    const commentsFilePath = path.join(
      process.cwd(),
      'comments',
      `${slug}.json`
    );
    console.log('Submitting comment with slug:', slug);

    // 既存のコメントを読み込み
    let comments = [];
    if (fs.existsSync(commentsFilePath)) {
      const fileContents = fs.readFileSync(commentsFilePath, 'utf-8');
      comments = JSON.parse(fileContents);
    }

    // 重複チェック
    const isDuplicate = comments.some(
      (c) => c.name === name && c.content === content
    );
    if (isDuplicate) {
      return res
        .status(400)
        .json({ message: '同じコメントは既に存在します。' });
    }

    // 新しいコメントを追加
    comments.push({ name, content });

    // コメントをJSONファイルに書き込む
    try {
      fs.writeFileSync(commentsFilePath, JSON.stringify(comments, null, 2));
      // 成功レスポンスを返す
      return res
        .status(200)
        .json({ message: 'コメントが正常に追加されました！' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'コメントの保存に失敗しました。' });
    }
  } else {
    // 他のメソッドには405を返す
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
