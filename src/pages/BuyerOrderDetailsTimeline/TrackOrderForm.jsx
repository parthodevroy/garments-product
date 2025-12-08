import { useState } from "react";
import { useNavigate } from "react-router";

const TrackOrderForm = () => {
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(trackingId.trim()) {
      navigate(`/track-order/${trackingId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Enter your Tracking ID"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        className="input input-bordered w-full mb-3"
      />
      <button type="submit" className="btn btn-primary w-full">
        Track Order
      </button>
    </form>
  );
};

export default TrackOrderForm;
