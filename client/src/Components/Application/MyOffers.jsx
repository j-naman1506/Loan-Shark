import { useEffect, useState } from "react";

import { Heading } from "@chakra-ui/react";
import Offer from "./Offer";
import { shade } from "./../../static/templates/colors";
import axios from "../utils/axios";
import { requests } from "../utils/requests";
const MyOffers = () => {
  const [offers, setOffers] = useState([
    [
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
    ],
    [
      {
        id: 1,
        principle: 50000,
        tenure: 24,
        interest: 0.12,
        status: "Rejected",
        user: "Aman",
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
    ],
  ]);

  useEffect(() => {
    // async function getOffers() {
    //   const request = await axios.get(requests["getOffers"]);
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

  return (
    <div className="min-h-1/2 w-2/3 my-3 mx-auto p-8 bg-shade-200 rounded-lg shadow-lg">
      <Heading as="h2" size="xl" textAlign="center" color={shade[800]}>
        My Offers
      </Heading>
      <form className="flex flex-col h-full justify-evenly items-center gap-8 p-8">
        {offers.map((offer) => (
          <Offer offer={offer} />
        ))}
      </form>
    </div>
  );
};

export default MyOffers;
