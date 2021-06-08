import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { FiHome, FiLogOut, FiPackage, FiUser } from 'react-icons/fi';

import { useAuth } from '../../../../hooks/auth';

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
      <Link href="/restaurants/dashboard">
        <div
          className={`item ${
            activeLink === '/restaurants/dashboard' && 'selected'
          }`}
        >
          <FiHome size={20} />
          <p>Dashboard</p>
        </div>
      </Link>

      <Link href="/restaurants/products">
        <div
          className={`item ${
            activeLink === '/restaurants/products' && 'selected'
          }`}
        >
          <FiPackage size={20} />
          <p>Meus produtos</p>
        </div>
      </Link>

      <Link href="/restaurants/account">
        <div
          className={`item ${
            activeLink === '/restaurants/account' && 'selected'
          }`}
        >
          <FiUser size={20} />
          <p>Minha conta</p>
        </div>
      </Link>

      <div className="item" role="button" onClick={signOut}>
        <FiLogOut size={20} />
        <p>Sair</p>
      </div>
    </StylesContainer>
  );
};

export default LeftDashboardMenu;
