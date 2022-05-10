import {
  Button,
  Icon,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { HiOutlineIdentification, HiOutlineMail } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { requests } from "../utils/requests";
import axios from "../utils/axios";

import { FaFemale } from "react-icons/fa";
import { FaMale } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { GoVerified } from "react-icons/go";
import {
  MdOutlineDownloading,
  MdOutlineLocationSearching,
} from "react-icons/md";
import { RiBankLine } from "react-icons/ri";
import { Tooltip } from "@chakra-ui/react";
import { saveAs } from "file-saver";
import { shade } from "./../../static/templates/colors";
import Loader from "../Loader";
const ProfileDetails = ({ startEditing }) => {
  const authToken = useSelector((state) => state.auth.token);
  const [document, setDocument] = useState();
  const [bankdetail, setBankDetail] = useState();
  const [isLoading, setLoading] = useState(false);
  const [aadhar_number, setAadharNumber] = useState("");
  const [account_number, setAccount_number] = useState("");
  const [aadhar_link, setAadharLink] = useState("");
  const [pan_link, setPanLink] = useState("");
  const [pan_number, setPan_number] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!authToken) {
      window.location.href = "/login";
    }
    setLoading(true);

    async function fetchDocuments() {
      try {
        const request = await axios.get(requests["getDocuments"]);

        const data = request.data.data;

        setDocument(data);
        parseData(data);
      } catch (e) {
        alert("Something Went Wrong");
      }
    }
    async function fetchBankDetails() {
      const request = await axios.get(requests["getBankDetails"]);
      return request;
    }

    fetchDocuments()
      .then((res) => {
        fetchBankDetails()
          .then((resp) => {
            const data = resp.data.data;

            parseData(data);
            setBankDetail(data);
          })
          .catch((e) => {
            alert("Something Went Wrong");
          });
      })
      .catch((e) => {
        alert("Something Went Wrong");
      });
    setLoading(false);
  }, []);

  var userData = useSelector((state) => state.auth.userinfo);
  const parseData = (document) => {
    if (!document) return;

    document.gov_id && setAadharLink(document.gov_id);
    document.gov_id && setPanLink(document.pan_card);
    document.gov_id_num &&
      setAadharNumber(
        document.gov_id_num
          .slice(0, document.gov_id_num.length - 4)
          .replace(/./g, "X") +
          document.gov_id_num.slice(document.gov_id_num.length - 4)
      );

    document.account_number &&
      setAccount_number(
        document.account_number
          .slice(0, document.account_number.length - 4)
          .replace(/./g, "X") +
          document.account_number.slice(document.account_number.length - 4)
      );
    // console.log(
    //   document.pan_card_num
    //     .slice(0, document.pan_card_num.length - 4)
    //     .replace(/./g, "X")
    // );

    document.pan_card_num &&
      setPan_number(
        document.pan_card_num
          .slice(0, document.pan_card_num.length - 4)
          .replace(/./g, "X") +
          document.pan_card_num.slice(document.pan_card_num.length - 4)
      );

    setIsVerified(userData.verified);
  };

  return (
    <>
      <div className="bg-shade-200 h-full w-1/3">
        <img
          src={
            userData.profile_pic
              ? window.env.REACT_APP_SERVER_URL + userData.profile_pic
              : "https://yt3.ggpht.com/a/AATXAJwSVMuE-eAnwzJvoEolJQpmR8olgQdlXks9qA=s900-c-k-c0xffffffff-no-rj-mo"
          }
          alt="Not Provided"
          className="object-cover h-full w-full"
        ></img>
        {isVerified ? (
          <Text
            fontSize="xl"
            fontWeight="bold"
            className="font-roboto text-center bg-transparent relative -top-8 h-0 flex gap-2 items-center justify-center"
            color={shade[600]}
          >
            <Icon as={GoVerified} />
            Verified
          </Text>
        ) : (
          <Text
            fontSize="lg"
            className="font-roboto text-center bg-transparent relative -top-8 h-0"
            color={shade[900]}
          >
            Verification: Pending
          </Text>
        )}
      </div>
      <div className="bg-shade-200 h-full w-2/3 rounded-r-xl px-24 flex flex-col justify-center gap-8">
        <div className="flex items-center justify-between w-full">
          <Text
            fontSize="5xl"
            className="font-roboto text-center capitalize"
            color={shade[900]}
          >
            {`${userData.first_name} ${userData.last_name}`.toLowerCase()}
          </Text>
          {userData.verified && (
            <div className="flex flex-col mt-12">
              <Stat textAlign="right">
                <StatLabel color={shade[500]}>CIBIL Score</StatLabel>
                <StatNumber color={shade[800]}>
                  {userData.cibil_score}
                </StatNumber>
              </Stat>
              <Stat textAlign="right">
                <StatLabel color={shade[500]}>Eligible Amount</StatLabel>
                <StatNumber color={shade[800]}>
                  ₹ {userData.eligible_amount.toLocaleString("en-IN")}
                </StatNumber>
              </Stat>
            </div>
          )}
        </div>

        <Text
          fontSize="2xl"
          className="font-roboto text-shade-4"
          color={shade[800]}
        >
          <Icon as={HiOutlineMail} /> {userData.email}
        </Text>

        <Text
          fontSize="2xl"
          className="font-roboto text-shade-4"
          color={shade[800]}
        >
          <Icon
            as={
              userData.gender
                ? userData.gender == "M"
                  ? FaMale
                  : FaFemale
                : FaMale
            }
          />{" "}
          {userData.age ? `${userData.age} Years Old` : "Not Provided"}
        </Text>

        <Text
          fontSize="2xl"
          className="font-roboto text-shade-4 flex items-center gap-4"
          color={shade[800]}
        >
          <Icon as={RiBankLine} />
          {account_number ? (
            <span className="flex  gap-4 items-center">
              <Text>{account_number}</Text>{" "}
            </span>
          ) : (
            "Not Provided"
          )}
        </Text>
        <Tooltip label="Aadhar Card" justifySelf="left">
          <Text
            fontSize="2xl"
            className="font-roboto text-shade-4 flex items-center gap-4"
            color={shade[800]}
          >
            <Icon as={HiOutlineIdentification} />{" "}
            {aadhar_number ? (
              <span className="flex gap-4 items-center">
                <Text color={shade[800]}>{aadhar_number}</Text>
                <Icon
                  as={MdOutlineDownloading}
                  onClick={(e) => {
                    saveAs(
                      window.env.REACT_APP_SERVER_URL + aadhar_link,
                      "Aadhar.pdf"
                    );
                  }}
                />
              </span>
            ) : (
              "Not Provided"
            )}
          </Text>
        </Tooltip>

        <Tooltip label="PAN Card" justifySelf="left">
          <Text
            fontSize="2xl"
            className="font-roboto text-shade-4 flex items-center gap-4"
            color={shade[800]}
          >
            <Icon as={HiOutlineIdentification} />{" "}
            {pan_number ? (
              <span className="flex gap-4 items-center">
                <Text>{pan_number}</Text>
                <Icon
                  as={MdOutlineDownloading}
                  onClick={(e) => {
                    saveAs(
                      window.env.REACT_APP_SERVER_URL + pan_link,
                      "Pan.pdf"
                    );
                  }}
                />
              </span>
            ) : (
              "Not Provided"
            )}
          </Text>
        </Tooltip>

        <Button
          leftIcon={<FiEdit3 />}
          colorScheme={shade[900]}
          variant="outline"
          className="w-fit ml-auto"
          onClick={startEditing}
        >
          Edit
        </Button>
        <Loader isLoading={isLoading}></Loader>
      </div>
      {/* </div> */}
    </>
  );
};

export default ProfileDetails;
