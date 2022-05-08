import "@react-pdf-viewer/core/lib/styles/index.css";

import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Viewer } from "@react-pdf-viewer/core";
import { shade } from "./../../static/templates/colors";

const EditAadharDetails = ({
  stage,
  setStage,
  stopEditing,
  profile,
  setProfile,
}) => {
  const [personalDetails, setDetails] = useState({});

  useEffect(() => {
    setDetails(profile);
  }, []);

  const onAadharChange = (e) => {
    const files = e.target.files;
    files.length > 0 && setAadharUrl(URL.createObjectURL(files[0]));
  };

  const onPanChange = (e) => {
    const files = e.target.files;
    files.length > 0 && setPanUrl(URL.createObjectURL(files[0]));
  };

  function handleChange(e) {
    setDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  function handleFileChange(e) {
    let fileurl = URL.createObjectURL(e.target.files[0]);
    setDetails((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.files[0],
      [e.target.name]: fileurl,
    }));
  }
  function handleContinue() {
    console.log(personalDetails);
    setProfile((prevState) => ({
      ...profile,
      ...personalDetails,
    }));
    setStage(stage + 1);
    console.log(profile);
  }
  function handleBack() {
    console.log(personalDetails);
    setProfile((prevState) => ({
      ...profile,
      ...personalDetails,
    }));
    setStage(stage - 1);
    console.log(profile);
  }

  if (!personalDetails) return null;

  return (
    <>
      <div className="bg-shade-200 h-full w-full rounded-r-xl py-6 px-12 flex flex-col gap-4">
        <Heading as="h2" size="xl" textAlign="center">
          Aadhar & PAN Details
        </Heading>
        <form className="flex flex-col h-full justify-evenly gap-8 ">
          <div className="flex gap-4">
            <FormControl>
              <FormLabel htmlFor="aadhar_number">Aadhar Number</FormLabel>
              <Input
                id="gov_id_num"
                type="text"
                name="gov_id_num"
                borderColor={shade[800]}
                _hover={{ borderColor: shade[900] }}
                _active={{ borderColor: shade[900] }}
                value={
                  personalDetails.gov_id_num ? personalDetails.gov_id_num : ""
                }
                onChange={handleChange}
                borderWidth={1}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="pan">PAN</FormLabel>
              <Input
                id="pan_card_num"
                type="text"
                name="pan_card_num"
                borderColor={shade[800]}
                _hover={{ borderColor: shade[900] }}
                _active={{ borderColor: shade[900] }}
                borderWidth={1}
                value={
                  personalDetails.pan_card_num
                    ? personalDetails.pan_card_num
                    : ""
                }
                onChange={handleChange}
              />
            </FormControl>
          </div>

          <div className="flex gap-4">
            <FormControl>
              <FormLabel htmlFor="aadhar_card">
                Upload your Aadhar Card in PDF format
              </FormLabel>
              <Input
                id="gov_id_obj"
                type="file"
                accept="application/pdf"
                name="gov_id"
                fontSize="lg"
                padding="1"
                borderColor={shade[800]}
                _hover={{ borderColor: shade[900] }}
                _active={{ borderColor: shade[900] }}
                borderWidth={1}
                onChange={handleFileChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="pan_card">
                Upload your PAN Card in PDF format
              </FormLabel>
              <Input
                id="pan_card_obj"
                type="file"
                accept="application/pdf"
                name="pan_card"
                fontSize="lg"
                padding="1"
                borderColor={shade[800]}
                _hover={{ borderColor: shade[900] }}
                _active={{ borderColor: shade[900] }}
                borderWidth={1}
                onChange={handleFileChange}
              />
            </FormControl>
          </div>

          <div className="flex h-full gap-4">
            {personalDetails.gov_id ? (
              <div className="h-56 m-0 p-0 w-full overflow-y-scroll">
                <Viewer fileUrl={personalDetails.gov_id} />
              </div>
            ) : (
              <div className="flex justify-center items-center h-full w-full border-2 border-shade-900 border-dashed border-opacity-30 text-3xl">
                Your uploaded Aadhar Card will show here
              </div>
            )}
            {personalDetails.pan_card ? (
              <div className="h-56 m-0 p-0 w-full overflow-y-scroll">
                <Viewer fileUrl={personalDetails.pan_card} />
              </div>
            ) : (
              <div className="flex justify-center items-center h-full w-full border-2 border-shade-900 border-dashed border-opacity-30 text-3xl">
                Your uploaded PAN Card will show here
              </div>
            )}
          </div>

          <ButtonGroup spacing="6">
            <Button
              leftIcon={<ArrowBackIcon />}
              bgColor={shade[200]}
              textColor={shade[800]}
              borderWidth={1}
              borderColor={shade[800]}
              _hover={{
                bgColor: shade[500],
                textColor: shade[900],
                borderColor: shade[900],
                borderWidth: 1,
              }}
              size="md"
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              rightIcon={<ArrowForwardIcon />}
              bgColor={shade[800]}
              textColor={shade[200]}
              borderWidth={1}
              borderColor={shade[100]}
              _hover={{
                bgColor: shade[500],
                textColor: shade[900],
                borderColor: shade[900],
                borderWidth: 1,
              }}
              size="md"
              onClick={handleContinue}
            >
              Continue
            </Button>
            <Button
              bgColor={shade[200]}
              textColor={shade[800]}
              borderWidth={1}
              borderColor={shade[800]}
              _hover={{
                bgColor: shade[500],
                textColor: shade[900],
                borderColor: shade[900],
                borderWidth: 1,
              }}
              size="md"
              onClick={() => {
                setDetails({
                  ...profile,
                  gov_id_num: "",
                  gov_id: "",
                  pan_card: "",
                  pan_card_num: "",
                  gov_id_obj: null,
                  pan_card_obj: null,
                });
              }}
            >
              Clear
            </Button>

            <Button
              bgColor={shade[200]}
              textColor={shade[800]}
              borderWidth={1}
              borderColor={shade[800]}
              _hover={{
                bgColor: shade[500],
                textColor: shade[900],
                borderColor: shade[900],
                borderWidth: 1,
              }}
              size="md"
              onClick={stopEditing}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </div>
    </>
  );
};

export default EditAadharDetails;
