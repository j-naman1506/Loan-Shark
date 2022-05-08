import {
	Button,
	ButtonGroup,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Select,
} from "@chakra-ui/react";

const EditProfileDetails = ({ profile, setProfile }) => {
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
				<form className="flex flex-col h-full justify-evenly gap-8 ">
					<FormControl>
						<FormLabel htmlFor="username">Username</FormLabel>
						<Input
							id="username"
							type="text"
							name="username"
							borderColor="#FB6376"
							borderWidth={1}
						/>
					</FormControl>

					<div className="flex gap-4">
						<FormControl>
							<FormLabel htmlFor="first_name">First Name</FormLabel>
							<Input
								id="first_name"
								type="text"
								name="first_name"
								borderColor="#FB6376"
								borderWidth={1}
							/>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="last_name">Last Name</FormLabel>
							<Input
								id="last_name"
								type="text"
								name="last_name"
								borderColor="#FB6376"
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
							borderColor="#FB6376"
							borderWidth={1}
						/>
						<FormHelperText>We'll never share your email.</FormHelperText>
					</FormControl>

					<div className="flex gap-4">
						<FormControl>
							<FormLabel htmlFor="age">Age</FormLabel>
							<NumberInput
								id="age"
								min={0}
								max={100}
								name="age"
								borderColor="#FB6376"
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
								borderColor="#FB6376"
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
							bgColor="#FB6376"
							textColor="#FFF9EC"
							_hover={{
								bgColor: "#FFF9EC",
								textColor: "#FB6376",
								borderColor: "#FB6376",
							}}
							size="md"
						>
							Update
						</Button>
						<Button
							borderColor="#FB6376"
							textColor="#FB6376"
							// _hover={{
							// 	bgColor: "#FFF9EC",
							// }}
							size="md"
							variant={"outline"}
						>
							Clear
						</Button>
					</ButtonGroup>
				</form>
			</div>
		</>
	);
};

export default EditProfileDetails;
