import SeriesChoicePage from "@/src/components/series/SeriesChoicePage";
import { officeTriviaChallenges } from "@/src/data/office-dailies";

export default function Page() {
  return <SeriesChoicePage slug="the-office" seriesKey="office" seriesTitle="The Office" mode="trivia" challenges={officeTriviaChallenges} />;
}
