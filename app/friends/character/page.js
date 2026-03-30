import FriendsCharacterPage from "@/src/components/friends/FriendsCharacterPage";
import { friendsCharacterChallenges, friendsCharacterProfiles } from "@/src/data/friends-dailies";

export default function FriendsCharacterRoute() {
  return (
    <FriendsCharacterPage
      challenges={friendsCharacterChallenges}
      profiles={friendsCharacterProfiles}
    />
  );
}