import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { slug, name, content } = req.body;

    // コメントをファイルに保存するためのパスを設定
    const commentsFilePath = path.join(process.cwd(), 'comments', `${slug}.json`);

    // 既存のコメントを読み込み、更新
    let comments = [];
    if (fs.existsSync(commentsFilePath)) {
      const fileContents = fs.readFileSync(commentsFilePath, 'utf-8');
      comments = JSON.parse(fileContents);
    }

    // 新しいコメントを追加
    comments.push({ name, content });

    // コメントをJSONファイルに書き込む
    fs.writeFileSync(commentsFilePath, JSON.stringify(comments, null, 2));

    // 成功レスポンスを返す
    res.status(200).json({ message: 'Comment added successfully!' });
  } else {
    // 他のメソッドには405を返す
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
