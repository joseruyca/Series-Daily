import SeriesChoicePage from "@/src/components/series/SeriesChoicePage";
import { anhqvTriviaChallenges } from "@/src/data/anhqv-dailies";

export default function Page() {
  return <SeriesChoicePage slug="anhqv" seriesKey="anhqv" seriesTitle="Aquí no hay quien viva" mode="trivia" challenges={anhqvTriviaChallenges} />;
}
