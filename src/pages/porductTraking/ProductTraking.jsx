import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router";

const ProductTraking = () => {
  const { trackingId } = useParams();

  const { data: logs = [] } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/tracking/${trackingId}`);
      return res.data;
    },
  });
// console.log(logs);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">
        Parcel Traking Id is{logs.length}: {trackingId}
      </h1>
      <ul className="timeline timeline-vertical space-x-4 lg:timeline-horizontal">
        {logs.map(log=>
         <li>
    <div className="timeline-start">{new Date(log.createdAt).toLocaleString()}</div>
    <div className="timeline-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <div className="timeline-end timeline-box">{log.status}</div>
    <hr />
  </li>

        )}
 
 
</ul>
 


    </div>
  );
};

export default ProductTraking;
