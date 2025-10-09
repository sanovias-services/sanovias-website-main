import { getTranslations } from '../../../../utils/translations';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);
  
  return {
    title: t('events.meta.title'),
    description: t('events.meta.description'),
  };
}