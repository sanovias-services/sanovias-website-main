import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("privacy.title") || "Privacy Policy - Sanovias Medical Tourism",
    description: t("privacy.description") || "Read our comprehensive privacy policy to understand how Sanovias Medical Tourism protects and processes your personal data in compliance with GDPR and Austrian law.",
    robots: "index, follow",
    alternates: {
      languages: {
        en: "/en/policies/privacy",
        de: "/de/policies/privacy",
      },
    },
  };
}