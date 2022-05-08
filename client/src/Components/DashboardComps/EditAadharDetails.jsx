import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
	Button,
	ButtonGroup,
	FormControl,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";

import { shade } from "./../../static/templates/colors";

const EditAadharDetails = ({
	stage,
	setStage,
	stopEditing,
	profile,
	setProfile,
}) => {
	return (
		<>
			<div className="bg-shade-200 h-full w-full rounded-r-xl py-6 px-12 flex flex-col gap-4">
				<Heading as="h2" size="xl" textAlign="center">
					Aadhar & PAN Details
				</Heading>
				<form className="flex flex-col h-full justify-evenly gap-8 ">
					<FormControl>
						<FormLabel htmlFor="aadhar_number">Aadhar Number</FormLabel>
						<Input
							id="aadhar_number"
							type="text"
							name="aadhar_number"
							borderColor={shade[800]}
							_hover={{ borderColor: shade[900] }}
							_active={{ borderColor: shade[900] }}
							borderWidth={1}
						/>
					</FormControl>

					<FormControl>
						<FormLabel htmlFor="aadhar_card">
							Upload your Aadhar Card in PDF format
						</FormLabel>
						<Input
							id="aadhar_card"
							type="file"
							name="aadhar_card"
							fontSize="lg"
							padding="1"
							borderColor={shade[800]}
							_hover={{ borderColor: shade[900] }}
							_active={{ borderColor: shade[900] }}
							borderWidth={1}
						/>
					</FormControl>

					<FormControl>
						<FormLabel htmlFor="pan">PAN</FormLabel>
						<Input
							id="pan"
							type="text"
							name="pan"
							borderColor={shade[800]}
							_hover={{ borderColor: shade[900] }}
							_active={{ borderColor: shade[900] }}
							borderWidth={1}
						/>
					</FormControl>

					<FormControl>
						<FormLabel htmlFor="pan_card">
							Upload your PAN Card in PDF format
						</FormLabel>
						<Input
							id="pan_card"
							type="file"
							name="pan_card"
							fontSize="lg"
							padding="1"
							borderColor={shade[800]}
							_hover={{ borderColor: shade[900] }}
							_active={{ borderColor: shade[900] }}
							borderWidth={1}
						/>
					</FormControl>

					<ButtonGroup spacing="6">
						<Button
							leftIcon={<ArrowBackIcon />}
							bgColor={shade[200]}
							textColor={shade[800]}
							borderWidth={1}
							borderColor={shade[800]}
							_hover={{
								bgColor: shade[500],
								textColor: shade[900],
								borderColor: shade[900],
								borderWidth: 1,
							}}
							size="md"
							onClick={() => setStage(stage - 1)}
						>
							Back
						</Button>
						<Button
							rightIcon={<ArrowForwardIcon />}
							bgColor={shade[800]}
							textColor={shade[200]}
							borderWidth={1}
							borderColor={shade[100]}
							_hover={{
								bgColor: shade[500],
								textColor: shade[900],
								borderColor: shade[900],
								borderWidth: 1,
							}}
							size="md"
							onClick={() => setStage(stage + 1)}
						>
							Continue
						</Button>
						<Button
							bgColor={shade[200]}
							textColor={shade[800]}
							borderWidth={1}
							borderColor={shade[800]}
							_hover={{
								bgColor: shade[500],
								textColor: shade[900],
								borderColor: shade[900],
								borderWidth: 1,
							}}
							size="md"
						>
							Clear
						</Button>

						<Button
							bgColor={shade[200]}
							textColor={shade[800]}
							borderWidth={1}
							borderColor={shade[800]}
							_hover={{
								bgColor: shade[500],
								textColor: shade[900],
								borderColor: shade[900],
								borderWidth: 1,
							}}
							size="md"
							onClick={stopEditing}
						>
							Cancel
						</Button>
					</ButtonGroup>
				</form>
			</div>
		</>
	);
};

export default EditAadharDetails;
