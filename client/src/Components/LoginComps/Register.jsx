import {
  Button,
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
} from "@chakra-ui/react";
import { useState } from "react";
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    password: "",
  });

  function handleChange(e) {
    var tem = userData;
    if (!e.target) {
      tem.age = e;
    } else tem[e.target.name] = e.target.value;

    setUserData(tem);
  }

  function HandleSubmit() {
    console.log(userData);
    e.preventDefault();
    async function doRegister() {
      const request = await axios.post(requests["doRegister"], userData);
      return request;
    }
    doRegister()
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        const { token: token, profile: userinfo } = res.data;
        const init = {
          username: "",
          first_name: "",
          last_name: "",
          email: "",
          age: "",
          password: "",
        };
        setUserData(init);
        window.location.href = "/";

        dispatch(signInSuccess({ token, userinfo }));
      })
      .catch((e) => {
        console.log(e.data);
      });
  }

  return (
    <div className="w-1/3 h-full mt-24 mx-auto p-8 rounded-md flex gap-8 flex-col shadow-lg ">
      <Heading
        as="h2"
        size="xl"
        className="text-center font-bold text-cyan-700"
      >
        Welcome to the gang!
      </Heading>

      <form className="mt-auto flex flex-col gap-8 ">
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="first_name">First Name</FormLabel>
          <Input
            id="first_name"
            type="text"
            name="first_name"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="last_name">Last Name</FormLabel>
          <Input
            id="last_name"
            type="text"
            name="last_name"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input id="email" type="email" name="email" onChange={handleChange} />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="age">Age</FormLabel>
          <NumberInput
            id="age"
            min={0}
            max={100}
            name="age"
            onChange={handleChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
					<DesktopDatePicker
						label="Date desktop"
						inputFormat="MM/dd/yyyy"
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider> */}

        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <FormHelperText>Choose a strong one.</FormHelperText>
        </FormControl>

        <Button colorScheme="cyan" size="md" onClick={HandleSubmit}>
          Register
        </Button>
        {/* <hr className="font-bold w-full border-t-1 border-gray-300" />

        <Button colorScheme="cyan" variant="outline">
          Register with Google
        </Button> */}
      </form>
    </div>
  );
};

export default Register;
