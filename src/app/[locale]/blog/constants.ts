import { BlogCategory, Author } from './types';

// Blog Categories for Medical Tourism
export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: 'plastic-surgery',
    name: {
      en: 'Plastic Surgery',
      de: 'Plastische Chirurgie'
    },
    slug: {
      en: 'plastic-surgery',
      de: 'plastische-chirurgie'
    },
    description: {
      en: 'Comprehensive guide to plastic surgery procedures in Tunisia',
      de: 'Umfassender Leitfaden für plastische Chirurgie-Verfahren in Tunesien'
    },
    color: '#2CA6A4',
    icon: 'scalpel'
  },
  {
    id: 'dental-care',
    name: {
      en: 'Dental Care',
      de: 'Zahnpflege'
    },
    slug: {
      en: 'dental-care',
      de: 'zahnpflege'
    },
    description: {
      en: 'Dental treatments and oral health services in Tunisia',
      de: 'Zahnbehandlungen und Mundgesundheitsdienste in Tunesien'
    },
    color: '#C9A66B',
    icon: 'tooth'
  },
  {
    id: 'medical-procedures',
    name: {
      en: 'Medical Procedures',
      de: 'Medizinische Eingriffe'
    },
    slug: {
      en: 'medical-procedures',
      de: 'medizinische-eingriffe'
    },
    description: {
      en: 'General medical procedures and treatments available',
      de: 'Allgemeine medizinische Verfahren und verfügbare Behandlungen'
    },
    color: '#1C3C47',
    icon: 'medical-cross'
  },
  {
    id: 'patient-stories',
    name: {
      en: 'Patient Stories',
      de: 'Patientengeschichten'
    },
    slug: {
      en: 'patient-stories',
      de: 'patientengeschichten'
    },
    description: {
      en: 'Real experiences and testimonials from our patients',
      de: 'Echte Erfahrungen und Testimonials unserer Patienten'
    },
    color: '#E8B4B8',
    icon: 'heart'
  },
  {
    id: 'travel-guide',
    name: {
      en: 'Travel Guide',
      de: 'Reiseführer'
    },
    slug: {
      en: 'travel-guide',
      de: 'reisefuehrer'
    },
    description: {
      en: 'Everything you need to know about traveling to Tunisia',
      de: 'Alles, was Sie über Reisen nach Tunesien wissen müssen'
    },
    color: '#F4A261',
    icon: 'plane'
  },
  {
    id: 'doctor-spotlights',
    name: {
      en: 'Doctor Spotlights',
      de: 'Arzt im Fokus'
    },
    slug: {
      en: 'doctor-spotlights',
      de: 'arzt-im-fokus'
    },
    description: {
      en: 'Meet our expert medical professionals and their specialties',
      de: 'Lernen Sie unsere medizinischen Experten und ihre Fachgebiete kennen'
    },
    color: '#264653',
    icon: 'stethoscope'
  },
  {
    id: 'recovery-tips',
    name: {
      en: 'Recovery Tips',
      de: 'Genesungstipps'
    },
    slug: {
      en: 'recovery-tips',
      de: 'genesungstipps'
    },
    description: {
      en: 'Post-procedure care and recovery guidelines',
      de: 'Nachbehandlung und Genesungsrichtlinien'
    },
    color: '#2A9D8F',
    icon: 'bandage'
  },
  {
    id: 'cost-comparisons',
    name: {
      en: 'Cost Comparisons',
      de: 'Kostenvergleiche'
    },
    slug: {
      en: 'cost-comparisons',
      de: 'kostenvergleiche'
    },
    description: {
      en: 'Transparent pricing and international cost comparisons',
      de: 'Transparente Preisgestaltung und internationale Kostenvergleiche'
    },
    color: '#E76F51',
    icon: 'calculator'
  }
];

// Authors/Medical Experts
export const AUTHORS: Author[] = [
  {
    id: 'dr-atef-souissi',
    name: 'Dr. Atef M. Souissi',
    title: {
      en: 'Chief Medical Officer & Plastic Surgeon',
      de: 'Ärztlicher Direktor & Plastischer Chirurg'
    },
    bio: {
      en: 'Dr. Souissi is a board-certified plastic surgeon with over 15 years of experience in aesthetic and reconstructive surgery. He specializes in facial procedures, body contouring, and breast surgery.',
      de: 'Dr. Souissi ist ein staatlich geprüfter plastischer Chirurg mit über 15 Jahren Erfahrung in der ästhetischen und rekonstruktiven Chirurgie. Er spezialisiert sich auf Gesichtsbehandlungen, Körperformung und Brustchirurgie.'
    },
    avatar: '/team/atef.jpg',
    linkedin: 'https://www.linkedin.com/in/mohamed-atef-souissi-a96742123',
    specialties: ['Plastic Surgery', 'Aesthetic Medicine', 'Reconstructive Surgery']
  },
  {
    id: 'alain-selmi',
    name: 'Ing. Alain A. Selmi',
    title: {
      en: 'CEO & Medical Tourism Coordinator',
      de: 'Geschäftsführer & Medizintourismus-Koordinator'
    },
    bio: {
      en: 'Alain Selmi is the founder and CEO of Sanovias, with extensive experience in international healthcare coordination and patient care management. He ensures seamless medical tourism experiences.',
      de: 'Alain Selmi ist Gründer und Geschäftsführer von Sanovias, mit umfangreicher Erfahrung in der internationalen Gesundheitskoordination und Patientenbetreuung. Er sorgt für nahtlose Medizintourismus-Erfahrungen.'
    },
    avatar: '/team/ala.jpg',
    linkedin: 'https://www.linkedin.com/in/alain-a-selmi-70686825/',
    specialties: ['Medical Tourism', 'Patient Care', 'Healthcare Management']
  }
];

// Common tags for medical tourism content
export const BLOG_TAGS = [
  // Medical procedures
  'rhinoplasty', 'breast-augmentation', 'liposuction', 'tummy-tuck', 'facelift',
  'dental-implants', 'teeth-whitening', 'orthodontics', 'oral-surgery',
  
  // Locations
  'tunisia', 'tunis', 'sousse', 'monastir', 'carthage',
  
  // General
  'medical-tourism', 'healthcare', 'recovery', 'costs', 'safety',
  'accreditation', 'certification', 'international-patients',
  
  // German equivalents
  'schönheitsoperationen', 'zahnbehandlung', 'medizintourismus',
  'tunesien', 'kosten', 'sicherheit', 'genesung'
];

// SEO Keywords by category
export const SEO_KEYWORDS = {
  'plastic-surgery': {
    en: [
      'plastic surgery tunisia',
      'cosmetic surgery tunisia',
      'tunisia plastic surgeon',
      'aesthetic surgery tunisia',
      'rhinoplasty tunisia cost'
    ],
    de: [
      'plastische chirurgie tunesien',
      'schönheitsoperationen tunesien',
      'ästhetische chirurgie tunesien',
      'nasenkorrektur tunesien kosten',
      'brustvergrößerung tunesien'
    ]
  },
  'dental-care': {
    en: [
      'dental tourism tunisia',
      'dental implants tunisia',
      'teeth treatment tunisia',
      'dental care abroad',
      'tunisia dentist'
    ],
    de: [
      'zahntourismus tunesien',
      'zahnimplantate tunesien',
      'zahnbehandlung tunesien',
      'zahnarzt tunesien',
      'zahnersatz tunesien kosten'
    ]
  }
};