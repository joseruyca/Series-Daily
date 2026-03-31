import SeriesPixelPage from "@/src/components/series/SeriesPixelPage";
import { anhqvPixelChallenges } from "@/src/data/anhqv-dailies";

export default function Page() {
  return <SeriesPixelPage slug="anhqv" seriesKey="anhqv" seriesTitle="Aquí no hay quien viva" challenges={anhqvPixelChallenges} />;
}
