import { shade } from "./../../static/templates/colors";
import { Button, Text } from "@chakra-ui/react";
import axios from "../utils/axios";
import { requests } from "../utils/requests";
import Loader from "../Loader";
import { useState } from "react";
const Offer = ({ offer, setChanged }) => {
  const [isLoading, setLoading] = useState(false);
  function makePayment() {
    setLoading(true);
    async function makepayment() {
      const request = await axios.post(
        requests["getOffers"] + offer.id + "/pay/"
      );
    }
    makepayment()
      .then((res) => {
        setChanged((prev) => !prev);
        alert("Paid");
      })
      .catch((e) => {
        alert("Something Went Wrong");
      });
    setLoading(false);
  }
  return (
    <>
      <div className="w-2/3 bg-shade-100 border-2 border-shade-800 px-12 py-8 flex flex-col gap-4 rounded-lg hover:bg-shade-700 hover:shadow-md hover:text-shade-100">
        <div className="flex justify-between items-center">
          <Text className="text-4xl font-ubuntu">₹ {offer.amount}</Text>
          <Text className="text-2xl flex gap-2 justify-center items-center">
            <b>Status:</b>{" "}
            {offer.status
              ? offer.status == "A"
                ? "Accepted"
                : "Rejected"
              : "Pending"}
          </Text>
        </div>
        <Text className="text-2xl flex gap-2">
          <b>Borrower: </b>{" "}
          {offer.application ? offer.application.user.full_name : ""}
        </Text>
        <div className="text-xl font-roboto flex justify-between mb-4">
          <Text>
            <b>Tenure:</b> {offer.tenure} months
          </Text>
          <Text>
            <b>Rate:</b> {offer.rate}%
          </Text>
        </div>
        {offer.status == "A" && !offer.is_paid && (
          <div className="text-xl font-roboto flex justify-center mb-4">
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
              onClick={makePayment}
            >
              Make Payment
            </Button>
          </div>
        )}
        <Loader isLoading={isLoading}></Loader>
      </div>
    </>
  );
};

export default Offer;
