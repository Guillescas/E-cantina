import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

import { FiHome, FiLogOut, FiUser } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import { StylesContainer } from './styles';

const LeftDashboardMenu = (): ReactElement => {
  const router = useRouter();

  const { signOut } = useAuth();

  useEffect(() => {
    setActiveLink(router.asPath);
  }, [router]);

  const [activeLink, setActiveLink] = useState('');

  return (
    <StylesContainer>
      <Link href="/dashboard">
        <div className={`item ${activeLink === '/dashboard' && 'selected'}`}>
          <FiHome size={22} />
          <p>Dashboard</p>
        </div>
      </Link>

      <Link href="/dashboard/minha-conta">
        <div
          className={`item ${
            activeLink === '/dashboard/minha-conta' && 'selected'
          }`}
        >
          <FiUser size={22} />
          <p>Minha conta</p>
        </div>
      </Link>

      <div
        className={`item ${activeLink === 'dashboard' && 'selected'}`}
        role="button"
        onClick={() => signOut()}
      >
        <FiLogOut size={22} />
        <p>Sair</p>
      </div>
    </StylesContainer>
  );
};

export default LeftDashboardMenu;
