import merge from 'lodash.merge';
import type { Metadata } from 'next';

interface MetadataGenerator extends Omit<Metadata, 'title' | 'description'> {
  title: string;
  description: string;
  image?: string;
}

const applicationName = 'Zoincas';
const author: Metadata['authors'] = {
  name: 'zoincas',
  url: 'https://zoincas.com/',
};
const publisher = 'zoincas';
const twitterHandle = '@zoincas';

export const createMetadata = ({
  title,
  description,
  image,
  ...properties
}: MetadataGenerator): Metadata => {
  const parsedTitle = `${title} | ${applicationName}`;
  const defaultMetadata: Metadata = {
    title: parsedTitle,
    description,
    applicationName,
    authors: [author],
    creator: author.name,
    formatDetection: {
      telephone: false,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: parsedTitle,
    },
    openGraph: {
      title: parsedTitle,
      description,
      type: 'website',
      siteName: applicationName,
      locale: 'en_US',
    },
    publisher,
    twitter: {
      card: 'summary_large_image',
      creator: twitterHandle,
    },
  };

  const metadata: Metadata = merge(defaultMetadata, properties);

  if (image && metadata.openGraph) {
    metadata.openGraph.images = [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      },
    ];
  }

  return metadata;
};
