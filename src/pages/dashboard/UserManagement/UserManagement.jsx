// import React, { useState } from 'react';
// import useAxios from '../../../hooks/useAxios';
// import { useQuery } from '@tanstack/react-query';
// import { FiShieldOff } from "react-icons/fi";
// import { FaUserShield } from 'react-icons/fa6';
// import Swal from 'sweetalert2';

// const UserManagement = () => {
//     const [serceUser,setSerceUser]=useState('')
//     const axiosSecure = useAxios()
//     const { data: users = [], refetch } = useQuery({
//         queryKey: ["users",serceUser],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/user?serceUser=${serceUser}`)
//             return res.data
//         }
//     })
//     // console.log(users);
//   const handelMakeUser = (user) => {
//   Swal.fire({
//     title: "Approve User?",
//     text: "This user will get full access!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, approve"
//   }).then((result) => {
//     if (result.isConfirmed) {

//       axiosSecure.patch(`/user/${user._id}`, { status: "approved" })
//         .then(res => {
//           if (res.data.modifiedCount) {
//             refetch();
//             Swal.fire("Success!", `${user.displayName} is now approved.`, "success");
//           }
//         });

//     }
//   });
// };

// const handelRemuveAdmin = (user) => {
//   Swal.fire({
//     title: "Remove Approval?",
//     text: "This user will have limited access!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, revoke"
//   }).then((result) => {
//     if (result.isConfirmed) {

//       axiosSecure.patch(`/user/${user._id}`, { status: "pending" })
//         .then(res => {
//           if (res.data.modifiedCount) {
//             refetch();
//             Swal.fire("Removed!", `${user.displayName} is now pending again.`, "success");
//           }
//         });

//     }
//   });
// };

//     return (
//         <div>
//             <h1>user management{users.length}</h1>
//             {/* serce user  */}
//             <label className="input">
//   <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//     <g
//       strokeLinejoin="round"
//       strokeLinecap="round"
//       strokeWidth="2.5"
//       fill="none"
//       stroke="currentColor"
//     >
//       <circle cx="11" cy="11" r="8"></circle>
//       <path d="m21 21-4.3-4.3"></path>
//     </g>
//   </svg>
//   <input onChange={(e)=>setSerceUser(e.target.value)} type="search" className="grow" placeholder="Search" />

// </label>
//             <div className="overflow-x-auto">
//                 <table className="table">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th>
//                                 #
//                             </th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Status</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user, index) =>
//                             <tr>
//                                 <th>
//                                     {index + 1}
//                                 </th>
//                                 <td>
//                                     <div className="flex items-center gap-3">
//                                         <div className="avatar">
//                                             <div className="mask mask-squircle h-12 w-12">
//                                                 <img
//                                                     src={user.
//                                                         photoURL}
//                                                     alt="Avatar Tailwind CSS Component" />
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <div className="font-bold">{user.displayName}</div>
//                                             <div className="text-sm opacity-50">United States</div>
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td>
//                                    {user.email}
//                                 </td>
//                                 <td>{user.status}</td>
//                                 <th>
//                                     {user.status ==="approved" ?
//                                      <button onClick={()=>handelRemuveAdmin(user)} className="btn bg-red-500 "><FiShieldOff /></button>
//                                    :
//                                     <button onClick={()=>handelMakeUser(user)} className="btn bg-green-500 "><FaUserShield /></button>
// }
//                                 </th>
//                             </tr>
//                         )}



//                     </tbody>

//                 </table>
//             </div>
//         </div>
//     );
// };

// export default UserManagement;
import React, { useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FiShield, FiShieldOff } from "react-icons/fi";
import { FaUserShield } from 'react-icons/fa6';

const UserManagement = () => {
  const [searchUser, setSearchUser] = useState('');
  const axiosSecure = useAxios();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", searchUser],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?searchUser=${searchUser}`);
      return res.data;
    }
  });

  // --- Approve user ---
  const handleToggleApprove = (user) => {
    const newStatus = user.status === "approved" ? "pending" : "approved";

    Swal.fire({
      title: newStatus === "approved" ? "Approve User?" : "Make Pending?",
      text: `This user will be set to "${newStatus}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, continue"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user/${user._id}`, {
          status: newStatus,
          suspendReason: ""
        })
          .then(res => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire(
                "Success!",
                `${user.displayName} is now ${newStatus}.`,
                "success"
              );
            }
          });
      }
    });
  };


  // --- Suspend user ---
 const handleSuspendUser = (user) => {
  if (user.status !== "suspended") {
    // --- Suspend user with reason ---
    Swal.fire({
      title: `Suspend ${user.displayName}?`,
      input: 'text',
      inputLabel: 'Reason for suspension',
      inputPlaceholder: 'Enter reason...',
      showCancelButton: true,
      confirmButtonText: 'Suspend',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) return 'You must provide a reason!';
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user/${user._id}`, { status: "suspended", suspendReason: result.value })
          .then(res => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire("Suspended!", `${user.displayName} is now suspended.`, "success");
            }
          });
      }
    });
  } else {
    // --- Unsuspend user without reason ---
    Swal.fire({
      title: `Remove suspension for ${user.displayName}?`,
      text: "User will return to previous status.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Yes, remove suspension',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user/${user._id}`, { status: "approved", suspendReason: "" })
          .then(res => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire("Success!", `${user.displayName} is no longer suspended.`, "success");
            }
          });
      }
    });
  }
};


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management ({users.length})</h1>

      {/* Search */}
      <label className="input mb-4 flex items-center">
        <input
          type="search"
          placeholder="Search by name or email"
          className="input grow"
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </label>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Suspend Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>{user.suspendReason || "-"}</td>
                <td className="flex gap-2">
                  {/* Approve / Pending Toggle Button */}
                  <button
                    onClick={() => handleToggleApprove(user)}
                    className="btn bg-blue-500 text-white"
                    title="Toggle Approve"
                  >
                    {user.status === "approved" ? "Make Pending" : "Approve"}
                  </button>

                  {/* Suspend Button */}
                  {user.status !== "suspended" ? (
                    <button
                      onClick={() => handleSuspendUser(user)}
                      className="btn bg-red-500 text-white"
                      title="Suspend"
                    >
                      <FiShieldOff />
                    </button>
                  ):(
                     <button
                      onClick={() => handleSuspendUser(user)}
                      className="btn bg-red-500 text-white"
                      title=""
                    >
                      <FiShield />
                    </button>

                  )
                }
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
