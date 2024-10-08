import React from 'react';
import {
  SITE_DESCRIPTION,
  SITE_FULL_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_TWITTER,
} from 'core/utils/constants';
import { DefaultSeo } from 'next-seo';

interface Props {
  title?: string;
  description?: string;
}

export function Seo({title = SITE_TITLE,description = SITE_DESCRIPTION}: Props) {
  const origin = SITE_URL;
  return (
    <DefaultSeo
      title={title}
      defaultTitle={title}
      titleTemplate={`%s | ${description}`}
      description={SITE_FULL_DESCRIPTION}
      canonical={origin}
      themeColor={'#101212'}
      defaultOpenGraphImageWidth={512}
      defaultOpenGraphImageHeight={512}
      openGraph={{
        type: 'website',
        siteName: SITE_TITLE,
        url: origin,
        description: SITE_FULL_DESCRIPTION,
        defaultImageHeight: 512,
        defaultImageWidth: 512,
        title: SITE_TITLE,
        images: [
          {
            url: `${SITE_URL}logos/logo.png`,
            alt: `${SITE_TITLE} Open Graph Image`,
            width: 512,
            height: 512,
            secureUrl: SITE_URL + 'logos/logo.png',
            type: 'image/png'
          }
        ]
      }}
      twitter={{
        handle: `@${SOCIAL_TWITTER}`,
        site: `@${SOCIAL_TWITTER}`,
        cardType: 'summary',
      }}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: `/logos/logo.png`,
        },
        {
          rel: 'apple-touch-icon',
          href: `/logos/logo.png`,
          sizes: '76x76',
        },
        {
          rel: 'manifest',
          href: '/manifest.json',
        }
      ]}
    />
  );
}
