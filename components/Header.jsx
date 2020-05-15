import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const isActive = pathname => router.pathname === pathname;

  const index = '/';
  const drafts = '/drafts';
  const search = '/search';
  const signup = '/signUp';
  const create = '/create';

  return(
    <nav>
      <div className='left'>
        <Link href={index}>
          <a className='bold' data-active={isActive({index})}>Blog</a>
        </Link>
        <Link href={drafts}>
          <a data-active={isActive({drafts})}>Drafts</a>
        </Link>
        <Link href={search}>
          <a data-active={isActive({search})}>Search</a>
        </Link>
      </div>
      <div className='right'>
        <Link href={signup}>
          <a data-active={isActive({signup})}>Signup</a>
        </Link>
        <Link href={create}>
          <a data-active={isActive({create})}>+ Create draft</a>
        </Link>
      </div>
      <style jsx global>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }

        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        .left a[data-active='true'] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }

        .right {
          margin-left: auto;
        }

        .right a {
          border: 1px solid black;
          padding: 0.5rem 1rem;
          border-radius: 3px;
        }
      `}</style>
    </nav>
  );
};

export default Header;
