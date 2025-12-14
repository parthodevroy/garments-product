import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import axios from 'axios';

const useRole = () => {
    const { user } = useAuth();
    

    const { data: role = null, isLoading } = useQuery({
        queryKey: ["user-role", user?.email],
        queryFn: async () => {
            if (!user?.email) return null;
            const res = await axios.get(`https://garments-management-server.vercel.app/user/${user.email}/role`);
            console.log("user role",res.data);
            
            return res.data?.role || null;
           
            
        },
        enabled: !!user?.email, 
      
        
    });

    return { role, isLoading };
   
    
};


export default useRole;
// import { useQuery } from '@tanstack/react-query';
// import useAuth from './useAuth';
// import axios from 'axios';

// const useRole = () => {
//     const { user } = useAuth();

//     const { data: role = null, isLoading } = useQuery({
//         queryKey: ["user-role", user?.email],
//         queryFn: async () => {
//             if (!user?.email) return null;
//             const res = await axios.get(`https://garments-management-server.vercel.app/user/${user.email}/role`);
//             return res.data?.role || null;
//         },
//         enabled: !!user?.email,
//         staleTime: 1000 * 60, // 1 min cache
//         refetchOnWindowFocus: false
//     });

//     return { role, isLoading };
// };

// export default useRole;
