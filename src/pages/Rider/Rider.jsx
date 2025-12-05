import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';

const Rider = () => {
    const {user}=useAuth()
    const axiosSecure=useAxios()
     const {
                register,
                handleSubmit,
                reset,
               control
                // formState: { errors }
            } = useForm();
             const setdistrict=useLoaderData()
    const userdistrict=setdistrict.map(c=>c.region)
    // console.log(userdistrict);
    const regions=[...new Set(userdistrict)]
    // console.log(regions);

    const watchRegion=useWatch({control,name:'Region'})
   

    const dictrictByRegion=(region)=>{
        const servicecenter=setdistrict.filter(c=>c.region===region)
        const regionbydistrict=servicecenter.map(d=>d.district)
        return regionbydistrict
    }
     const riderHandel = (data) => {
        console.log(data);
        axiosSecure.post("/rider",data)
        .then(res=>{
            if (res.data.insertedId) {
                
                            Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your have been successfully  submit your data plese waite untile we accept your proposal",
                  showConfirmButton: false,
                  timer: 2000
                });
                
            }

        })
        
          
     
      };
    return (
       <div className="max-w-5xl h-auto bg-[#F5FEF9] p-4 mx-auto">
      <h3 className="text-3xl text-center font-bold">Be A Rider</h3>
      <p className='text-center'>Enter your details</p>

      <form onSubmit={handleSubmit(riderHandel)}>

        

        {/* Parcel Name & Weight */}
        

        {/* Sender & Receiver */}
        <div className="flex justify-between p-4">

          {/* Sender */}
          <div>
            

            <fieldset className="fieldset">
              <label className="label text-black">Your Name</label>
              <input
                type="text"
                defaultValue={user?.displayName}
                className="input w-[350px]"
                {...register("Name", { required: true })}
                placeholder="your name"
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label text-black">Email Address</label>
              <input
                type="text"
                defaultValue={user?.email}
                className="input w-[350px]"
                {...register("EmailAddress", { required: true })}
                placeholder="Email address"
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label text-black">NID</label>
              <input
                type="text"
                className="input w-[350px]"
                {...register("nid", { required: true })}
                placeholder="your nid"
              />
            </fieldset>
            
            {/* sender region */}
            <fieldset className="fieldset">

              <label className="label text-black"> Region</label>
          <select
            className="select w-[350px]"
            {...register("Region", { required: true })}
          >
            <option className='text-black' value="">Select Region</option>
            {regions.map((reg,i) => (
              <option key={i} value={reg}>
              {reg} 
                
              </option>
            ))}
          </select>

            </fieldset>

          {/* sender district */}
            <fieldset className="fieldset">

              <label className="label text-black">District</label>
          <select
            className="select w-[350px]"
            {...register("District", { required: true })}
          >
            <option className='text-black' value="">Select District</option>
            {dictrictByRegion(watchRegion).map((reg,i) => (
              <option key={i} value={reg}>
              {reg} 
                
              </option>
            ))}
          </select>

            </fieldset>
            </div>

          {/* Receiver */}
          <div>
            
            <fieldset className="fieldset">
              <label className="label text-black">Your Age</label>
              <input
                type="text"
                className="input w-[350px]"
                {...register("age", { required: true })}
                placeholder="your age"
              />
            </fieldset>


            <fieldset className="fieldset">
              <label className="label text-black"> Phone</label>
              <input
                type="text"
                className="input w-[350px]"
                {...register("Phone", { required: true })}
                placeholder="your phone"
              />
            </fieldset>

            
          </div>
        </div>

        <button className="btn flex justify-center btn-neutral mt-3">Be a Rider</button>
      </form>
    </div>
    );
};

export default Rider;