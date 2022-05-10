import { useEffect, useState } from "react";

import EditProfile from "./EditProfile";
import ProfileDetails from "./ProfileDetails";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  logOutSuccess,
  signInSuccess,
} from "../../store/modules/auth/auth.action";
import { requests } from "../utils/requests";
import axios from "../utils/axios";
import Loader from "../Loader";
const Profile = () => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const [profile, setProfile] = useState({});
  var userinfo = useSelector((state) => state.auth.userinfo);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    async function fetchDocuments() {
      const request = await axios.get(requests["getDocuments"]);
      return request;
    }
    async function fetchBankDetails() {
      const request = await axios.get(requests["getBankDetails"]);
      return request;
    }

    fetchDocuments()
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        setProfile((prevState) => ({
          ...userinfo,
          ...data,
        }));
        fetchBankDetails()
          .then((resp) => {
            console.log(resp);
            const data = resp.data.data;
            console.log(data);
            setProfile((prevState) => ({
              ...prevState,
              ...data,
            }));
          })
          .catch((e) => {
            console.log(e);
            alert("Something Went Wrong");
          });
      })
      .catch((e) => {
        console.log(e);
        alert("Something Went Wrong");
      });
  }, []);

  const startEditing = () => {
    setEditing(true);
  };

  const stopEditing = () => {
    setEditing(false);
    window.location.href = "/";
    setStage(0);
  };

  function onSubmit(profile) {
    setLoading(true);
    console.log(profile);
    let documentformData = new FormData();
    profile.gov_id_obj && documentformData.append("gov_id", profile.gov_id_obj);
    profile.pan_card_obj &&
      documentformData.append("pan_card", profile.pan_card_obj);
    if (profile.pay_slips_obj) {
      for (var i = 0; i < profile.pay_slips_obj.length; i++) {
        documentformData.append("pay_slips", profile.pay_slips_obj[i]);
      }
    }

    profile.gov_id_num &&
      documentformData.append("gov_id_num", profile.gov_id_num);
    profile.pan_card_num &&
      documentformData.append("pan_card_num", profile.pan_card_num);
    console.log(documentformData);
    async function submitDocuments() {
      const request = await axios({
        method: "POST",
        url: requests["getDocuments"],
        data: documentformData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return request;
    }

    submitDocuments()
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        alert("Documents Uploaded");
      })
      .catch((e) => {
        console.log(e);
        alert("Something went wrong");
      });
    const bankdata = {
      account_number: profile.account_number,
      ifsc_code: profile.ifsc_code,
      holder_name: profile.holder_name,
      branch_name: profile.branch_name,
    };
    async function editBankDetail() {
      const request = await axios({
        method: "POST",
        url: requests["getBankDetails"],
        data: bankdata,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return request;
    }

    editBankDetail()
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        alert("Bank Details Added");
      })
      .catch((e) => {
        console.log(e);
        alert("Something went wrong");
      });
    var profileData = new FormData();
    profile.profile_pic_obj &&
      profileData.append("profile_pic", profile.profile_pic_obj);
    profileData.append("first_name", profile.first_name);
    profileData.append("last_name", profile.last_name);
    profileData.append("age", profile.age);
    profileData.append("gender", profile.gender);

    async function editProfile() {
      const request = await axios({
        method: "POST",
        url: requests["editProfile"],
        data: profileData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return request;
    }

    editProfile()
      .then((res) => {
        const userinfo = res.data.data;

        dispatch(signInSuccess({ token, userinfo }));
        alert("Profile Updated");
        window.location.href = "/";
      })
      .catch((e) => {
        console.log(e);
        alert("Something went wrong");
      });
    setLoading(false);
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
        <Loader isLoading={isLoading}></Loader>
      </div>
    </>
  );
};

export default Profile;
