import { Button, Icon, Text } from "@chakra-ui/react";
import { HiOutlineIdentification, HiOutlineMail } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { FaFemale } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { GoVerified } from "react-icons/go";
import { MdOutlineDownloading } from "react-icons/md";
import { RiBankLine } from "react-icons/ri";
import { Tooltip } from "@chakra-ui/react";
import { saveAs } from "file-saver";
import { shade } from "./../../static/templates/colors";

const ProfileDetails = ({ startEditing }) => {
  const authToken = useSelector((state) => state.auth.token);
  const [document, setDocument] = useState();
  const [bankdetail, setBankDetail] = useState();
  useEffect(() => {
    if (!authToken) {
      window.location.href = "/login";
    }
    // async function fetchDocuments() {
    //   const request = await axios.get(requests["getDocuments"]);
    //   return request;
    // }

    // fetchDocuments()
    //   .then((res) => {
    //     const data = res.data.data;
    //     setDocument(data);
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
    //     setBankDetail(data);
    //   })
    //   .catch((e) => {
    //     alert("Something Went Wrong");
    //   });
  }, []);

  var userData = useSelector((state) => state.auth.userinfo);
  var aadhar_number = "",
    account_number = "",
    pan_number = "";
  //   var aadhar_number =
  //     document.gov_id_num
  //       .slice(0, document.gov_id_num.length - 4)
  //       .replace(/./g, "X") +
  //     document.gov_id_num.slice(document.gov_id_num.length - 4);

  //   var account_number =
  //     bankdetail.account_number
  //       .slice(0, bankdetail.account_number.length - 4)
  //       .replace(/./g, "X") +
  //     bankdetail.account_number.slice(bankdetail.account_number.length - 4);

  //   var pan_number =
  //     document.pan_card_num
  //       .slice(0, document.pan_card_num.length - 4)
  //       .replace(/./g, "X") +
  //     document.pan_number.slice(document.pan_card_num.length - 4);

  var isVerified = userData.is_verified;

  console.log(userData);
  return (
    <>
      <div className="bg-shade-200 h-full w-1/3">
        <img
          src="https://i.pinimg.com/736x/cb/45/72/cb4572f19ab7505d552206ed5dfb3739.jpg"
          alt="Helen Cross"
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
        <Text
          fontSize="5xl"
          className="font-roboto text-center capitalize pb-12"
          color={shade[900]}
        >
          {`${userData.first_name} ${userData.last_name}`.toLowerCase()}
        </Text>

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
          <Icon as={FaFemale} />{" "}
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
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                      "aadhar.pdf"
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
                      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                      "aadhar.pdf"
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
      </div>
      {/* </div> */}
    </>
  );
};

export default ProfileDetails;
