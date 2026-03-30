import FriendsChoiceModePage from "@/src/components/friends/FriendsChoiceModePage";
import { friendsQuoteChallenges } from "@/src/data/friends-dailies";

export default function FriendsQuoteRoute() {
  return <FriendsChoiceModePage mode="quote" challenges={friendsQuoteChallenges} />;
}