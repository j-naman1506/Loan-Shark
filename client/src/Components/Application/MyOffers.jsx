import { useEffect, useState } from "react";

import { Heading } from "@chakra-ui/react";
import Offer from "./Offer";
import { shade } from "./../../static/templates/colors";

const MyOffers = () => {
	const [offers, setOffers] = useState([
		[
			{
				id: 1,
				principle: 50000,
				tenure: 24,
				interest: 0.12,
			},
			{
				id: 3,
				principle: 75000,
				tenure: 36,
				interest: 0.08,
			},
			{
				id: 4,
				principle: 60000,
				tenure: 30,
				interest: 0.08,
			},
		],
		[
			{
				id: 1,
				principle: 50000,
				tenure: 24,
				interest: 0.12,
			},
			{
				id: 3,
				principle: 75000,
				tenure: 36,
				interest: 0.08,
			},
			{
				id: 4,
				principle: 60000,
				tenure: 30,
				interest: 0.08,
			},
		],
	]);

	useEffect(() => {
		// fetch offers here
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
