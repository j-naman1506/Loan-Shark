import {
	Button,
	ButtonGroup,
	FormControl,
	FormLabel,
	Icon,
	Input,
	Text,
} from "@chakra-ui/react";

import { BsPeopleFill } from "react-icons/bs";
import { Dialog } from "@headlessui/react";
import React from "react";
import { shade } from "./../../static/templates/colors";
import { useState } from "react";

function ApplicationCard({ application, showApplicant }) {
	const { amount, tenure, interestRate, createdAt, count, applicant } =
		application;
	const [expanded, setExpanded] = useState(false);
	let [isOpen, setIsOpen] = useState(false);

	const offer = [
		{
			id: 1,
			principle: 50000,
			tenure: 24,
			interest: 0.12,
			status: "Accepted",
			user: "Naman",
		},
		{
			id: 3,
			principle: 75000,
			tenure: 36,
			interest: 0.08,
			status: "Accepted",
		},
		{
			id: 4,
			principle: 60000,
			tenure: 30,
			interest: 0.08,
			status: "Accepted",
		},
	];
	return (
		<>
			<div className="w-2/3 bg-shade-100 border-2 border-shade-800 px-12  mx-auto py-8 flex flex-col gap-4 rounded-lg hover:bg-shade-700 hover:shadow-md hover:text-shade-100">
				<div className="flex justify-between">
					<div className="flex flex-col gap-4">
						<Text className="text-4xl font-ubuntu flex flex-col">
							₹ {amount}
						</Text>
						{showApplicant && (
							<Text className="text-2xl font-ubuntu flex flex-col">
								Applicant : {applicant}
							</Text>
						)}
						<Text className="text-xl font-ubuntu flex flex-col">
							Created at : {createdAt}
						</Text>
					</div>
					<div className="flex flex-col" onClick={() => setExpanded(!expanded)}>
						<span className="flex gap-4 items-center">
							<Icon as={BsPeopleFill} w={6} h={6} />
							<Text className="text-2xl font-ubuntu ">Offers</Text>
						</span>
						<Text className="text-2xl font-ubuntu text-center">{count}</Text>
					</div>
				</div>

				<div className="flex justify-between pt-5 items-center">
					<div className="text-2xl font-roboto justify-between mb-4 flex flex-col gap-2 ">
						<Text>
							<b>Tenure:</b> {tenure} months
						</Text>
						<Text>
							<b>Rate:</b> {interestRate * 100}% per month
						</Text>
					</div>
					<Button
						bgColor={"red.400"}
						textColor={"white"}
						_hover={{
							bgColor: shade[200],
							textColor: "black",
						}}
						size="md"
					>
						Delete
					</Button>
				</div>
				{showApplicant && (
					<>
						<div className="flex justify-evenly items-center">
							<Button
								bgColor={shade[600]}
								textColor={shade[100]}
								borderWidth={1}
								borderColor={"transparent"}
								_hover={{
									bgColor: shade[300],
									textColor: shade[900],
									border: "1px solid shade-300",
								}}
								size="md"
								paddingX={8}
								paddingY={6}
							>
								Accept
							</Button>
							<Button
								bgColor={"red.400"}
								textColor={"white"}
								_hover={{
									bgColor: shade[200],
									textColor: "black",
								}}
								size="md"
								paddingX={8}
								paddingY={6}
							>
								Reject
							</Button>
							<Button
								bgColor={shade[600]}
								textColor={shade[100]}
								borderWidth={1}
								borderColor={"transparent"}
								_hover={{
									bgColor: shade[300],
									textColor: shade[900],
									border: "1px solid shade-300",
								}}
								size="md"
								paddingX={8}
								paddingY={6}
								onClick={() => setIsOpen(!isOpen)}
							>
								Modify
							</Button>
						</div>
						{isOpen && (
							<form className="flex flex-col w-1/2 h-full justify-evenly gap-8 pl-8 mx-auto">
								<div className="flex gap-4 w-full">
									<FormControl>
										<FormLabel htmlFor="amount">Amount</FormLabel>
										<Input
											id="amount"
											type="number"
											name="amount"
											borderColor={shade[800]}
											_hover={{ borderColor: shade[900] }}
											_active={{ borderColor: shade[900] }}
											borderWidth={1}

											// value={application.amount}
											// onChange={handleChange}
										/>
									</FormControl>
								</div>

								<div className="flex gap-4 w-full">
									<FormControl>
										<FormLabel htmlFor="tenure">Tenure</FormLabel>
										<Input
											id="tenure"
											type="number"
											name="tenure"
											placeholder="In months"
											borderColor={shade[800]}
											_placeholder={{
												color: shade[400],
												fontWeight: "bold",
											}}
											_hover={{
												borderColor: shade[900],
											}}
											_active={{ borderColor: shade[900] }}
											borderWidth={1}

											// value={application.tenure}
											// onChange={handleChange}
										/>
									</FormControl>
								</div>

								<div className="flex gap-4 w-full">
									<FormControl>
										<FormLabel htmlFor="interestRate">Interest Rate</FormLabel>
										<Input
											id="rate"
											type="number"
											name="rate"
											placeholder="In percentage"
											borderColor={shade[800]}
											_placeholder={{
												color: shade[400],
												fontWeight: "bold",
											}}
											_hover={{
												borderColor: shade[900],
											}}
											_active={{ borderColor: shade[900] }}
											borderWidth={1}

											// value={application.rate}
											// onChange={handleChange}
										/>
									</FormControl>
								</div>
								<ButtonGroup spacing="6">
									<Button
										bgColor={shade[800]}
										textColor={shade[200]}
										borderWidth={1}
										borderColor={shade[100]}
										_hover={{
											bgColor: shade[200],
											textColor: shade[900],
											borderColor: shade[900],
											borderWidth: 1,
										}}
										size="md"
										// onClick={HandleSubmit}
									>
										Submit
									</Button>
									<Button
										bgColor={shade[200]}
										textColor={shade[800]}
										borderWidth={1}
										borderColor={shade[800]}
										_hover={{
											bgColor: shade[800],
											textColor: shade[100],
											borderColor: shade[900],
											borderWidth: 1,
										}}
										size="md"
										onClick={() =>
											setApplication({
												amount: "",
												tenure: "",
												interestRate: "",
											})
										}
									>
										Clear
									</Button>
								</ButtonGroup>
							</form>
						)}
					</>
				)}

				<div
					className={`${
						expanded ? "h-full flex flex-col" : "h-0 "
					} transition-all ease-in-out overflow-y-hidden`}
				>
					{offer.slice(1).map((offer) => (
						<div className="border-t border-t-shade-900 p-4 flex gap-4 items-center">
							<Text className="text-xl font-ubuntu">₹ {offer.principle}</Text>
							<Text className="text-lg font-roboto">
								<b>Tenure:</b> {offer.tenure} months
							</Text>
							<Text className="text-lg font-roboto">
								<b>Rate:</b> {offer.interest * 100}% per month
							</Text>
							{!showApplicant && (
								<>
									<Button
										bgColor={shade[600]}
										textColor={shade[100]}
										borderWidth={1}
										borderColor={"transparent"}
										marginLeft="auto"
										_hover={{
											bgColor: shade[300],
											textColor: shade[900],
											border: "1px solid shade-300",
										}}
										size="md"
										paddingX={4}
										paddingY={2}
									>
										Accept
									</Button>
									<Button
										bgColor={"red.400"}
										textColor={"white"}
										_hover={{
											bgColor: shade[200],
											textColor: "black",
										}}
										size="md"
										paddingX={4}
										paddingY={2}
									>
										Reject
									</Button>
								</>
							)}
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default ApplicationCard;
