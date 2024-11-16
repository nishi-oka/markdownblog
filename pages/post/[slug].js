import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import { useState } from 'react';
import { useEffect } from 'react';

export async function getStaticProps({ params }) {
  const file = fs.readFileSync(`posts/${params.slug}.md`, 'utf-8');
  const { data, content } = matter(file);
  return { props: { frontMatter: data, content } };
}

export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

const Post = ({ frontMatter, content }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10; // 1ページあたりのコメント数

// 名前とコメントの文字数制限
const maxNameLength = 20;
const maxCommentLength = 200;

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(`/api/comments?slug=${frontMatter.slug}`);
      const data = await res.json();
      if (res.ok) {
        setComments(data.comments.reverse()); // 取得したコメントを逆順でセット
      }
    };

    fetchComments();
  }, [frontMatter.slug]); // slugが変わるたびに再実行

  const handleCommentSubmit = async (e) => {
    e.preventDefault();



    if (name.length > maxNameLength) {
      alert(`名前は${maxNameLength}文字以内で入力してください。`);
      return;
    }

    if (comment.length > maxCommentLength) {
      alert(`コメントは${maxCommentLength}文字以内で入力してください。`);
      return;
    }
    if (!frontMatter.slug) {
      alert('スラッグが無効です。');
      return;
    }
    const newComment = { name, content: comment };
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: frontMatter.slug, name, content: comment }),
    });

    const data = await res.json();
    if (res.ok) {
      setComments([newComment, ...comments]);
      setName('');
      setComment('');
      alert('コメントが追加されました');
    } else {
      alert(data.message || 'コメントの追加に失敗しました');
    }
  };

  // ページネーション用のコメントの取得
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  // ページ数の変更
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

      <h2 className="my-4 mb-1">コメントを残す</h2>
      <p className="text-sm text-gray-500 mb-2">
        　※名前は{maxNameLength}文字以内で入力してください。<br />
        　※コメントは{maxCommentLength}文字以内で入力してください。
</p>
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          type="text"
          placeholder="名前"
          value={name}
          maxLength="20"
          style={{ width: '300px' }}
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
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          送信
        </button>
      </form>

      <h2 className="my-4">コメント一覧</h2>
      <div>
        {currentComments.map((c, index) => (
          <div key={index} className="comment">
            <strong>投稿名：{c.name}</strong>
            <p className="mb-2">{c.content}</p>
          </div>
        ))}
      </div>

      {/* ページネーションボタン */}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(comments.length / commentsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-2 py-1 m-1 ${currentPage === index + 1 ? 'bg-gray-300' : 'bg-gray-100'}`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Post;
