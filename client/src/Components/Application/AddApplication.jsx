import React from "react";
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
import { useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { shade } from "./../../static/templates/colors";
const AddApplication = () => {
  const [application, setApplication] = useState({
    amount: "",
    tenure: "",
    interestRate: "",
  });

  function handleChange(e) {
    setApplication((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  function HandleSubmit() {
    console.log(application);
  }
  return (
    <div className="bg-shade-200 h-full w-full rounded-r-xl rounded-bl-xl p-6 flex flex-col gap-4 shadow-lg text-shade-800">
      <Heading as="h2" size="xl" textAlign="center">
        New Application
      </Heading>
      <form className="flex flex-col h-full justify-evenly gap-8 pl-8">
        <div className="flex gap-4 w-2/5">
          <FormControl>
            <FormLabel htmlFor="amount">Amount</FormLabel>
            <Input
              id="amount"
              type="text"
              name="amount"
              borderColor={shade[800]}
              _hover={{ borderColor: shade[900] }}
              _active={{ borderColor: shade[900] }}
              borderWidth={1}
              value={application.amount}
              onChange={handleChange}
            />
          </FormControl>
        </div>

        <div className="flex gap-4 w-2/5">
          <FormControl>
            <FormLabel htmlFor="tenure">Tenure</FormLabel>
            <Input
              id="tenure"
              type="text"
              name="tenure"
              placeholder="In months"
              borderColor={shade[800]}
              _hover={{ borderColor: shade[900] }}
              _active={{ borderColor: shade[900] }}
              borderWidth={1}
              value={application.tenure}
              onChange={handleChange}
            />
          </FormControl>
        </div>

        <div className="flex gap-4 w-2/5">
          <FormControl>
            <FormLabel htmlFor="interestRate">Interest Rate</FormLabel>
            <Input
              id="interestRate"
              type="text"
              name="interestRate"
              placeholder="In percentage"
              borderColor={shade[800]}
              _hover={{ borderColor: shade[900] }}
              _active={{ borderColor: shade[900] }}
              borderWidth={1}
              value={application.interestRate}
              onChange={handleChange}
            />
          </FormControl>
        </div>
        <ButtonGroup spacing="6">
          <Button
            bgColor={shade[800]}
            textColor={shade[200]}
            borderWidth={1}
            borderColor={shade[100]}
            _hover={{
              bgColor: shade[200],
              textColor: shade[900],
              borderColor: shade[900],
              borderWidth: 1,
            }}
            size="md"
            onClick={HandleSubmit}
          >
            Submit
          </Button>
          <Button
            bgColor={shade[200]}
            textColor={shade[800]}
            borderWidth={1}
            borderColor={shade[800]}
            _hover={{
              bgColor: shade[800],
              textColor: shade[100],
              borderColor: shade[900],
              borderWidth: 1,
            }}
            size="md"
            onClick={() =>
              setApplication({
                amount: "",
                tenure: "",
                interestRate: "",
              })
            }
          >
            Clear
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default AddApplication;
