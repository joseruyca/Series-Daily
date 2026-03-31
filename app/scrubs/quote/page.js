import SeriesChoicePage from "@/src/components/series/SeriesChoicePage";
import { scrubsQuoteChallenges } from "@/src/data/scrubs-dailies";

export default function Page() {
  return <SeriesChoicePage slug="scrubs" seriesKey="scrubs" seriesTitle="Scrubs" mode="quote" challenges={scrubsQuoteChallenges} />;
}
