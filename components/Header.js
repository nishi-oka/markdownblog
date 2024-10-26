import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 border-b z-10 bg-white">
      <div className="max-w-4xl mx-auto flex justify-between items-center h-12">
        <Link
          href="/"
          className="inline-block bg-blue-400 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
        >
          初めてのBlog
        </Link>
        <div>tailwindを使用</div>
      </div>
    </header>
  );
};

export default Header;
