import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta.terms' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: t('title'),
      description: t('description'),
    },
  };
}