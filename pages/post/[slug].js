import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import { useState } from 'react';

// Static Propsを取得
export async function getStaticProps({ params }) {
  const file = fs.readFileSync(`posts/${params.slug}.md`, 'utf-8');
  const { data, content } = matter(file);
  return { props: { frontMatter: data, content } };
}

// Static Pathsを取得
export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
  }));
  console.log('paths:', paths);
  return {
    paths,
    fallback: false,
  };
}

const Post = ({ frontMatter, content }) => {
  const [name, setName] = useState(''); // 名前のステート
  const [comment, setComment] = useState(''); // コメントのステート
  const [comments, setComments] = useState([]); // コメントのリスト

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    // コメントをMarkdown形式で追加
    const newComment = {
      name,
      content: comment,
    };

    // APIにPOSTリクエストを送信
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug: frontMatter.slug, name, content: comment }),
    });

    if (res.ok) {
      setComments([...comments, newComment]); // コメントを追加
      setName(''); // フォームをリセット
      setComment(''); // フォームをリセット
      alert('コメントが追加されました');
    } else {
      alert('コメントの追加に失敗しました');
    }
  };

  return (
    <div className="post-container">
      <img
        src={`/${frontMatter.image}`}
        alt={frontMatter.title}
        className="thumbnail"
      />
      <h1 className="my-8 font-bold text-2xl">{frontMatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
      <p className="my-8">{frontMatter.date}</p>

      <h2 className="my-4">コメントを残す</h2>
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          type="text"
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mb-2 px-2 py-1 border rounded"
        />
        <textarea
          placeholder="コメント"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="mb-2 px-2 py-1 border rounded w-full"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          送信
        </button>
      </form>

      <h2 className="my-4">コメント一覧</h2>
      <div>
        {comments.map((c, index) => (
          <div key={index} className="comment">
            <strong>{c.name}</strong>
            <p>{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
