import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import Dues from "./Dues";
import MyApp from "./MyApp";
import MyOffers from "./MyOffers";
import OTherApplications from "./OtherApplications";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AppHome = () => {
  const [veri, setVeri] = useState(
    useSelector((state) => state.auth.userinfo.verified)
  );

  useEffect(() => {
    if (!veri) {
      alert("You are not verified.");
      window.location.href = "/";
    }
  }, [veri]);

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
            <Dues />
          </TabPanel>
          <TabPanel>
            <OTherApplications />
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
