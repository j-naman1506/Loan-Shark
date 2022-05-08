import EditProfileDetails from "./EditProfileDetails";
import { useState } from "react";

const EditProfile = ({ stage, setStage, profile, setProfile }) => {
	const renderStage = (_stage) => {
		switch (_stage) {
			case 0:
				return <EditProfileDetails profile={profile} setProfile={setProfile} />;
			// case 1:
			// 	return <EditBankDetails />;
			// case 2:
			// 	return <EditAadharDetails />;
			// case 3:
			// 	return <EditPANDetails />;
		}
	};

	return (
		<>
			<div className="bg-shade-1 w-full h-full flex">{renderStage(stage)}</div>
		</>
	);
};

export default EditProfile;
