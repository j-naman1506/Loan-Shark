import { HiOutlineIdentification, HiOutlineMail } from "react-icons/hi";
import { Icon, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { FaFemale } from "react-icons/fa";
import { RiBankLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { MdOutlineDownloading } from "react-icons/md";
import { Tooltip } from "@chakra-ui/react";
import { saveAs } from "file-saver";
const ProfileDetails = ({ startEditting }) => {
  const [editting, setEditting] = useState(false);

  const authToken = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (!authToken) {
      window.location.href = "/login";
    }
  }, []);
  var userData = useSelector((state) => state.auth.userinfo);
  userData.aadhar_no = "125656782341";
  userData.account_no = "125656781234";
  userData.pan_no = "125656781234";
  var aadhar_no =
    userData.aadhar_no
      .slice(0, userData.aadhar_no.length - 4)
      .replace(/./g, "X") +
    userData.aadhar_no.slice(userData.aadhar_no.length - 4);

  var account_no =
    userData.account_no
      .slice(0, userData.account_no.length - 4)
      .replace(/./g, "X") +
    userData.account_no.slice(userData.account_no.length - 4);

  var pan_no =
    userData.pan_no.slice(0, userData.pan_no.length - 4).replace(/./g, "X") +
    userData.pan_no.slice(userData.pan_no.length - 4);

  console.log(userData);
  return (
    <>
      {/* <div className="bg-shade-0 shadow-lg flex justify-center items-center mx-auto mt-40 h-[60vh] w-2/3">
       <div */}
      {/* //     className={`bg-shade-3 h-full ${
    //       editting ? "w-24" : "w-4"
    //     } transition-all hover:w-24 rounded-l-xl`}
    //   ></div> */}
      <div className="bg-shade-2 h-full w-1/3">
        <img
          src="https://i.pinimg.com/736x/cb/45/72/cb4572f19ab7505d552206ed5dfb3739.jpg"
          alt="Helen Cross"
          className="object-cover h-full w-full"
        ></img>
      </div>
      <div className="bg-shade-1 h-full w-2/3 rounded-r-xl px-4 py-2 flex flex-col gap-4">
        <Text fontSize="5xl" className="font-roboto text-center capitalize">
          {`${userData.first_name} ${userData.last_name}`.toLowerCase()}
        </Text>

        <Text fontSize="2xl" className="font-roboto text-shade-4">
          <Icon as={HiOutlineMail} /> {userData.email}
        </Text>

        <Text fontSize="2xl" className="font-roboto text-shade-4">
          <Icon as={FaFemale} />{" "}
          {userData.age ? `${userData.age} $ Years Old` : "Not Provided"}
        </Text>

        <Text
          fontSize="2xl"
          className="font-roboto text-shade-4 flex items-center gap-4"
        >
          <Icon as={RiBankLine} />
          {account_no ? (
            <span className="flex  gap-4 items-center">
              <Text>{account_no}</Text>{" "}
            </span>
          ) : (
            "Not Provided"
          )}
        </Text>

        <Text
          fontSize="2xl"
          className="font-roboto text-shade-4 flex items-center gap-4"
        >
          <Icon as={HiOutlineIdentification} />{" "}
          {aadhar_no ? (
            <span className="flex gap-4 items-center">
              <Text>{aadhar_no}</Text>
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

        <Tooltip label="PAN Card">
          <Text
            fontSize="2xl"
            className="font-roboto text-shade-4 flex items-center gap-4"
          >
            <Icon as={HiOutlineIdentification} />{" "}
            {pan_no ? (
              <span className="flex gap-4 items-center">
                <Text>{pan_no}</Text>
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
      </div>
      {/* </div> */}
    </>
  );
};

export default ProfileDetails;
