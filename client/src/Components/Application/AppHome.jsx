import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import MyApp from "./MyApp";
import MyOffers from "./MyOffers";
import React from "react";

const AppHome = () => {
	return (
		<div className="p-8">
			<Tabs isFitted>
				<TabList mb="1em">
					<Tab
						_selected={{ borderBottom: "4px", borderColor: "#FCB1A6" }}
						_focus={{ outline: "none" }}
						_hover={{ borderColor: "#FCB1A6" }}
					>
						My applications
					</Tab>
					<Tab
						_selected={{ borderBottom: "4px", borderColor: "#FCB1A6" }}
						_focus={{ outline: "none" }}
						_hover={{ borderColor: "#FCB1A6" }}
					>
						Dues
					</Tab>
					<Tab
						_selected={{ borderBottom: "4px", borderColor: "#FCB1A6" }}
						_focus={{ outline: "none" }}
						_hover={{ borderColor: "#FCB1A6" }}
					>
						Other applications
					</Tab>
					<Tab
						_selected={{ borderBottom: "4px", borderColor: "#FCB1A6" }}
						_focus={{ outline: "none" }}
						_hover={{ borderColor: "#FCB1A6" }}
					>
						My Offers
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<MyApp />
					</TabPanel>
					<TabPanel>
						<p>two!</p>
					</TabPanel>
					<TabPanel>
						<p>one!</p>
					</TabPanel>
					<TabPanel>
						<MyOffers />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</div>
	);
};

export default AppHome;
