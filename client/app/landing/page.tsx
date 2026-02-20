import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <section className="py-12 px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome</h1>
                    <p className="text-lg text-gray-600">Moi</p>
                </section>
            </main>
            <Footer />
        </div>
    );
}