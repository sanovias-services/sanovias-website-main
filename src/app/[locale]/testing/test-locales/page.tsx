import { getAllCategories } from '@/lib/contentful/api';

// Simple interface for category data
interface CategoryEntry {
  sys: { id: string };
  fields: { name: string; slug: string };
}

export default async function TestLocalesPage() {
  // Test both locales
  const [enCategories, deCategories] = await Promise.all([
    getAllCategories('en'),
    getAllCategories('de')
  ]);

  // Cast to our simple interface (via unknown for safety)
  const englishCategories = enCategories as unknown as CategoryEntry[];
  const germanCategories = deCategories as unknown as CategoryEntry[];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contentful Locales Test</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">English Categories ({englishCategories.length})</h2>
            <ul className="space-y-2">
              {englishCategories.map((cat: CategoryEntry) => (
                <li key={cat.sys.id} className="text-sm">
                  <strong>{cat.fields.name}</strong> 
                  <br />
                  <span className="text-gray-600">Slug: {cat.fields.slug}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">German Categories ({germanCategories.length})</h2>
            <ul className="space-y-2">
              {germanCategories.map((cat: CategoryEntry) => (
                <li key={cat.sys.id} className="text-sm">
                  <strong>{cat.fields.name}</strong>
                  <br />
                  <span className="text-gray-600">Slug: {cat.fields.slug}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}