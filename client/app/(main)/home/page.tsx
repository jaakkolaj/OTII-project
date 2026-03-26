import { HomeHeader } from "./_components/HomeHeader";
import { PipelineFocusSection } from "./_components/PipelineFocusSection";
import { StatsOverview } from "./_components/StatsOverview";

export default function Home() {

  return (
      <main className="container mx-auto flex flex-col gap-8 p-8">
        <HomeHeader />
        <StatsOverview />
        <PipelineFocusSection />
      </main>
  );
}
