import {
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
} from "@chakra-ui/react";

// import { Document } from "react-pdf";
import { useState } from "react";
import { useSelector } from "react-redux";
const Profile = () => {
  const authToken = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.auth.userinfo);

  //   useEffect(() => {
  //     if (!authToken) {
  //       window.location.href = "/login";
  //     }
  //   }, []);
  const [aadharCard, setAadharCard] = useState(undefined);
  const [PANCard, setPANCard] = useState(undefined);
  const [paySlips, setPaySlips] = useState([]);

  const handleFileChange = (event) => {
    // console.log(event.target.files[0]);
    const id = event.target.name;
    if (id == "1") setAadharCard(event.target.files[0]);
    else if (id == "2") setPANCard(event.target.files[0]);
    else {
      setPaySlips(event.target.files);
      console.log(paySlips);
    }
  };
  const submitForm = () => {
    console.log(paySlips);
  };

  return (
    <Grid
      h={"90vh"}
      w={"100vw"}
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(3, 1fr)"
      padding={8}
      gap={4}
    >
      <GridItem>
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
          alt="Helen Cross"
          className="rounded-full aspect-square w-3/5 mx-auto object-cover hover:brightness-50"
        ></img>
      </GridItem>
      <GridItem rowStart={2} className="text-center p-4 mt-4">
        <Editable defaultValue="Helen Cross" fontSize={"4xl"} fontWeight={900}>
          <EditablePreview />
          <EditableInput />
        </Editable>
        <Editable
          defaultValue="helen.cross@people.us"
          fontSize={"2xl"}
          className="text-shade-4"
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        <Editable defaultValue="24 F" fontSize={"xl"} className="text-shade-">
          <EditablePreview />
          <EditableInput />
        </Editable>
      </GridItem>
      <GridItem rowSpan={2} colStart={2} colSpan={2}>
        <div>
          <Heading as={"h2"} size={"xl"} className="text-gray-700 text-center">
            Documents
          </Heading>
          <form className="mt-auto flex flex-col gap-8 px-24">
            <FormControl>
              <FormLabel htmlFor="bankAccount" fontSize={"xl"}>
                Bank Account No.
              </FormLabel>
              <Editable
                value="Not Provided"
                fontSize={"xl"}
                className="text-shade-"
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
            </FormControl>

            <FormControl>
              <FormLabel fontSize={"xl"} htmlFor="aadharNumber">
                Aadhar No.
              </FormLabel>
              <Editable
                value="Not Provided"
                fontSize={"xl"}
                className="text-shade-"
              >
                <EditablePreview />
                <EditableInput />
              </Editable>{" "}
            </FormControl>

            <FormControl>
              {/* <Document file={file} /> */}
              <FormLabel fontSize={"xl"} htmlFor="aadharCard">
                Aadhar Card
              </FormLabel>
              <Input
                id="aadharCard"
                type="file"
                name="1"
                onChange={handleFileChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize={"xl"} htmlFor="panCard">
                PAN Card
              </FormLabel>
              <Input
                id="panCard"
                type="file"
                name="2"
                onChange={handleFileChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize={"xl"} htmlFor="paySlips">
                Pay Slips
              </FormLabel>
              <Input
                id="paySlips"
                type="file"
                name="3"
                multiple={true}
                onChange={handleFileChange}
              />
            </FormControl>

            <ButtonGroup spacing="6" className="mx-auto">
              <Button
                // isLoading
                loadingText="Submitting"
                colorScheme="cyan"
                variant="solid"
                onClick={submitForm}
                className="w-fit mr-auto"
              >
                Submit
              </Button>
              <Button
                // isLoading
                loadingText="Submitting"
                colorScheme="cyan"
                variant="outline"
                className="w-fit mr-auto"
              >
                Clear
              </Button>
            </ButtonGroup>
            <Button
              // isLoading
              loadingText="Deleting"
              colorScheme="red"
              // variant="filled"
              className="w-fit mx-auto"
            >
              Delete Profile
            </Button>
          </form>
        </div>
      </GridItem>
    </Grid>
  );
};

export default Profile;
