import FriendsChoiceModePage from "@/src/components/friends/FriendsChoiceModePage";
import { friendsTriviaChallenges } from "@/src/data/friends-trivia";

export default function FriendsTriviaRoute() {
  return <FriendsChoiceModePage mode="trivia" challenges={friendsTriviaChallenges} />;
}
