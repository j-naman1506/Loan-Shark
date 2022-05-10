import React, { useEffect } from "react";
import { Button, Icon, Text } from "@chakra-ui/react";
import { BsPeopleFill } from "react-icons/bs";
import { shade } from "./../../static/templates/colors";
import { useState } from "react";
import axios from "../utils/axios";
import { requests } from "../utils/requests";

function ApplicationCard({ application }) {
  const { amount, tenure, interestRate, createdAt, count } = application;
  const [offers, setOffers] = useState();
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    // async function getOffers() {
    //   const request = await axios.get(
    //     requests["createApplication"] + application.id + "/offers/"
    //   );
    //   return request;
    // }
    // getOffers
    //   .then((res) => {
    //     const data = res.data.data;
    //     setOffers(data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     alert("Something Went Wrong");
    //   });
  }, []);
  function handleDelete() {
    // async function deleteApplication() {}
  }
  const offer = [
    {
      id: 1,
      principle: 50000,
      tenure: 24,
      interest: 0.12,
      status: "Accepted",
      user: "Naman",
    },
    {
      id: 3,
      principle: 75000,
      tenure: 36,
      interest: 0.08,
      status: "Accepted",
    },
    {
      id: 4,
      principle: 60000,
      tenure: 30,
      interest: 0.08,
      status: "Accepted",
    },
  ];
  return (
    <>
      <div className="w-2/3 bg-shade-100 border-2 border-shade-800 px-12  mx-auto py-8 flex flex-col gap-4 rounded-lg hover:bg-shade-700 hover:shadow-md hover:text-shade-100">
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <Text className="text-4xl font-ubuntu flex flex-col">
              ₹ {amount}
            </Text>
            <Text className="text-1xl font-ubuntu flex flex-col">
              Created at : {createdAt}
            </Text>
          </div>
          <div className="flex flex-col" onClick={() => setExpanded(!expanded)}>
            <span className="flex gap-4 items-center">
              <Icon as={BsPeopleFill} w={6} h={6} />
              <Text className="text-2xl font-ubuntu ">Offers</Text>
            </span>
            <Text className="text-2xl font-ubuntu text-center">{count}</Text>
          </div>
        </div>

        <div className="flex justify-between pt-5 items-center">
          <div className="text-2xl font-roboto justify-between mb-4 flex flex-col gap-2 ">
            <Text>
              <b>Tenure:</b> {tenure} months
            </Text>
            <Text>
              <b>Rate:</b> {interestRate * 100}% per month
            </Text>
          </div>
          <Button
            bgColor={"red.400"}
            textColor={"white"}
            borderWidth={1}
            _hover={{
              bgColor: shade[200],
              textColor: "black",
              borderWidth: 1,
            }}
            size="md"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>

        <div
          className={`${
            expanded ? "h-full flex flex-col" : "h-0 "
          } transition-all ease-in-out overflow-y-hidden`}
        >
          {offer.slice(1).map((offer) => (
            <div className="border-t border-t-shade-900 p-4 flex gap-4">
              <Text className="text-xl font-ubuntu">₹ {offer.principle}</Text>
              <Text className="text-lg font-roboto">
                <b>Tenure:</b> {offer.tenure} months
              </Text>
              <Text className="text-lg font-roboto">
                <b>Rate:</b> {offer.interest * 100}% per month
              </Text>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ApplicationCard;
