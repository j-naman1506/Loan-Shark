import { Icon, Text } from "@chakra-ui/react";
import { MdAppSettingsAlt, MdClose, MdExpandMore } from "react-icons/md";

import MyOffers from "./MyOffers";
import { useState } from "react";

const Offer = ({ offer }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="w-2/3 bg-shade-100 border-2 border-shade-800 px-12 py-8 flex flex-col gap-4 rounded-lg hover:bg-shade-700 hover:shadow-md hover:text-shade-100">
        <Text className="text-4xl font-ubuntu flex flex-col">
          ₹ {offer[0].principle}
        </Text>
        <Text className="text-3xl flex">
          <b>Status:</b> {offer[0].status}
        </Text>
        <Text className="text-3xl flex">
          <b>User:</b> {offer[0].user}
        </Text>
        <div className="text-2xl font-roboto flex justify-between mb-4">
          <Text>
            <b>Tenure:</b> {offer[0].tenure} months
          </Text>
          <Text>
            <b>Rate:</b> {offer[0].interest * 100}% per month
          </Text>

          {/* <Icon
            as={expanded ? MdClose : MdExpandMore}
            w={8}
            h={8}
            onClick={() => setExpanded(!expanded)}
          /> */}
        </div>
        {/* <div
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
				</div> */}
      </div>
    </>
  );
};

export default Offer;
