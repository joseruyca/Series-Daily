import SeriesCharacterPage from "@/src/components/series/SeriesCharacterPage";
import { anhqvCharacterChallenges, anhqvCharacterProfiles } from "@/src/data/anhqv-dailies";

export default function Page() {
  return <SeriesCharacterPage slug="anhqv" seriesKey="anhqv" seriesTitle="Aquí no hay quien viva" challenges={anhqvCharacterChallenges} profiles={anhqvCharacterProfiles} />;
}
