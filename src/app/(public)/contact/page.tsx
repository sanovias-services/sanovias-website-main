import Header from "../components/Header";

export const metadata = { title: "Contact | Smart Journey" };

export default function ContactPage() {
  return (
    <div>
      <Header />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">Tell us about your medical goals. A coordinator will respond with treatment options and a cost estimate.</p>
        <form className="bg-white p-8 rounded-xl shadow-md max-w-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="First Name" className="w-full p-3 border rounded" required />
            <input type="text" placeholder="Last Name" className="w-full p-3 border rounded" required />
          </div>
          <input type="email" placeholder="Email" className="w-full p-3 border rounded mb-4" required />
          <input type="tel" placeholder="Phone (optional)" className="w-full p-3 border rounded mb-4" />
          <select className="w-full p-3 border rounded mb-4" defaultValue="" required>
            <option value="" disabled>Interested Service</option>
            <option>Plastic Surgery</option>
            <option>Dental Care</option>
            <option>Complex Treatments</option>
            <option>Other</option>
          </select>
          <textarea placeholder="Describe your needs" className="w-full p-3 border rounded mb-4" rows={5} required></textarea>
          <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Submit</button>
          <p className="text-xs text-gray-500 mt-3 text-center">By submitting, you agree to be contacted regarding your inquiry.</p>
        </form>
      </section>
    </div>
  );
}
