import React from "react";
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

function RegisterComp({ onSubmit }) {
  const [userData, setUserData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    password: "",
  });

  function handleChange(e) {
    if (!e.target) {
      setUserData((prevState) => ({
        ...prevState,
        age: e,
      }));
    } else {
      setUserData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
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
            value={userData.username}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="first_name">First Name</FormLabel>
          <Input
            id="first_name"
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="last_name">Last Name</FormLabel>
          <Input
            id="last_name"
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input
            id="email"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="age">Age</FormLabel>
          <NumberInput
            id="age"
            min={0}
            max={100}
            name="age"
            value={userData.age}
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
            value={userData.password}
            onChange={handleChange}
          />
          <FormHelperText>Choose a strong one.</FormHelperText>
        </FormControl>

        <Button
          colorScheme="cyan"
          size="md"
          onClick={(e) => {
            onSubmit(userData);
          }}
        >
          Register
        </Button>
        {/* <hr className="font-bold w-full border-t-1 border-gray-300" />
    
            <Button colorScheme="cyan" variant="outline">
              Register with Google
            </Button> */}
      </form>
    </div>
  );
}

export default RegisterComp;
