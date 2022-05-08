import { RiNumber0, RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";

import { IconButton } from "@chakra-ui/react";
import { shade } from "./../../static/templates/colors";

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
						color={shade[100]}
						bgColor={index === stage && shade[700]}
						height={"full"}
						width={"full"}
						_hover={{
							color: shade[900],
							bgColor: shade[600],
						}}
						_active={{
							color: shade[900],
							bgColor: shade[600],
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
