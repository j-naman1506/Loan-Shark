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
import axios from "../utils/axios";
import { requests } from "../utils/requests";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { shade } from "./../../static/templates/colors";
import Loader from "../Loader";
const AddApplication = () => {
  const [isLoading, setLoading] = useState(false);
  const [application, setApplication] = useState({
    amount: 0,
    tenure: 0,
    rate: 0,
  });

  function handleChange(e) {
    setApplication((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  function HandleSubmit() {
    // if(!application.amount || !application.rate ||)
    setLoading(true);
    const data = {
      amount: Number(application.amount),
      tenure: Number(application.tenure),
      rate: Number(application.rate),
    };
    async function createApplication() {
      const request = await axios({
        method: "POST",
        url: requests["createApplication"],
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return request;
    }

    createApplication()
      .then((res) => {
        const data = res.data.data;
        setApplication({
          amount: 0,
          tenure: 0,
          rate: 0,
        });
        alert("Done");
      })
      .catch((e) => {
        alert("Something went wrong");
      });
    setLoading(false);
  }
  return (
    <div className="bg-shade-200 h-full w-full rounded-r-xl rounded-bl-xl p-6 flex flex-col gap-4 shadow-lg text-shade-800">
      <Heading as="h2" size="xl" textAlign="center">
        New Application
      </Heading>
      <form className="flex flex-col w-1/2 h-full justify-evenly gap-8 pl-8 mx-auto">
        <div className="flex gap-4 w-full">
          <FormControl>
            <FormLabel htmlFor="amount">Amount</FormLabel>
            <Input
              id="amount"
              type="number"
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

        <div className="flex gap-4 w-full">
          <FormControl>
            <FormLabel htmlFor="tenure">Tenure</FormLabel>
            <Input
              id="tenure"
              type="number"
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

        <div className="flex gap-4 w-full">
          <FormControl>
            <FormLabel htmlFor="interestRate">Interest Rate</FormLabel>
            <Input
              id="rate"
              type="number"
              name="rate"
              placeholder="In percentage"
              borderColor={shade[800]}
              _hover={{ borderColor: shade[900] }}
              _active={{ borderColor: shade[900] }}
              borderWidth={1}
              value={application.rate}
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
      <Loader isLoading={isLoading}></Loader>
    </div>
  );
};

export default AddApplication;
