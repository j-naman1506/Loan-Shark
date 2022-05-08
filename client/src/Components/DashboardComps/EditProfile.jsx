import EditAadharDetails from "./EditAadharDetails";
import EditBankDetails from "./EditBankDetails";
import EditPaySlips from "./EditPaySlips";
import EditProfileDetails from "./EditProfileDetails";
import { useState } from "react";

const EditProfile = ({
  stage,
  setStage,
  profile,
  setProfile,
  stopEditing,
  onSubmit,
}) => {
  const renderStage = (_stage) => {
    switch (_stage) {
      case 0:
        return (
          <EditProfileDetails
            stage={stage}
            setStage={setStage}
            profile={profile}
            setProfile={setProfile}
            stopEditing={stopEditing}
          />
        );
      case 1:
        return (
          <EditBankDetails
            stage={stage}
            setStage={setStage}
            profile={profile}
            setProfile={setProfile}
            stopEditing={stopEditing}
          />
        );
      case 2:
        return (
          <EditAadharDetails
            stage={stage}
            setStage={setStage}
            profile={profile}
            setProfile={setProfile}
            stopEditing={stopEditing}
          />
        );
      case 3:
        return (
          <EditPaySlips
            stage={stage}
            setStage={setStage}
            profile={profile}
            setProfile={setProfile}
            stopEditing={stopEditing}
            onSubmit={onSubmit}
          />
        );
    }
  };

  return (
    <>
      <div className="bg-shade-1 w-full h-full flex">{renderStage(stage)}</div>
    </>
  );
};

export default EditProfile;
