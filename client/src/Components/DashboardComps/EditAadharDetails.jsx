import "@react-pdf-viewer/core/lib/styles/index.css";

import {
	ArrowBackIcon,
	ArrowForwardIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
} from "@chakra-ui/icons";
import {
	Button,
	ButtonGroup,
	FormControl,
	FormLabel,
	Heading,
	IconButton,
	Input,
	Text,
} from "@chakra-ui/react";

import { Viewer } from "@react-pdf-viewer/core";
import { shade } from "./../../static/templates/colors";
import { useState } from "react";

const EditAadharDetails = ({
	stage,
	setStage,
	stopEditing,
	profile,
	setProfile,
}) => {
	const [aadharUrl, setAadharUrl] = useState(null);
	const [panUrl, setPanUrl] = useState(null);

	const onAadharChange = (e) => {
		const files = e.target.files;
		files.length > 0 && setAadharUrl(URL.createObjectURL(files[0]));
	};

	const onPanChange = (e) => {
		const files = e.target.files;
		files.length > 0 && setPanUrl(URL.createObjectURL(files[0]));
	};

	return (
		<>
			<div className="bg-shade-200 h-full w-full rounded-r-xl py-6 px-12 flex flex-col gap-4">
				<Heading as="h2" size="xl" textAlign="center">
					Aadhar & PAN Details
				</Heading>
				<form className="flex flex-col h-full justify-evenly gap-8 ">
					<div className="flex gap-4">
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
					</div>

					<div className="flex gap-4">
						<FormControl>
							<FormLabel htmlFor="aadhar_card">
								Upload your Aadhar Card in PDF format
							</FormLabel>
							<Input
								id="aadhar_card"
								type="file"
								accept="application/pdf"
								onChange={onAadharChange}
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
							<FormLabel htmlFor="pan_card">
								Upload your PAN Card in PDF format
							</FormLabel>
							<Input
								id="pan_card"
								type="file"
								accept="application/pdf"
								onChange={onPanChange}
								name="pan_card"
								fontSize="lg"
								padding="1"
								borderColor={shade[800]}
								_hover={{ borderColor: shade[900] }}
								_active={{ borderColor: shade[900] }}
								borderWidth={1}
							/>
						</FormControl>
					</div>

					<div className="flex h-full gap-4">
						{aadharUrl ? (
							<div className="h-96 m-0 p-0 w-full overflow-y-scroll">
								<Viewer fileUrl={aadharUrl} />
							</div>
						) : (
							<div className="flex justify-center items-center h-full w-full border-2 border-shade-900 border-dashed border-opacity-30 text-3xl">
								Your uploaded Aadhar Card will show here
							</div>
						)}
						{panUrl ? (
							<div className="h-96 m-0 p-0 w-full overflow-y-scroll">
								<Viewer fileUrl={panUrl} />
							</div>
						) : (
							<div className="flex justify-center items-center h-full w-full border-2 border-shade-900 border-dashed border-opacity-30 text-3xl">
								Your uploaded PAN Card will show here
							</div>
						)}
					</div>

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
