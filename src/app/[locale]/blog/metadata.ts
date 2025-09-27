import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (locale === 'de') {
    return {
      title: 'Blog - Medizintourismus Expertenratgeber',
      description: 'Expertenwissen, Patientengeschichten und umfassende Leitfäden für Medizintourismus in Tunesien. Erfahren Sie mehr über Schönheitsoperationen, Zahnbehandlungen und mehr.',
      keywords: [
        'medizintourismus blog',
        'schönheitsoperationen tunesien',
        'zahntourismus blog',
        'plastische chirurgie erfahrungen',
        'tunesien medizin blog',
        'patientengeschichten',
        'medizinische behandlung ausland'
      ],
      openGraph: {
        title: 'Sanovias Blog - Medizintourismus Expertenratgeber',
        description: 'Expertenwissen und Patientengeschichten für Medizintourismus in Tunesien',
        type: 'website',
        locale: 'de_DE',
      },
    };
  }

  return {
    title: 'Blog - Medical Tourism Expert Guides',
    description: 'Expert insights, patient stories, and comprehensive guides for medical tourism in Tunisia. Learn about plastic surgery, dental care, and more from our medical professionals.',
    keywords: [
      'medical tourism blog',
      'plastic surgery tunisia',
      'dental tourism blog',
      'tunisia medical blog',
      'patient stories',
      'medical procedures abroad',
      'healthcare tourism guides'
    ],
    openGraph: {
      title: 'Sanovias Blog - Medical Tourism Expert Guides',
      description: 'Expert insights and patient stories for medical tourism in Tunisia',
      type: 'website',
      locale: 'en_US',
    },
  };
}