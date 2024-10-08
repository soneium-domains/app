import type { NextPage } from 'next';
import Head from 'next/head';
import ManageSection from 'components/sections/ManageSection';
import { SITE_DESCRIPTION, SITE_URL, SITE_TITLE } from 'core/utils/constants';
import { Seo } from 'components/Layout/Seo';

const Manage: NextPage = () => {
  const title = "My Names";
  const des = "Manage Soneium Domains";
  return (
    <>
    <Seo title={title} description={des} />
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={des} />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/api/og?title=${title}&subtitle=${des}&w=30&image=${SITE_URL}logo.svg`}
        />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={des} />
        <meta
          name="og:image"
          content={`${SITE_URL}/api/og?title=${title}&subtitle=${des}&w=30&image=${SITE_URL}logo.svg`}
        />
        <link rel="icon" type="image/png" href="/logos/vidicon.png" />
      </Head>
      
      {/* <ClaimSection /> */}
      <ManageSection />
    </>
  );
};

export default Manage;
