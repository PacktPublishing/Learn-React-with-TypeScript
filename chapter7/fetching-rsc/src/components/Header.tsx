'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  return (
    <header>
      <Link
        href="/"
        className={
          pathname === '/' ? 'active' : ''
        }
      >
        Home
      </Link>
      <Link
        href="/posts"
        className={
          pathname === '/posts' ? 'active' : ''
        }
      >
        Posts
      </Link>
      <form action="/posts">
        <input
          type="search"
          name="criteria"
          placeholder="Search"
        />
      </form>
    </header>
  );
}
