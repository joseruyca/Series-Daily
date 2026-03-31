import SeriesChoicePage from "@/src/components/series/SeriesChoicePage";
import { officeEmojiChallenges } from "@/src/data/office-dailies";

export default function Page() {
  return <SeriesChoicePage slug="the-office" seriesKey="office" seriesTitle="The Office" mode="emoji" challenges={officeEmojiChallenges} />;
}
