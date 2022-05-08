import { Button, Icon, Text } from "@chakra-ui/react";
import { HiOutlineIdentification, HiOutlineMail } from "react-icons/hi";

import { FaFemale } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { RiBankLine } from "react-icons/ri";

const ProfileDetails = ({ startEditting }) => {
	return (
		<>
			<div className="bg-shade-2 h-full w-1/3">
				<img
					src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
					alt="Helen Cross"
					className="object-cover h-full w-full"
				></img>
			</div>
			<div className="bg-shade-1 h-full w-2/3 rounded-r-xl px-4 py-2 flex flex-col gap-4">
				<Text fontSize="5xl" className="font-roboto text-center">
					Sophie Lowe
				</Text>

				<Text fontSize="2xl" className="font-roboto text-shade-4">
					<Icon as={HiOutlineMail} /> sophie.lowe@people.us
				</Text>

				<Text fontSize="2xl" className="font-roboto text-shade-4">
					<Icon as={FaFemale} /> 24 yrs old
				</Text>

				<Text fontSize="2xl" className="font-roboto text-shade-4">
					<Icon as={RiBankLine} /> KJ24GFTK06611999454658560
				</Text>

				<Text fontSize="2xl" className="font-roboto text-shade-4">
					<Icon as={HiOutlineIdentification} /> 5682-4755-3797
				</Text>

				<Button
					leftIcon={<FiEdit3 />}
					colorScheme="pink"
					variant="outline"
					className="w-fit ml-auto"
					onClick={startEditting}
				>
					Edit
				</Button>
			</div>
		</>
	);
};

export default ProfileDetails;
