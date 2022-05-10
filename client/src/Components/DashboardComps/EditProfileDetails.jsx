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
import { useEffect, useState } from "react";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { shade } from "./../../static/templates/colors";

const EditProfileDetails = ({ setStage, profile, setProfile, stopEditing }) => {
  const [peronsalDetails, setDetails] = useState({});
  const [profilePicture, setProfilePicture] = useState(
    profile.profile_pic
      ? profile.profile_pic
      : "https://yt3.ggpht.com/a/AATXAJwSVMuE-eAnwzJvoEolJQpmR8olgQdlXks9qA=s900-c-k-c0xffffffff-no-rj-mo"
  );
  useEffect(() => {
    console.log(peronsalDetails);
    setDetails(profile);
  }, []);
  console.log(profile.gender);

  function handleChange(e) {
    if (e.target) {
      setDetails((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    } else {
      setDetails((prevState) => ({
        ...prevState,
        age: e,
      }));
    }
  }
  function handleContinue() {
    console.log(peronsalDetails);
    setProfile((prevState) => ({
      ...profile,
      ...peronsalDetails,
    }));
    setStage(1);
    console.log(profile);
  }

  const handleProfilePictureChange = (e) => {
    setDetails((prevState) => ({
      ...peronsalDetails,
      [e.target.name]: e.target.files[0],
      [e.target.id]: URL.createObjectURL(e.target.files[0]),
    }));
    console.log(URL.createObjectURL(e.target.files[0]));
    setProfilePicture(URL.createObjectURL(e.target.files[0]));
  };

  return (
    peronsalDetails && (
      <>
        <div className="bg-shade-400 h-full w-1/3 hover:brightness-75">
          <img
            src={
              profilePicture[0] == "/"
                ? window.env.REACT_APP_SERVER_URL + profilePicture
                : profilePicture
            }
            alt="Helen Cross"
            className="object-cover h-full w-full"
          />
          <input
            type="file"
            name="profile_pic_obj"
            id="profile_pic"
            className="h-full w-full opacity-0 absolute top-0 left-0 bottom-0 right-0"
            onChange={handleProfilePictureChange}
          />
        </div>
        <div className="bg-shade-200 h-full w-2/3 rounded-r-xl p-6 flex flex-col gap-4">
          <Heading as="h2" size="xl" textAlign="center">
            Personal Info
          </Heading>
          <form className="flex flex-col h-full justify-evenly gap-8 ">
            <div className="flex gap-4">
              <FormControl>
                <FormLabel htmlFor="first_name">First Name</FormLabel>
                <Input
                  id="first_name"
                  type="text"
                  name="first_name"
                  borderColor={shade[800]}
                  _hover={{ borderColor: shade[900] }}
                  _active={{ borderColor: shade[900] }}
                  borderWidth={1}
                  value={peronsalDetails.first_name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="last_name">Last Name</FormLabel>
                <Input
                  id="last_name"
                  type="text"
                  name="last_name"
                  borderColor={shade[800]}
                  _hover={{ borderColor: shade[900] }}
                  _active={{ borderColor: shade[900] }}
                  borderWidth={1}
                  value={peronsalDetails.last_name}
                  onChange={handleChange}
                />
              </FormControl>
            </div>
            {/* 
            <FormControl>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                id="email"
                type="email"
                name="email"
                borderColor={shade[800]}
                _hover={{ borderColor: shade[900] }}
                _active={{ borderColor: shade[900] }}
                borderWidth={1}
                value={peronsalDetails.email}
                onChange={handleChange}
              />
              <FormHelperText color={shade[700]}>
                We'll never share your email.
              </FormHelperText>
            </FormControl> */}

            <div className="flex gap-4">
              <FormControl>
                <FormLabel htmlFor="age">Age</FormLabel>
                <NumberInput
                  id="age"
                  min={0}
                  max={100}
                  name="age"
                  borderColor={shade[800]}
                  _hover={{ borderColor: shade[900] }}
                  _active={{ borderColor: shade[900] }}
                  value={peronsalDetails.age ? peronsalDetails.age : ""}
                  // defaultValue={profile.age}
                  onChange={handleChange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <Select
                  placeholder="Select your gender"
                  borderColor={shade[800]}
                  _hover={{ borderColor: shade[900] }}
                  _active={{ borderColor: shade[900] }}
                  borderWidth={1}
                  name="gender"
                  value={peronsalDetails.gender ? peronsalDetails.gender : ""}
                  onChange={handleChange}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Others</option>
                </Select>
              </FormControl>
            </div>

            <ButtonGroup spacing="6">
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
                    first_name: "",
                    last_name: "",
                    email: "",
                    age: "",
                    gender: "",
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

export default EditProfileDetails;
