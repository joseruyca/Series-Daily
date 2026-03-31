import SeriesChoicePage from "@/src/components/series/SeriesChoicePage";
import { scrubsEmojiChallenges } from "@/src/data/scrubs-dailies";

export default function Page() {
  return <SeriesChoicePage slug="scrubs" seriesKey="scrubs" seriesTitle="Scrubs" mode="emoji" challenges={scrubsEmojiChallenges} />;
}
