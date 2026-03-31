import SeriesChoicePage from "@/src/components/series/SeriesChoicePage";
import { officeQuoteChallenges } from "@/src/data/office-dailies";

export default function Page() {
  return <SeriesChoicePage slug="the-office" seriesKey="office" seriesTitle="The Office" mode="quote" challenges={officeQuoteChallenges} />;
}
