import { RiNumber0, RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";

import { IconButton } from "@chakra-ui/react";

const Sidebar = ({ stage, setStage }) => {
	const iconButtons = [
		<RiNumber0 />,
		<RiNumber1 />,
		<RiNumber2 />,
		<RiNumber3 />,
	];

	return (
		<>
			<div className="flex flex-col h-full justify-evenly">
				{iconButtons.map((icon, index) => (
					<IconButton
						variant="ghost"
						color="#FFF9EC"
						bgColor={index === stage && "#FCB1A6"}
						height={"full"}
						width={"full"}
						_hover={{
							color: "#5D2A42",
							bgColor: "#FCB1A6",
						}}
						_focus={{
							outline: "none",
						}}
						aria-label="Call Sage"
						fontSize="2rem"
						key={index}
						icon={icon}
						onClick={() => setStage(index)}
					/>
				))}
			</div>
		</>
	);
};

export default Sidebar;
