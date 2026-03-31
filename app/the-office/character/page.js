import SeriesCharacterPage from "@/src/components/series/SeriesCharacterPage";
import { officeCharacterChallenges, officeCharacterProfiles } from "@/src/data/office-dailies";

export default function Page() {
  return <SeriesCharacterPage slug="the-office" seriesKey="office" seriesTitle="The Office" challenges={officeCharacterChallenges} profiles={officeCharacterProfiles} />;
}
