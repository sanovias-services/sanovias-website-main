import { getAllCategories } from '@/lib/contentful/api';

export default async function TestLocalesPage() {
  // Test both locales
  const [enCategories, deCategories] = await Promise.all([
    getAllCategories('en'),
    getAllCategories('de')
  ]);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contentful Locales Test</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">English Categories ({enCategories.length})</h2>
            <ul className="space-y-2">
              {enCategories.map((cat: any) => (
                <li key={cat.sys.id} className="text-sm">
                  <strong>{cat.fields.name}</strong> 
                  <br />
                  <span className="text-gray-600">Slug: {cat.fields.slug}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">German Categories ({deCategories.length})</h2>
            <ul className="space-y-2">
              {deCategories.map((cat: any) => (
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