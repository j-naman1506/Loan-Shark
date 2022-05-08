import {
	Button,
	ButtonGroup,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Select,
} from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { shade } from "./../../static/templates/colors";

const EditProfileDetails = ({ setStage, profile, setProfile, stopEditing }) => {
	return (
		<>
			<div className="bg-shade-400 h-full w-1/3">
				<img
					src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
					alt="Helen Cross"
					className="object-cover h-full w-full"
				></img>
			</div>
			<div className="bg-shade-200 h-full w-2/3 rounded-r-xl p-6 flex flex-col gap-4">
				<Heading as="h2" size="xl" textAlign="center">
					Personal Info
				</Heading>
				<form className="flex flex-col h-full justify-evenly gap-8 ">
					<div className="flex gap-4">
						<FormControl>
							<FormLabel htmlFor="first_name">First Name</FormLabel>
							<Input
								id="first_name"
								type="text"
								name="first_name"
								borderColor={shade[800]}
								_hover={{ borderColor: shade[900] }}
								_active={{ borderColor: shade[900] }}
								borderWidth={1}
							/>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="last_name">Last Name</FormLabel>
							<Input
								id="last_name"
								type="text"
								name="last_name"
								borderColor={shade[800]}
								_hover={{ borderColor: shade[900] }}
								_active={{ borderColor: shade[900] }}
								borderWidth={1}
							/>
						</FormControl>
					</div>

					<FormControl>
						<FormLabel htmlFor="email">Email Address</FormLabel>
						<Input
							id="email"
							type="email"
							name="email"
							borderColor={shade[800]}
							_hover={{ borderColor: shade[900] }}
							_active={{ borderColor: shade[900] }}
							borderWidth={1}
						/>
						<FormHelperText color={shade[700]}>
							We'll never share your email.
						</FormHelperText>
					</FormControl>

					<div className="flex gap-4">
						<FormControl>
							<FormLabel htmlFor="age">Age</FormLabel>
							<NumberInput
								id="age"
								min={0}
								max={100}
								name="age"
								borderColor={shade[800]}
								_hover={{ borderColor: shade[900] }}
								_active={{ borderColor: shade[900] }}
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="gender">Gender</FormLabel>
							<Select
								placeholder="Select your gender"
								borderColor={shade[800]}
								_hover={{ borderColor: shade[900] }}
								_active={{ borderColor: shade[900] }}
								borderWidth={1}
							>
								<option value="option1">Male</option>
								<option value="option2">Female</option>
								<option value="option3">Others</option>
							</Select>
						</FormControl>
					</div>

					<ButtonGroup spacing="6">
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
							onClick={() => setStage(1)}
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

export default EditProfileDetails;
