import EditProfile from "./EditProfile";
import ProfileDetails from "./ProfileDetails";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Profile = () => {
  const [editting, setEditting] = useState(false);
  const [stage, setStage] = useState(0);
  const [profile, setProfile] = useState({});

  const startEditting = () => {
    setEditting(true);
  };

  return (
    <>
      <div className="bg-shade-0 shadow-lg flex justify-start items-center mx-auto mt-40 h-[60vh] w-2/3">
        <div
          className={`bg-shade-3 h-full ${
            editting ? "w-32" : "w-4"
          } transition-all hover:w-32 rounded-l-xl`}
        >
          {!editting ? null : <Sidebar stage={stage} setStage={setStage} />}
        </div>
        {!editting ? (
          <ProfileDetails startEditting={startEditting} />
        ) : (
          <EditProfile
            stage={stage}
            setStage={setStage}
            profile={profile}
            setProfile={setProfile}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
