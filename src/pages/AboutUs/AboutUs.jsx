import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-6xl text mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text">
        About Us
      </h1>

      <p className="text-lg text mb-4 leading-relaxed">
        Welcome to <span className="font-semibold">GarmentTrack</span>, your trusted platform for managing and tracking garment orders seamlessly. 
        We provide end-to-end solutions for garment businesses, from order creation to product delivery tracking.
      </p>

      <p className="text-lg text mb-4 leading-relaxed">
        Our mission is to help garment managers and Buyers stay organized, reduce errors, and monitor orders in real-time. 
        With <span className="font-semibold">GarmentTrack</span>, you get a clear overview of order statuses, product inventory, and delivery timelines.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text">
        Our Values
      </h2>
      <ul className="list-disc ml-6 text space-y-2">
        <li><strong>Transparency:</strong> Clear order tracking for all stakeholders.</li>
        <li><strong>Efficiency:</strong> Streamlined process to save time and reduce errors.</li>
        <li><strong>Reliability:</strong> Accurate data and timely updates on all orders.</li>
        <li><strong>Customer Focus:</strong> Designed to simplify garment business operations.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text">
        Our Team
      </h2>
      <p className="text leading-relaxed">
        Our dedicated team of software engineers and garment industry experts work together to deliver a platform that meets the real needs of businesses. 
        From real-time order tracking to inventory management, we ensure every feature is tailored for maximum impact.
      </p>
    </div>
  );
};

export default AboutUs;
