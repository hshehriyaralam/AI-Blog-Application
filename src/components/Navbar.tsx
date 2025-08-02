import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-gray-500 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-xl font-bold">IntelliBlog</Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-blue-300">Home</Link>
            </li>
            <li>
              <Link href="/Write" className="hover:text-blue-300">Write Blog</Link>
            </li>
            <li>
              <Link href="/Blogs" className="hover:text-blue-300">Blogs</Link>
            </li>
            <li>
              <Link href="/Login" className="hover:text-blue-300">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}