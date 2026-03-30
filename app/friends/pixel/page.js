import FriendsPixelPage from "@/src/components/friends/FriendsPixelPage";
import { friendsPixelChallenges } from "@/src/data/friends-dailies";

export default function FriendsPixelRoute() {
  return <FriendsPixelPage challenges={friendsPixelChallenges} />;
}