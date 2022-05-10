import React, { useState, useEffect } from "react";
import ApplicationCard from "./ApplicationCard";
import axios from "../utils/axios";
import { requests } from "../utils/requests";
const ListOfApplication = () => {
  const [myApplication, setApplication] = useState();
  useEffect(() => {
    // async function getMyApplications() {
    //   const request = await axios.get(requests["getMyApplications"]);
    //   return request;
    // }
    // getMyApplications
    //   .then((res) => {
    //     const data = res.data.data;
    //     setApplication(data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     alert("Something Went Wrong");
    //   });
  }, []);
  const applications = [
    {
      amount: "300",
      tenure: "24",
      interestRate: "10",
      createdAt: "12-12-2002",
      count: "10",
    },
    {
      amount: "300",
      tenure: "24",
      interestRate: "10",
      createdAt: "12-12-2002",
      count: "10",
    },
    {
      amount: "300",
      tenure: "24",
      interestRate: "10",
      createdAt: "12-12-2002",
      count: "10",
    },
    {
      amount: "300",
      tenure: "24",
      interestRate: "10",
      createdAt: "12-12-2002",
      count: "10",
    },
    {
      amount: "300",
      tenure: "24",
      interestRate: "10",
      createdAt: "12-12-2002",
      count: "10",
    },
    {
      amount: "300",
      tenure: "24",
      interestRate: "10",
      createdAt: "12-12-2002",
      count: "10",
    },
    {
      amount: "300",
      tenure: "24",
      interestRate: "10",
      createdAt: "12-12-2002",
      count: "10",
    },
    {
      amount: "300",
      tenure: "24",
      interestRate: "10",
      createdAt: "12-12-2002",
      count: "10",
    },
    {
      amount: "300",
      tenure: "24",
      interestRate: "10",
      createdAt: "12-12-2002",
      count: "10",
    },
    {
      amount: "300",
      tenure: "24",
      interestRate: "10",
      createdAt: "12-12-2002",
      count: "10",
    },
    {
      amount: "300",
      tenure: "24",
      interestRate: "10",
      createdAt: "12-12-2002",
      count: "10",
    },
    {
      amount: "300",
      tenure: "24",
      interestRate: "10",
      createdAt: "12-12-2002",
      count: "10",
    },
  ];

  return (
    <div className="bg-shade-200 max-h-[65vh] overflow-y-scroll overflow-hidden  w-full rounded-r-xl rounded-bl-xl p-8 flex flex-col gap-4 shadow-lg text-shade-800">
      {applications.map((application, index) => {
        return <ApplicationCard application={application} key={index} />;
      })}
    </div>
  );
};

export default ListOfApplication;
