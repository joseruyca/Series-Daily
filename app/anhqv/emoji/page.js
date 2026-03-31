import SeriesChoicePage from "@/src/components/series/SeriesChoicePage";
import { anhqvEmojiChallenges } from "@/src/data/anhqv-dailies";

export default function Page() {
  return <SeriesChoicePage slug="anhqv" seriesKey="anhqv" seriesTitle="Aquí no hay quien viva" mode="emoji" challenges={anhqvEmojiChallenges} />;
}
