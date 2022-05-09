import { Text } from "@chakra-ui/react";

const Emi = ({ emi }) => {
	return (
		<div className="w-2/3 bg-shade-100 border-2 border-shade-800 text-green-900 px-8 py-4 flex flex-col gap-4 rounded-lg hover:bg-shade-700 hover:shadow-md hover:text-shade-100 hover:shadow-md">
			<Text className="text-xl font-ubuntu">₹ {emi.amount}</Text>
			<Text className="text-lg font-roboto">
				<b>Due: </b> {emi.dueDate}
			</Text>
		</div>
	);
};

export default Emi;
