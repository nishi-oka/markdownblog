import Image from 'next/image';
import Link from 'next/link';

const PostCard = ({ post }) => {
  return (
    <Link href={`/post/${post.slug}`}>
      <div className="bg-gray-500 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <Image
          src={`/${post.frontMatter.image}`}
          width={1200}
          height={700}
          alt={post.frontMatter.title}
          className="rounded-t-lg"
        />
      </div>
      <div className="px-2 py-4">
        <h1 className="font-bold text-lg">{post.frontMatter.title}</h1>
        <p>{post.excerpt}...</p> {/* 本文の初め100文字 */}
        <span className="">{post.frontMatter.date}</span>
        <div className="mt-2">
          {post.frontMatter.tags && post.frontMatter.tags.map((tag, index) => (
            <span key={index} className="mr-2 bg-gray-200 text-gray-700 rounded-full px-2 text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
