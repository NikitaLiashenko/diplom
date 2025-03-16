import { Card } from "@/components/ui/card";
import ProfileInfo from "./components/profile-info";

const Profile = () => {
  return (
    <Card className="max-w-[400px] mx-auto">
      <ProfileInfo />
    </Card>
  );
};

export default Profile;