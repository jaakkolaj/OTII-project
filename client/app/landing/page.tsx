
import { FileText, Users, BarChart3, Zap, Shield, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <FileText className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-display text-lg font-bold text-foreground">ResumeIQ</span>
      </div>
      <div className="hidden items-center gap-6 md:flex">
        <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</a>
        <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">How it works</a>
        <a href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About</a>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="hidden sm:inline-flex">
          Sign In
        </Button>
        <Button variant="navCta" size="sm" className="group">
          Start Analyzing
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </div>
  </nav>
);

const HeroSection = () => (
  <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(0_72%_55%/0.08),transparent_60%)]" />
    <div className="relative z-10 mx-auto max-w-4xl text-center">
      <Badge variant="outline" className="mb-6 gap-2 px-4 py-1.5 text-sm">
        <Zap className="h-3.5 w-3.5 text-primary" />
        AI-Powered Resume Analysis for Recruiters
      </Badge>
      <h1 className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
        Hire smarter.<br />
        <span className="text-primary">Hire faster.</span>
      </h1>
      <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
        Upload resumes, get instant AI-driven insights, and find the best candidates in seconds — not hours. Built for modern recruiting teams.
      </p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button variant="hero" size="lg" className="group">
          Start Analyzing
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
        <Button variant="outline" size="lg">
          See Demo
        </Button>
      </div>
    </div>
  </section>
);

const stats = [
  { value: "10x", label: "Faster screening", icon: Clock },
  { value: "85%", label: "Match accuracy", icon: BarChart3 },
  { value: "500+", label: "Resumes per hour", icon: FileText },
  { value: "24/7", label: "Always available", icon: Shield },
];

const StatsSection = () => (
  <section className="border-y border-border bg-card/50 px-6 py-16">
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-0 bg-transparent text-center shadow-none">
          <CardContent className="p-4">
            <stat.icon className="mx-auto mb-3 h-5 w-5 text-primary" />
            <div className="font-display text-3xl font-bold text-foreground">{stat.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

const features = [
  {
    icon: FileText,
    title: "Instant Resume Parsing",
    description: "Upload PDFs or documents and get structured candidate data in seconds with our AI engine.",
  },
  {
    icon: BarChart3,
    title: "Candidate Scoring",
    description: "Automatically score and rank candidates against your job requirements with smart matching.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share candidate insights with your hiring team and make decisions together in real-time.",
  },
  {
    icon: Zap,
    title: "Skill Gap Analysis",
    description: "Identify missing skills and potential growth areas for each candidate at a glance.",
  },
  {
    icon: Shield,
    title: "Bias-Free Screening",
    description: "Our AI focuses on skills and qualifications, promoting fair and objective hiring decisions.",
  },
  {
    icon: Clock,
    title: "Pipeline Tracking",
    description: "Track candidates through every stage of your hiring pipeline from one dashboard.",
  },
];

const FeaturesSection = () => (
  <section id="features" className="px-6 py-24">
    <div className="mx-auto max-w-6xl">
      <div className="mb-16 text-center">
        <Badge variant="outline" className="mb-3 uppercase tracking-wider">Features</Badge>
        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Everything you need to recruit better
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="group transition-all hover:border-primary/30 hover:shadow-[var(--shadow-glow)]"
          >
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="font-display text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const steps = [
  { step: "01", title: "Upload Resumes", description: "Drag and drop candidate resumes in any format." },
  { step: "02", title: "AI Analysis", description: "Our engine extracts and evaluates skills, experience, and fit." },
  { step: "03", title: "Review & Decide", description: "Get ranked candidates with actionable insights for your team." },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="px-6 py-24">
    <Separator className="mx-auto mb-24 max-w-6xl" />
    <div className="mx-auto max-w-4xl">
      <div className="mb-16 text-center">
        <Badge variant="outline" className="mb-3 uppercase tracking-wider">How it works</Badge>
        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Three steps to better hiring
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((s) => (
          <Card key={s.step} className="border-0 bg-transparent text-center shadow-none">
            <CardContent className="p-4">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 font-display text-lg font-bold text-primary">
                {s.step}
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="px-6 py-24">
    <Card className="mx-auto max-w-3xl p-12 text-center shadow-[var(--shadow-glow)]">
      <CardHeader>
        <CardTitle className="font-display text-3xl md:text-4xl">
          Ready to transform your recruiting?
        </CardTitle>
        <CardDescription className="text-base">
          Join forward-thinking teams already using ResumeIQ to find top talent faster.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <Button variant="hero" size="lg" className="group">
          Get Started
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  </section>
);

const Footer = () => (
  <footer id="about" className="px-6 py-12">
    <Separator className="mx-auto mb-12 max-w-6xl" />
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
          <FileText className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
        <span className="font-display text-sm font-bold text-foreground">ResumeIQ</span>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Built with ❤️ by a student team in Kuopio, Finland
      </p>
      <p className="text-sm text-muted-foreground">© 2026 ResumeIQ</p>
    </div>
  </footer>
);

// Next.js page component — use `export default function LandingPage()` in your Next.js project
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}
