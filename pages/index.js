import fs from 'fs';
import matter from 'gray-matter';
import PostCard from '../components/PostCard';
import { useState } from 'react';

export const getStaticProps = () => {
  const files = fs.readdirSync('posts');
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    const { data, content } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
      excerpt: content.length > 100 ? content.slice(0, 100) + '...' : content, // 本文が100文字以上ならスライス
    };
  });

  return {
    props: {
      posts,
    },
  };
};

export default function Home({ posts }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post =>
    post.frontMatter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.frontMatter.tags && post.frontMatter.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );
  return (
    <div className="my-8 flex flex-col items-center">
      <input
        type="text"
        placeholder="検索..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border rounded w-1/2"
      />
      <div className="grid grid-cols-3">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}