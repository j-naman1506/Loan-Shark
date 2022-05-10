import { shade } from "./../../static/templates/colors";
import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import axios from "../utils/axios";
import { requests } from "../utils/requests";
import Loader from "../Loader";
const Emi = ({ emi, setChanged }) => {
  const [isLoading, setLoading] = useState(false);
  function makePayment() {
    setLoading(true);
    async function makepayment() {
      const request = await axios.post(requests["payEmi"] + emi.id + "/pay/");
    }
    makepayment()
      .then((res) => {
        setChanged((prev) => !prev);
        alert("Paid");
      })
      .catch((e) => {
        console.log(e);
        alert("Something Went Wrong");
      });
    setLoading(false);
  }
  return (
    <div className="w-2/3 bg-shade-100 border-2 border-shade-800 text-green-900 px-8 py-4 flex justify-between gap-4 rounded-lg hover:bg-shade-700 hover:shadow-md hover:text-shade-100 hover:shadow-md">
      <div className="flex flex-col gap-4">
        <Text className="text-xl font-ubuntu">₹ {emi.due_amount}</Text>
        <Text className="text-lg font-roboto">
          <b>Due: </b> {emi.due_date}
        </Text>
      </div>
      <div className="flex flex-col gap-4">
        <Text className="text-lg font-roboto">
          <b>To: </b> Naman
        </Text>
        {emi.is_paid && emi.is_outstanding && (
          <Text className="text-lg text-red-600 font-bold font-roboto">
            Paid Late!
          </Text>
        )}
        {!emi.is_paid && (
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
            Pay Now
          </Button>
        )}
      </div>
      <Loader isLoading={isLoading}></Loader>
    </div>
  );
};

export default Emi;
