import ApplicationCard from "./ApplicationCard";
import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { requests } from "../utils/requests";
import Loader from "../Loader";
const OTherApplications = () => {
  const [isLoading, setLoading] = useState(false);
  const [applications, setApplication] = useState();
  const [changed, setApplicationChanged] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function getOtherApplications() {
      const request = await axios.get(requests["createApplication"]);
      return request;
    }
    getOtherApplications()
      .then((res) => {
        const data = res.data.data;

        setApplication(data);
      })
      .catch((e) => {
        alert("Something Went Wrong");
      });
    setLoading(false);
  }, [changed]);
  //   const applications = [
  //     {
  //       amount: "300",
  //       tenure: "24",
  //       interestRate: "10",
  //       createdAt: "12-12-2002",
  //       count: "10",
  //       applicant: "Naman",
  //       id: 39,
  //     },
  //   ];

  return (
    applications && (
      <div className="bg-shade-200 max-h-[65vh] overflow-y-scroll overflow-hidden  w-full rounded-r-xl rounded-bl-xl p-8 flex flex-col gap-4 shadow-lg text-shade-800">
        {applications.map((application, index) => {
          return (
            <ApplicationCard
              application={application}
              key={index}
              showApplicant
              setApplication={setApplicationChanged}
            />
          );
        })}
        <Loader isLoading={isLoading}></Loader>
      </div>
    )
  );
};

export default OTherApplications;
