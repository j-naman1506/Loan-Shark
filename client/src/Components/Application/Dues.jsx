import { Heading, Icon, Text } from "@chakra-ui/react";

import { Disclosure } from "@headlessui/react";
import Emi from "./Emi";
import { FiChevronDown } from "react-icons/fi";
import Offer from "./Offer";
import { shade } from "../../static/templates/colors";
import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { requests } from "../utils/requests";
import Loader from "../Loader";
const Dues = () => {
  const [isLoading, setLoading] = useState(false);
  //   const [emis, setEMI] = useState();
  //   useEffect(() => {
  //     setLoading(true);
  //     async function getDues() {
  //       const request = await axios.get(requests["getDues"]);
  //       return request;
  //     }
  //     getDues()
  //       .then((res) => {
  //         const data = res.data.data;
  //         console.log(data);
  //         setEMI(data);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //         alert("Something Went Wrong");
  //       });
  //     setLoading(false);
  //   }, [changed]);
  const emis = [
    {
      id: 1,
      amount: 2000,
      dueDate: "2020-01-01",
    },
    {
      id: 2,
      amount: 2000,
      dueDate: "2020-01-01",
    },
    {
      id: 3,
      amount: 2000,
      dueDate: "2020-01-01",
    },
  ];

  return (
    <div className="min-h-1/2 w-2/3 my-3 flex flex-col gap-6 mx-auto p-8 bg-shade-200 rounded-lg shadow-lg">
      <Disclosure>
        <Disclosure.Button className="text-3xl text-shade-900 font-ubuntu font-bold py-2 flex justify-between items-center w-full ">
          Next EMIs
          <span className="flex gap-2 items-center">
            <Text>{emis.length}</Text>
            <Icon as={FiChevronDown} />
          </span>
        </Disclosure.Button>
        <Disclosure.Panel className="text-green-800 flex flex-col gap-4 mt-8">
          {emis.map((emi) => (
            <Emi emi={emi} key={emi.id} />
          ))}
        </Disclosure.Panel>
      </Disclosure>

      <Disclosure>
        <Disclosure.Button className="text-3xl text-shade-900 font-ubuntu font-bold py-2 mt-6 flex justify-between items-center w-full ">
          Outstanding EMIs
          <span className="flex gap-2 items-center">
            <Text>{emis.length}</Text>
            <Icon as={FiChevronDown} />
          </span>
        </Disclosure.Button>
        <Disclosure.Panel className="text-green-800 flex flex-col gap-4 mt-8">
          {emis.map((emi) => (
            <Emi emi={emi} key={emi.id} />
          ))}
        </Disclosure.Panel>
      </Disclosure>
      <Loader isLoading={isLoading}></Loader>
    </div>
  );
};
export default Dues;
