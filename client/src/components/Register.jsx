import {
	Button,
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
} from "@chakra-ui/react";

const Register = () => {
	return (
		<div className="w-1/3 h-full mt-12 mx-auto p-8 rounded-md flex gap-8 flex-col shadow-lg ">
			<Heading
				as="h2"
				size="xl"
				className="text-center font-bold text-cyan-700"
			>
				Welcome to the gang!
			</Heading>

			<form className="mt-auto flex flex-col gap-8 ">
				<FormControl>
					<FormLabel htmlFor="username">Username</FormLabel>
					<Input id="username" type="text" />
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="first_name">First Name</FormLabel>
					<Input id="first_name" type="text" />
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="last_name">Last Name</FormLabel>
					<Input id="last_name" type="text" />
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="email">Email Address</FormLabel>
					<Input id="email" type="email" />
					<FormHelperText>We'll never share your email.</FormHelperText>
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="age">Age</FormLabel>
					<NumberInput id="age" min={0} max={100}>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="email">Password</FormLabel>
					<Input id="email" type="email" />
					<FormHelperText>Choose a strong one.</FormHelperText>
				</FormControl>

				<Button colorScheme="cyan" size="md">
					Register
				</Button>
			</form>
		</div>
	);
};

export default Register;
