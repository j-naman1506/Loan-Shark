import { Text } from "@chakra-ui/react";

const Offer = ({ offer }) => {
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
      </div>
    </>
  );
};

export default Offer;
