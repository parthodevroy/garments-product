

import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const Approval = () => {
    

    const axiosSecure = useAxios()
    const { data: riders = [], refetch } = useQuery({
        queryKey: ["rider", "pending"],
        queryFn: async () => {
            const res = await axiosSecure.get("rider")
            return res.data
        }
    })
    // console.log(riders);

    const updatedStatus = (rider, status) => {
        const updateInfo = { status: status, email: rider.EmailAddress }
        axiosSecure.patch(`/rider/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `your status has been ${status}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    refetch()
                }
            })

    }
    const approvedRider = (rider) => {
        updatedStatus(rider, "approved")

    }
    const rejectedRider = (rider) => {
        updatedStatus(rider, "rejected")

    }


    return (
        <div>

          


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District </th>
                            <th>Status</th>
                            <th>Work Status</th>

                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            riders.map((rider, index) =>
                                <tr key={rider._id}>
                                    <th>{index + 1}</th>
                                    <td>{rider.Name}</td>
                                    <td>{rider.EmailAddress}</td>
                                    <td>{rider.District}</td>

                                    <td>
                                        <span className={
                                            rider.status === "approved"
                                                ? "text-green-500"
                                                : rider.status === "rejected"
                                                    ? "text-red-500"
                                                    : "text-yellow-500"
                                        }>
                                            {rider.status}
                                        </span>
                                    </td>
                                     <td>{rider.workStatus}</td>

                                    <td>
                                        <button
                                            onClick={() => approvedRider(rider)}
                                            className='btn btn-sm btn-success'
                                        >
                                            Approve
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            onClick={() => rejectedRider(rider)}
                                            className='btn btn-sm btn-error'
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>

                            )
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Approval;