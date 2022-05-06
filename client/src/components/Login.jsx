import {
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";

const Login = () => {
	return (
		<div className="w-1/3 h-full mt-24 mx-auto p-8 rounded-md flex gap-8 flex-col shadow-lg ">
			<Heading
				as="h2"
				size="xl"
				className="text-center font-bold text-cyan-700"
			>
				Say those secret words!
			</Heading>

			<form className="mt-auto flex flex-col gap-8 ">
				<FormControl>
					<FormLabel htmlFor="email">Email address</FormLabel>
					<Input id="email" type="email" />
					<FormHelperText>We'll never share your email.</FormHelperText>
				</FormControl>

				<FormControl>
					<FormLabel htmlFor="email">Password</FormLabel>
					<Input id="email" type="email" />
					<FormHelperText>Choose a strong one.</FormHelperText>
				</FormControl>

				<Button colorScheme="cyan" size="md">
					Login
				</Button>
				<hr className="font-bold w-full border-t-1 border-gray-300" />

				<Button colorScheme="cyan" variant="outline">
					Login with Google
				</Button>
			</form>
		</div>
	);
};

export default Login;
