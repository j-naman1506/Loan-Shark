import EditProfile from "./EditProfile";
import ProfileDetails from "./ProfileDetails";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Profile = () => {
	const [editing, setEditing] = useState(false);
	const [stage, setStage] = useState(0);
	const [profile, setProfile] = useState({});

	const startEditing = () => {
		setEditing(true);
	};

	const stopEditing = () => {
		setEditing(false);
	};

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
					/>
				)}
			</div>
		</>
	);
};

export default Profile;
