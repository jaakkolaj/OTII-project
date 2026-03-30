import { requireAuth } from "@/lib/auth/require-auth";
import { getTasks } from "@/app/services/homePageService";
import { PipelineFocusSectionClient } from "./PipelineFocusSectionClient";

export async function PipelineFocusSection() {
  const tasks = await requireAuth(() => getTasks());

  return <PipelineFocusSectionClient tasks={tasks} />;
}
