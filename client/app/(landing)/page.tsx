import { Navbar } from '@/app/(landing)/components/navbar'
import { Hero } from '@/app/(landing)/components/hero'
import { Problem } from '@/app/(landing)/components/problem'
import { Solution } from '@/app/(landing)/components/solution'
import { HowItWorks } from '@/app/(landing)/components/how-it-works'
import { Comparison } from '@/app/(landing)/components/comparison'
import { SocialProof } from '@/app/(landing)/components/social-proof'
import { FinalCTA } from '@/app/(landing)/components/final-cta'
import { Footer } from '@/app/(landing)/components/footer'

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                <Hero />
                <Problem />
                <Solution />
                <HowItWorks />
                <Comparison />
                <SocialProof />
                <FinalCTA />
            </main>
            <Footer />
        </div>
    );
}
