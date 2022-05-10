import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";

import { BsPeopleFill } from "react-icons/bs";
import { Dialog } from "@headlessui/react";
import React from "react";
import { shade } from "./../../static/templates/colors";
import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { requests } from "../utils/requests";
import Loader from "../Loader";

function ApplicationCard({ application, setApplication, showApplicant }) {
  const [isLoading, setLoading] = useState(false);
  const { amount, tenure, rate, created_on, offers_count, applicant } =
    application;
  const [offers, setOffers] = useState();
  const [expanded, setExpanded] = useState(false);
  const [offerChanged, setChanged] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newOffer, setOffer] = useState({
    application_id: application.id,
    tenure: tenure,
    rate: rate,
  });

  useEffect(() => {
    setLoading(true);

    async function getOffers() {
      const request = await axios.get(
        requests["createApplication"] + application.id + "/offers/"
      );
      return request;
    }
    getOffers()
      .then((res) => {
        const data = res.data.data;

        setOffers(data);
      })
      .catch((e) => {
        alert("Something Went rong");
      });
    setLoading(false);
  }, [offerChanged]);
  function handleDelete() {
    setLoading(true);
    async function deleteApplication() {
      const request = await axios.delete(
        requests["createApplication"] + application.id + "/"
      );
      return request;
    }
    deleteApplication()
      .then((res) => {
        const data = res.data.data;
        setApplication((prevState) => !prevState);
      })
      .catch((e) => {
        alert("Something Went Wrong");
      });
    setLoading(false);
  }
  function acceptOffer(id) {
    setLoading(true);
    async function acceptoffer() {
      const request = await axios.post(
        requests["acceptOffer"] + id + "/accept/"
      );
      return request;
    }
    acceptoffer()
      .then((res) => {
        setApplication((prevState) => !prevState);
        setChanged(!offerChanged);
      })
      .catch((e) => {
        alert("Something Went Wrong");
      });
    setLoading(false);
  }
  function acceptApplication() {
    setLoading(true);

    async function acceptapplication() {
      const request = await axios.post(
        requests["createApplication"] + application.id + "/accept/"
      );
      return request;
    }
    acceptapplication()
      .then((res) => {
        setApplication((prevState) => !prevState);
      })
      .catch((e) => {
        alert("Something Went Wrong");
      });
    setLoading(false);
  }
  function rejectApplication() {
    setLoading(true);
    async function deleteapplication() {
      const request = await axios.post(
        requests["createApplication"] + application.id + "/reject/"
      );
      return request;
    }
    deleteapplication()
      .then((res) => {
        setApplication((prevState) => !prevState);
      })
      .catch((e) => {
        alert("Something Went Wrong");
      });
    setLoading(false);
  }
  function rejectOffer(id) {
    setLoading(true);
    async function rejectoffer() {
      const request = await axios.post(
        requests["acceptOffer"] + id + "/reject/"
      );
      return request;
    }
    rejectoffer()
      .then((res) => {
        setApplication((prevState) => !prevState);
        setChanged(!offerChanged);
      })
      .catch((e) => {
        alert("Something Went Wrong");
      });
    setLoading(false);
  }
  function handleChange(e) {
    setOffer((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  function modifyOffer() {
    setLoading(true);
    async function makeoffer() {
      const request = await axios.post(requests["makeOffer"], newOffer);
      return request;
    }
    makeoffer()
      .then((res) => {
        setOffer((prevState) => ({
          ...prevState,
          tenure: tenure,
          rate: rate,
        }));
        setApplication((prevState) => !prevState);
        setChanged(!offerChanged);
        setIsOpen(!isOpen);
      })
      .catch((e) => {
        alert("Something Went Wrong");
      });
    setLoading(false);
  }

  return (
    <>
      <div className="w-2/3 bg-shade-100 border-2 border-shade-800 px-12  mx-auto py-8 flex flex-col gap-4 rounded-lg hover:bg-shade-700 hover:shadow-md hover:text-shade-100">
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <Text className="text-4xl font-ubuntu flex flex-col">
              ₹ {amount}
            </Text>
            {showApplicant && (
              <div>
                <Text className="text-2xl font-ubuntu flex flex-col">
                  Applicant : {application ? application.user.full_name : ""}
                </Text>
                <Text className="text-2xl font-ubuntu flex flex-col">
                  CIBIL SCORE : {application ? application.cibil_score : ""}
                </Text>
              </div>
            )}
            <Text className="text-xl font-ubuntu flex flex-col">
              Created at : {created_on.slice(0, 10)}
            </Text>
          </div>
          <div className="flex flex-col" onClick={() => setExpanded(!expanded)}>
            <span className="flex gap-4 items-center">
              <Icon as={BsPeopleFill} w={6} h={6} />
              <Text className="text-2xl font-ubuntu ">Offers</Text>
            </span>
            <Text className="text-2xl font-ubuntu text-center">
              {offers_count}
            </Text>
          </div>
        </div>

        <div className="flex justify-between pt-5 items-center">
          <div className="text-2xl font-roboto justify-between mb-4 flex flex-col gap-2 ">
            <Text>
              <b>Tenure:</b> {tenure} months
            </Text>
            <Text>
              <b>Rate:</b> {rate}%
            </Text>
          </div>
          {!showApplicant && !application.status ? (
            <Button
              bgColor={"red.400"}
              textColor={"white"}
              _hover={{
                bgColor: shade[200],
                textColor: "black",
              }}
              size="md"
              onClick={handleDelete}
            >
              Delete
            </Button>
          ) : application.status == "A" ? (
            <Text marginLeft="auto">
              <b>Status: Accepted</b>
            </Text>
          ) : application.status == "R" ? (
            <Text marginLeft="auto">
              <b>Status: Rejected</b>
            </Text>
          ) : (
            <></>
          )}
        </div>
        {showApplicant && (
          <>
            <div className="flex justify-evenly items-center">
              <Button
                bgColor={shade[600]}
                textColor={shade[100]}
                borderWidth={1}
                borderColor={"transparent"}
                _hover={{
                  bgColor: shade[300],
                  textColor: shade[900],
                  border: "1px solid shade-300",
                }}
                size="md"
                paddingX={8}
                paddingY={6}
                onClick={acceptApplication}
              >
                Accept
              </Button>
              <Button
                bgColor={"red.400"}
                textColor={"white"}
                _hover={{
                  bgColor: shade[200],
                  textColor: "black",
                }}
                size="md"
                paddingX={8}
                paddingY={6}
                onClick={rejectApplication}
              >
                Reject
              </Button>
              <Button
                bgColor={shade[600]}
                textColor={shade[100]}
                borderWidth={1}
                borderColor={"transparent"}
                _hover={{
                  bgColor: shade[300],
                  textColor: shade[900],
                  border: "1px solid shade-300",
                }}
                size="md"
                paddingX={8}
                paddingY={6}
                onClick={() => setIsOpen(!isOpen)}
              >
                {!isOpen ? "Modify" : "Back"}
              </Button>
            </div>
            {isOpen && (
              <form className="flex flex-col w-1/2 h-full justify-evenly gap-8 pl-8 mx-auto">
                {/* <div className="flex gap-4 w-full">
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

                      // value={application.amount}
                      // onChange={handleChange}
                    />
                  </FormControl>
                </div> */}

                <div className="flex gap-4 w-full">
                  <FormControl>
                    <FormLabel htmlFor="tenure">Tenure</FormLabel>
                    <Input
                      id="tenure"
                      type="number"
                      name="tenure"
                      placeholder="In months"
                      borderColor={shade[800]}
                      _placeholder={{
                        color: shade[400],
                        fontWeight: "bold",
                      }}
                      _hover={{
                        borderColor: shade[900],
                      }}
                      _active={{ borderColor: shade[900] }}
                      borderWidth={1}
                      value={newOffer.tenure}
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
                      _placeholder={{
                        color: shade[400],
                        fontWeight: "bold",
                      }}
                      _hover={{
                        borderColor: shade[900],
                      }}
                      _active={{ borderColor: shade[900] }}
                      borderWidth={1}
                      value={newOffer.rate}
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
                    onClick={modifyOffer}
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
                      setOffer({
                        tenure: 0,
                        rate: 0,
                      })
                    }
                  >
                    Clear
                  </Button>
                </ButtonGroup>
              </form>
            )}
          </>
        )}

        <div
          className={`${
            expanded ? "h-full flex flex-col" : "h-0 "
          } transition-all ease-in-out overflow-y-hidden`}
        >
          {offers &&
            offers.map((offer) => (
              <div className="border-t border-t-shade-900 p-4 flex gap-4 items-center">
                <Text className="text-xl font-ubuntu">₹ {offer.amount}</Text>
                <Text className="text-lg font-roboto">
                  <b>Tenure:</b> {offer.tenure} months
                </Text>
                <Text className="text-lg font-roboto">
                  <b>Rate:</b> {offer.rate}%
                </Text>
                {!showApplicant && !offer.status ? (
                  <>
                    <Button
                      bgColor={shade[600]}
                      textColor={shade[100]}
                      borderWidth={1}
                      borderColor={"transparent"}
                      marginLeft="auto"
                      _hover={{
                        bgColor: shade[300],
                        textColor: shade[900],
                        border: "1px solid shade-300",
                      }}
                      size="md"
                      paddingX={4}
                      paddingY={2}
                      onClick={() => acceptOffer(offer.id)}
                    >
                      Accept
                    </Button>
                    <Button
                      bgColor={"red.400"}
                      textColor={"white"}
                      _hover={{
                        bgColor: shade[200],
                        textColor: "black",
                      }}
                      size="md"
                      paddingX={4}
                      paddingY={2}
                      onClick={() => rejectOffer(offer.id)}
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  <>
                    {offer.status == "A" ? (
                      <Text marginLeft="auto">
                        <b>Accepted</b>
                      </Text>
                    ) : offer.status == "R" ? (
                      <Text marginLeft="auto">
                        <b>Rejected</b>
                      </Text>
                    ) : (
                      <Text marginLeft="auto">
                        <b>By: {offer.lender.full_name}</b>
                      </Text>
                    )}
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
      <Loader isLoading={isLoading}></Loader>
    </>
  );
}

export default ApplicationCard;
