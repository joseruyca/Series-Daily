import SeriesChoicePage from "@/src/components/series/SeriesChoicePage";
import { friendsTriviaChallenges } from "@/src/data/friends-dailies";

export default function Page() {
  return <SeriesChoicePage slug="friends" seriesKey="friends" seriesTitle="Friends" mode="trivia" challenges={friendsTriviaChallenges} />;
}
