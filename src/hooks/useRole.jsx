import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import axios from 'axios';

const useRole = () => {
    const { user } = useAuth();
    

    const { data: role = null, isLoading: adminLoading } = useQuery({
        queryKey: ["user-role", user?.email],
        queryFn: async () => {
            if (!user?.email) return null;
            const res = await axios.get(`http://localhost:3000/user/${user.email}/role`);
            console.log("user role",res.data);
            
            return res.data?.role || null;
           
            
        },
        enabled: !!user?.email, 
      
        
    });

    return { role, adminLoading };
   
    
};

export default useRole;
