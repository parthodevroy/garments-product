import React, { useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { FiShieldOff } from "react-icons/fi";
import { FaUserShield } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const UserManagement = () => {
    const [serceUser,setSerceUser]=useState('')
    const axiosSecure = useAxios()
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users",serceUser],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?serceUser=${serceUser}`)
            return res.data
        }
    })
    // console.log(users);
  const handelMakeUser = (user) => {

  Swal.fire({
    title: "Are you sure?",
    text: "You are making this user an admin!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, make admin"
  }).then((result) => {

    if (result.isConfirmed) {
      const roleInfo = { role: "admin" };

      axiosSecure.patch(`/user/${user._id}`, roleInfo)
        .then(res => {

          if (res.data.modifiedCount) {
            refetch(); // UI reload

            Swal.fire({
              title: "Success!",
              text: `${user.name} is now admin.`,
              icon: "success"
            });
          }

        });
    }

  });

};
const handelRemuveAdmin = (user) => {

  Swal.fire({
    title: "Are you sure?",
    text: "You are removing admin role from this user!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, remove admin"
  }).then((result) => {

    if (result.isConfirmed) {

      const roleInfo = { role: "user" }; 

      axiosSecure.patch(`/user/${user._id}`, roleInfo)
        .then(res => {

          if (res.data.modifiedCount) {
            refetch();

            Swal.fire({
              title: "Removed!",
              text: `${user.name} is no longer an admin.`,
              icon: "success"
            });
          }

        });

    }

  });

};

    return (
        <div>
            <h1>user management{users.length}</h1>
            {/* serce user  */}
            <label className="input">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input onChange={(e)=>setSerceUser(e.target.value)} type="search" className="grow" placeholder="Search" />
  
</label>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) =>
                            <tr>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.
                                                        photoURL}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.displayName}</div>
                                            <div className="text-sm opacity-50">United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                   {user.email}
                                </td>
                                <td>{user.role}</td>
                                <th>
                                    {user.role ==="admin" ?
                                     <button onClick={()=>handelRemuveAdmin(user)} className="btn bg-red-500 "><FiShieldOff /></button>
                                   :
                                    <button onClick={()=>handelMakeUser(user)} className="btn bg-green-500 "><FaUserShield /></button>
}
                                </th>
                            </tr>
                        )}



                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default UserManagement;