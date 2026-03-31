import SeriesPixelPage from "@/src/components/series/SeriesPixelPage";
import { officePixelChallenges } from "@/src/data/office-dailies";

export default function Page() {
  return <SeriesPixelPage slug="the-office" seriesKey="office" seriesTitle="The Office" challenges={officePixelChallenges} />;
}
