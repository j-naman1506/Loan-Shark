import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { shade } from "./../../static/templates/colors";

const EditBankDetails = ({
  stage,
  setStage,
  stopEditing,
  profile,
  setProfile,
}) => {
  const [peronsalDetails, setDetails] = useState();
  useEffect(() => {
    console.log(profile);
    setDetails(profile);
  }, []);

  function handleChange(e) {
    // if (
    //   e.target.name === "ctc" &&
    //   e.target.value[e.target.value.length - 1] === "e"
    // ) {
    //   setDetails((prevState) => ({
    //     ...prevState,
    //     [e.target.name]: e.target.value.slice(0, -1),
    //   }));
    // } else {
    // console.log("hi", e.target.value);
    setDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // }
  }

  function handleContinue() {
    console.log(peronsalDetails);
    setProfile((prevState) => ({
      ...profile,
      ...peronsalDetails,
    }));
    setStage(stage + 1);
    console.log(profile);
  }
  function handleBack() {
    console.log(peronsalDetails);
    setProfile((prevState) => ({
      ...profile,
      ...peronsalDetails,
    }));
    setStage(stage - 1);
    console.log(profile);
  }
  return (
    peronsalDetails && (
      <>
        <div className="bg-shade-200 h-full w-full rounded-r-xl py-6 px-12 flex flex-col gap-4">
          <Heading as="h2" size="xl" textAlign="center">
            Bank Details
          </Heading>
          <form className="flex flex-col h-full justify-evenly gap-8 ">
            <FormControl>
              <FormLabel htmlFor="account_number">Account Number</FormLabel>
              <Input
                id="account_number"
                type="text"
                name="account_number"
                borderColor={shade[800]}
                _hover={{ borderColor: shade[900] }}
                _active={{ borderColor: shade[900] }}
                value={
                  peronsalDetails.account_number
                    ? peronsalDetails.account_number
                    : ""
                }
                onChange={handleChange}
                borderWidth={1}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="holder_name">Account Holder's Name</FormLabel>
              <Input
                id="holder_name"
                type="text"
                name="holder_name"
                borderColor={shade[800]}
                _hover={{ borderColor: shade[900] }}
                _active={{ borderColor: shade[900] }}
                borderWidth={1}
                value={
                  peronsalDetails.holder_name ? peronsalDetails.holder_name : ""
                }
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="ifsc_code">IFSC Code</FormLabel>
              <Input
                id="ifsc_code"
                type="text"
                name="ifsc_code"
                borderColor={shade[800]}
                _hover={{ borderColor: shade[900] }}
                _active={{ borderColor: shade[900] }}
                borderWidth={1}
                value={
                  peronsalDetails.ifsc_code ? peronsalDetails.ifsc_code : ""
                }
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="branch_name">Branch Name</FormLabel>
              <Input
                id="branch_name"
                type="text"
                name="branch_name"
                borderColor={shade[800]}
                _hover={{ borderColor: shade[900] }}
                _active={{ borderColor: shade[900] }}
                borderWidth={1}
                value={
                  peronsalDetails.branch_name ? peronsalDetails.branch_name : ""
                }
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="ctc">CTC</FormLabel>
              <Input
                id="ctc"
                type="number"
                name="ctc"
                borderColor={shade[800]}
                _hover={{ borderColor: shade[900] }}
                _active={{ borderColor: shade[900] }}
                borderWidth={1}
                value={peronsalDetails.ctc ? peronsalDetails.ctc : ""}
                onChange={handleChange}
              />
            </FormControl>

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
                    account_number: "",
                    branch_name: "",
                    ifsc_code: "",
                    holder_name: "",
                    ctc: "",
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
    )
  );
};

export default EditBankDetails;
