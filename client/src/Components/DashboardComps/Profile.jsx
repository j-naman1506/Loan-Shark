import { useEffect, useState } from "react";

import EditProfile from "./EditProfile";
import ProfileDetails from "./ProfileDetails";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [stage, setStage] = useState(0);
  const [profile, setProfile] = useState({});
  var userinfo = useSelector((state) => state.auth.userinfo);
  useEffect(() => {
    setProfile(userinfo);
    // async function fetchDocuments() {
    //   const request = await axios.get(requests["getDocuments"]);
    //   return request;
    // }

    // fetchDocuments()
    //   .then((res) => {
    //     const data = res.data.data;
    //     setProfile((prevState) => ({
    //       ...profile,
    //       ...data,
    //     }));
    //   })
    //   .catch((e) => {
    //     alert("Something Went Wrong");
    //   });

    // async function fetchBankDetails() {
    //   const request = await axios.get(requests["getBankDetails"]);
    //   return request;
    // }

    // fetchBankDetails()
    //   .then((res) => {
    //     const data = res.data.data;
    //     setProfile((prevState) => ({
    //       ...profile,
    //       ...data,
    //     }));
    //   })
    //   .catch((e) => {
    //     alert("Something Went Wrong");
    //   });
  }, []);

  const startEditing = () => {
    setEditing(true);
  };

  const stopEditing = () => {
    setEditing(false);
    setProfile(userinfo);
    setStage(0);
  };
  console.log(profile);
  function onSubmit() {
    console.log(profile);
  }
  return (
    <>
      <div className="bg-shade-100 shadow-lg flex justify-start items-center mx-auto mt-[5vh] h-[80vh] w-3/4">
        <div
          className={`bg-shade-500 h-full ${
            editing ? "w-32" : "w-4"
          } transition-all hover:w-32 rounded-l-xl`}
        >
          {!editing ? null : <Sidebar stage={stage} setStage={setStage} />}
        </div>
        {!editing ? (
          <ProfileDetails startEditing={startEditing} />
        ) : (
          <EditProfile
            stage={stage}
            setStage={setStage}
            profile={profile}
            setProfile={setProfile}
            stopEditing={stopEditing}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
