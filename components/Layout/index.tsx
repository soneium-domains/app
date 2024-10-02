import Header from './Header';
import Footer from './Footer';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { pathname } = useRouter();
  console.log(pathname)
  return (
    <>
    
     {pathname !== ('/name') && !pathname.includes('[name]') && !pathname.includes('auth') && <Header />}
      {children}
     {/* {!pathname.includes('nftAddress') && !pathname.includes('auth') && <Footer />} */}

      
    </>
  );
};

export default Layout;
