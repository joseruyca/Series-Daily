import FriendsChoiceModePage from "@/src/components/friends/FriendsChoiceModePage";
import { friendsEmojiChallenges } from "@/src/data/friends-dailies";

export default function FriendsEmojiRoute() {
  return <FriendsChoiceModePage mode="emoji" challenges={friendsEmojiChallenges} />;
}