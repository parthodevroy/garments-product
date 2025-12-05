import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';

const AssignRider = () => {
    const riderModalref = useRef()
    const [selectedRiders, setSelectedRiders] = useState(null)

    const axiosSecure = useAxios()
    const { data: parcels = [], refetch } = useQuery({

        // how many parcle now pending get this api
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?deliveryStatus=pending-pickup`)
            return res.data
        }


    })
    // rider get api how many rider avabilvale now get this api

    const { data: riders = [],refetch:riderRefetch } = useQuery({
        queryKey: ['riders', selectedRiders?.senderDistrict, 'available'],
        enabled: !!selectedRiders,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/rider?status=approved&district=${selectedRiders.senderDistrict}&workStatus=available`
            );
            return res.data;
        }
    });

    // console.log("Selected Parcel:", selectedRiders);
    // console.log("Available Riders:", riders);


    // modal open and how many rider available this district show
    const assignShowModal = (parcel) => {
        setSelectedRiders(parcel)
        riderModalref.current.showModal()

    }

    // rider  k assign btn assign krle rider e se parcel niye giye seller k dite parbe
   const handleAssignRider = (rider) => {
  const riderInfo = {
    riderId: rider._id,
    riderEmail: rider.EmailAddress, 
    riderName: rider.Name,           
    parcelId: selectedRiders._id,
    trackingId:selectedRiders.trackingId
  };

  axiosSecure
    .patch(`/parcels/${selectedRiders._id}`, riderInfo)
    .then((res) => {
      if (res.data.modifiedCount) {
        riderRefetch()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider ${rider.Name} has been assigned!`,
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
    .catch((err) => {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    })
    .finally(() => {
      riderModalref.current.close();
      refetch(); // refresh parcels
    });
};

return (
    <div>


        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button>
        <dialog ref={riderModalref} className="modal">
            <div className="modal-box w-11/12 max-w-3xl">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <h3 className="font-bold text-lg mb-4">
                    Riders available in {selectedRiders?.senderDistrict}: {riders.length}
                </h3>

                <table className="table w-full table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.map((rider, index) => (
                            <tr key={rider._id}>
                                <td>{index + 1}</td>
                                <td>{rider.Name}</td>
                                <td>{rider.EmailAddress}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => handleAssignRider(rider)}
                                    >
                                        Assign
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </dialog>



        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <td>Name</td>
                        <td>cost</td>
                        <td>date</td>
                        <td>pick up</td>
                        <td>action</td>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <th>{index + 1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>{parcel.cost}</td>
                            <td>{parcel.createdAt}</td>
                            <td>{parcel.deliveryStatus}</td>
                            <td>
                                <button
                                    onClick={() => assignShowModal(parcel)}
                                    className='btn btn-neutral'
                                >
                                    assign rider
                                </button>
                            </td>
                        </tr>
                    ))}



                </tbody>
            </table>
        </div>
    </div>
);
};

export default AssignRider;