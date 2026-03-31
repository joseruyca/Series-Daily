import SeriesPixelPage from "@/src/components/series/SeriesPixelPage";
import { scrubsPixelChallenges } from "@/src/data/scrubs-dailies";

export default function Page() {
  return <SeriesPixelPage slug="scrubs" seriesKey="scrubs" seriesTitle="Scrubs" challenges={scrubsPixelChallenges} />;
}
