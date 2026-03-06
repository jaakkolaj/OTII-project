import { Navbar } from '@/app/(landing)/_components/navbar'
import { Hero } from '@/app/(landing)/_components/hero'
import { Problem } from '@/app/(landing)/_components/problem'
import { Solution } from '@/app/(landing)/_components/solution'
import { HowItWorks } from '@/app/(landing)/_components/how-it-works'
import { Comparison } from '@/app/(landing)/_components/comparison'
import { SocialProof } from '@/app/(landing)/_components/social-proof'
import { FinalCTA } from '@/app/(landing)/_components/final-cta'
import { Footer } from '@/app/(landing)/_components/footer'

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
