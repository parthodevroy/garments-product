import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxios from "./useAxios";


const useUserStatus = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`)
        .then((res) => {
          setDbUser(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
      setDbUser(null);
    }
  }, [user]);
  console.log(dbUser);
  

  return {
    dbUser,
    loading,
    isSuspended: dbUser?.status === "suspended",
    suspendReason: dbUser?.suspendReason || null
  };
};

export default useUserStatus;
