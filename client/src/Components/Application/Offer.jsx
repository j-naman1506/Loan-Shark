import { Text } from "@chakra-ui/react";

const Offer = ({ offer }) => {
	return (
		<>
			<div className="w-2/3 bg-shade-100 border-2 border-shade-800 px-12 py-8 flex flex-col gap-4 rounded-lg hover:bg-shade-700 hover:shadow-md hover:text-shade-100">
				<div className="flex justify-between items-center">
					<Text className="text-4xl font-ubuntu">₹ {offer[0].principle}</Text>
					<Text className="text-2xl flex gap-2 justify-center items-center">
						<b>Status:</b> {offer[0].status}
					</Text>
				</div>
				<Text className="text-2xl flex gap-2">
					<b>Borrower: </b> {offer[0].user}
				</Text>
				<div className="text-xl font-roboto flex justify-between mb-4">
					<Text>
						<b>Tenure:</b> {offer[0].tenure} months
					</Text>
					<Text>
						<b>Rate:</b> {offer[0].interest * 100}% per month
					</Text>
				</div>
			</div>
		</>
	);
};

export default Offer;
