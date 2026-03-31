import SeriesChoicePage from "@/src/components/series/SeriesChoicePage";
import { scrubsTriviaChallenges } from "@/src/data/scrubs-dailies";

export default function Page() {
  return <SeriesChoicePage slug="scrubs" seriesKey="scrubs" seriesTitle="Scrubs" mode="trivia" challenges={scrubsTriviaChallenges} />;
}
