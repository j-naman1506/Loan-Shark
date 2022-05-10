import { useEffect, useState } from "react";

import { Heading } from "@chakra-ui/react";
import Offer from "./Offer";
import axios from "../utils/axios";
import { requests } from "../utils/requests";
import { shade } from "./../../static/templates/colors";
import Loader from "../Loader";
const MyOffers = () => {
  const [isLoading, setLoading] = useState(false);
  const [offers, setOffers] = useState();
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function getOffers() {
      const request = await axios.get(requests["getOffers"]);
      return request;
    }
    getOffers()
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        setOffers(data);
      })
      .catch((e) => {
        console.log(e);
        alert("Something Went Wrong");
      });
    setLoading(false);
  }, [changed]);

  return offers ? (
    <div className="min-h-1/2 w-2/3 my-3 mx-auto p-8 bg-shade-200 rounded-lg shadow-lg">
      <Heading as="h2" size="xl" textAlign="center" color={shade[800]}>
        My Offers
      </Heading>
      <div className="flex flex-col h-full justify-evenly items-center gap-8 p-8">
        {offers.map((offer) => (
          <Offer offer={offer} setChanged={setChanged} />
        ))}
      </div>
      <Loader isLoading={isLoading}></Loader>
    </div>
  ) : (
    <></>
  );
};

export default MyOffers;
