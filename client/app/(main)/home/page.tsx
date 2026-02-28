import { ActivityInsightsSection } from "./components/ActivityInsightsSection";
import { HiringHealthSection } from "./components/HiringHealthSection";
import { HomeHeader } from "./components/HomeHeader";
import { PipelineFocusSection } from "./components/PipelineFocusSection";
import { StatsOverview } from "./components/StatsOverview";

export default function Home() {
  return (
      <main className="container mx-auto flex flex-col gap-8 p-8">
        <HomeHeader />
        <StatsOverview />
        <PipelineFocusSection />
        <ActivityInsightsSection />
        <HiringHealthSection />
      </main>
  );
}
