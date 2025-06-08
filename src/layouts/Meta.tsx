import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { AppConfig } from '@/utils/AppConfig';

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();
  const seoConfig = AppConfig.seo;

  // Use provided image or default OG image
  const ogImageUrl = props.image
    ? `${seoConfig.siteUrl}${props.image}`
    : `${seoConfig.siteUrl}${seoConfig.ogImage.url}`;

  // Combine default keywords with page-specific ones
  const allKeywords = [...seoConfig.keywords, ...(props.keywords || [])].join(', ');

  // Generate structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: seoConfig.person.name,
    url: seoConfig.siteUrl,
    sameAs: seoConfig.socialProfiles,
    jobTitle: seoConfig.person.jobTitle,
    email: seoConfig.person.email,
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta name="viewport" content="width=device-width,initial-scale=1" key="viewport" />

        {/* Favicons */}
        <link rel="apple-touch-icon" href={`${router.basePath}/apple-touch-icon.png`} key="apple" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/favicon-32x32.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/favicon-16x16.png`}
          key="icon16"
        />
        <link rel="icon" href={`${router.basePath}/favicon.ico`} key="favicon" />

        {/* Additional SEO meta tags */}
        <meta name="author" content={seoConfig.author} key="author" />
        <meta name="robots" content="index,follow" key="robots" />
        <meta name="googlebot" content="index,follow" key="googlebot" />
        <meta name="keywords" content={allKeywords} key="keywords" />

        {/* Theme colors for mobile browsers */}
        <meta name="theme-color" content={seoConfig.themeColor.dark} key="theme-color" />
        <meta name="msapplication-TileColor" content={seoConfig.themeColor.dark} key="tile-color" />

        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" key="preconnect-fonts" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
          key="preconnect-fonts-static"
        />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
          key="structured-data"
        />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: props.description,
          url: props.canonical,
          locale: AppConfig.locale,
          site_name: AppConfig.site_name,
          type: props.type || 'website',
          images: [
            {
              url: ogImageUrl,
              width: seoConfig.ogImage.width,
              height: seoConfig.ogImage.height,
              alt: props.image ? props.title : seoConfig.ogImage.alt,
            },
          ],
          ...(props.publishedTime && { article: { publishedTime: props.publishedTime } }),
          ...(props.modifiedTime && { article: { modifiedTime: props.modifiedTime } }),
        }}
      />
    </>
  );
};

export { Meta };
