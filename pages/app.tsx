import type { NextPage } from 'next';
import Head from 'next/head';
import ClaimSection from 'components/sections/ClaimSection';
import {
  SITE_DESCRIPTION,
  SITE_URL,
  SITE_TITLE,
  SITE_KEYWORDS,
} from 'core/utils/constants';
import { Seo } from 'components/Layout/Seo';

const Home: NextPage = () => {
  return (
    <>
      
      <Head>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="keywords" content={SITE_KEYWORDS} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={SITE_URL+'logos/logo.png'} />
        <link rel="icon" type="image/png" href="/logos/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=0.0.2"/>
        <link rel="shortcut icon" href="/favicon.ico?v=0.0.2"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#007bff"/>
        <meta name="apple-mobile-web-app-title" content="Soneium Domains"/>
        <meta name="application-name" content="Soneium Domains"/>
        <meta name="msapplication-TileColor" content="#007bff"/>
        <meta name="theme-color" content="#007bff"/>

      </Head>
      <Seo />
      <ClaimSection />

      {/* <EarlyAdopterSection /> */}
      {/* <IntroSection />
      <FeaturesSection /> */}
      {/* <ParticipationSection />
      <ManageSection />
      <ProfileSection /> */}
      {/* <NSSection />
      <RoadmapSection />
      <AboutSection /> */}
    </>
  );
};

export default Home;
