import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

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
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default AppHome;
