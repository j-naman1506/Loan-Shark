import React, { useState, useEffect } from "react";
import ApplicationCard from "./ApplicationCard";
import axios from "../utils/axios";
import { requests } from "../utils/requests";
import Loader from "../Loader";
const ListOfApplication = () => {
  const [isLoading, setLoading] = useState(false);
  const [myApplication, setApplication] = useState();
  const [applicationChanged, setApplicationChanged] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function getMyApplications() {
      const request = await axios.get(requests["getMyApplications"]);
      return request;
    }
    getMyApplications()
      .then((res) => {
        const data = res.data.data;

        setApplication(data);
      })
      .catch((e) => {
        alert("Something Went Wrong");
      });
    setLoading(false);
  }, [applicationChanged]);

  return (
    <div className="bg-shade-200 max-h-[65vh] overflow-y-scroll overflow-hidden  w-full rounded-r-xl rounded-bl-xl p-8 flex flex-col gap-4 shadow-lg text-shade-800">
      {myApplication ? (
        myApplication.map((application, index) => {
          return (
            <ApplicationCard
              application={application}
              setApplication={setApplicationChanged}
              key={index}
              showApplicant={false}
            />
          );
        })
      ) : (
        <div>No Applications</div>
      )}
      <Loader isLoading={isLoading}></Loader>
    </div>
  );
};

export default ListOfApplication;
