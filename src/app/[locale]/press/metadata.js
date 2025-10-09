import { getTranslations } from '../../../../utils/translations';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);
  
  return {
    title: t('press.meta.title'),
    description: t('press.meta.description'),
  };
}