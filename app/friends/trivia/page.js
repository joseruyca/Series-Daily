import FriendsTriviaPage from "@/src/components/friends/FriendsTriviaPage";
import { friendsTriviaChallenges } from "@/src/data/friends-trivia";

export default function FriendsTriviaRoute() {
  return <FriendsTriviaPage challenges={friendsTriviaChallenges} />;
}
