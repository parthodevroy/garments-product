import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';


const SendParcel = () => {

   const axiosSecure=useAxios()
   const {user}=useAuth()
   const navigate=useNavigate()

    
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

    const watchRegion=useWatch({control,name:'senderRegion'})
    const reciverWatch=useWatch({control,name:'ReciverRegion'})

    const dictrictByRegion=(region)=>{
        const servicecenter=setdistrict.filter(c=>c.region===region)
        const regionbydistrict=servicecenter.map(d=>d.district)
        return regionbydistrict
    }
    
    

    
        const handelparcel=(data)=>{

            const isdocument=data.parcelType==="document"
            const isSamedistrict=data.senderDistrict===data.reciverDistrict
            const parcelWeight=parseFloat(data.parcelWeight)

            let cost=0;
            if (isdocument){
                cost=isSamedistrict?60:80;
            }else{
                if (parcelWeight  <3) {
                    cost=isSamedistrict?110:140;
                    
                }else{
                    const mincharge=isSamedistrict?110 :150;
                    const extraWeight=parcelWeight-3
                    const extrCharge=isSamedistrict?extraWeight*40:
                    extraWeight*40+40
                    cost=mincharge+extrCharge
                }
              
                
            }
              
              data.cost=cost;
            
            // console.log("Saved Data:", data);
    toast.success("Parcel Successfully Submitted!");
    // reset();
             }

    const onSubmit = (data) => {
       handelparcel(data);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to send this parcel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels",data)
        .then(result=>{
          if (result.data.insertedId) {
            navigate("/dashboard/my-parcels")
            
            Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your parcel has been saved.plese pay",
  showConfirmButton: false,
  timer: 1500
});
          }
            console.log(result.data);
            
        })
        // handelparcel(data); // save
      }
    });
  };
    
    return (
        <div className="max-w-5xl h-auto bg-[#F5FEF9] p-4 mx-auto">
      <h3 className="text-3xl font-bold">Send A Parcel</h3>
      <p>Enter your parcel details</p>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Document / Non Document */}
        <div className="flex space-x-3 pl-4 mt-4">
          <div>
            <h1>Document</h1>
            <input
              type="radio"
              value="document"
              {...register("parcelType", { required: true })}
              className="radio"
              defaultChecked
            />
          </div>

          <div>
            <h1>Non Document</h1>
            <input
              type="radio"
              value="non-document"
              {...register("parcelType", { required: true })}
              className="radio"
            />
          </div>
        </div>

        {/* Parcel Name & Weight */}
        <div className="flex justify-between p-3 mt-4">
          <div>
            <p>Parcel Name</p>
            <input
              type="text"
              placeholder="parcel name"
              {...register("parcelName", { required: true })}
              className="input w-[350px]"
            />
          </div>

          <div>
            <p>Parcel Weight (KG)</p>
            <input
              type="text"
              placeholder="parcel weight"
              {...register("parcelWeight", { required: true })}
              className="input w-[350px]"
            />
          </div>
        </div>

        {/* Sender & Receiver */}
        <div className="flex justify-between p-4">

          {/* Sender */}
          <div>
            <h1 className="text-lg font-semibold mb-2">Sender Details</h1>

            <fieldset className="fieldset">
              <label className="label">Sender Name</label>
              <input
                type="text"
                defaultValue={user?.displayName}
                className="input w-[350px]"
                {...register("senderName", { required: true })}
                placeholder="sender name"
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label">Email Address</label>
              <input
                type="text"
                defaultValue={user?.email}
                className="input w-[350px]"
                {...register("EmailAddress", { required: true })}
                placeholder="Email address"
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label">Sender Phone</label>
              <input
                type="text"
                className="input w-[350px]"
                {...register("senderPhone", { required: true })}
                placeholder="sender phone"
              />
            </fieldset>
            
            {/* sender region */}
            <fieldset className="fieldset">

              <label className="label">Sender Region</label>
          <select
            className="select w-[350px]"
            {...register("senderRegion", { required: true })}
          >
            <option value="">Select Region</option>
            {regions.map((reg,i) => (
              <option key={i} value={reg}>
              {reg} 
                
              </option>
            ))}
          </select>

            </fieldset>

          {/* sender district */}
            <fieldset className="fieldset">

              <label className="label">Sender District</label>
          <select
            className="select w-[350px]"
            {...register("senderDistrict", { required: true })}
          >
            <option value="">Select District</option>
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
            <h1 className="text-lg font-semibold mb-2">Receiver Details</h1>

            <fieldset className="fieldset">
              <label className="label">Receiver Name</label>
              <input
                type="text"
                className="input w-[350px]"
                {...register("receiverName", { required: true })}
                placeholder="receiver name"
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label">Email Address</label>
              <input
                type="text"
                className="input w-[350px]"
                {...register("reciverEmailAddress", { required: true })}
                placeholder="Email address"
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label">Receiver Phone</label>
              <input
                type="text"
                className="input w-[350px]"
                {...register("receiverPhone", { required: true })}
                placeholder="receiver phone"
              />
            </fieldset>

             {/* reciver region */}
            <fieldset className="fieldset">

              <label className="label">Reciver Region</label>
          <select
            className="select w-[350px]"
            {...register("ReciverRegion", { required: true })}
          >
            <option value="">Select Region</option>
            {regions.map((reg,i) => (
              <option key={i} value={reg}>
              {reg} 
                
              </option>
            ))}
          </select>

            </fieldset>

          {/* reciver district */}
            <fieldset className="fieldset">

              <label className="label">Reciver District</label>
          <select
            className="select w-[350px]"
            {...register("reciverDistrict", { required: true })}
          >
            <option value="">Select District</option>
            {dictrictByRegion(reciverWatch).map((reg,i) => (
              <option key={i} value={reg}>
              {reg} 
                
              </option>
            ))}
          </select>

            </fieldset>
          </div>
        </div>

        <button className="btn btn-neutral mt-3">Send Parcel</button>
      </form>
    </div>
    );
};

export default SendParcel;