import SeriesCharacterPage from "@/src/components/series/SeriesCharacterPage";
import { scrubsCharacterChallenges, scrubsCharacterProfiles } from "@/src/data/scrubs-dailies";

export default function Page() {
  return <SeriesCharacterPage slug="scrubs" seriesKey="scrubs" seriesTitle="Scrubs" challenges={scrubsCharacterChallenges} profiles={scrubsCharacterProfiles} />;
}
