import { motion } from "framer-motion";
import { FaTruck, FaBoxes, FaUserShield, } from "react-icons/fa";


export const Services = () => {
    const services = [
        {
            icon: <FaBoxes size={28} />,
            title: "Product Management",
            desc: "Complete product lifecycle management including creation, updates, inventory tracking and optimization."
        },
        {
            icon: <FaTruck size={28} />,
            title: "Order & Delivery",
            desc: "Real-time order processing, delivery tracking, and status updates for customers and managers."
        },
        {
            icon: <FaUserShield size={28} />,
            title: "Secure Payments",
            desc: "Safe and reliable payment handling with transparent payment history and status monitoring."
        },];
    return (
        <div className="min-h-screen bg py-16 px-6">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-center mb-12"
            >
                Our Services
            </motion.h2>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {services.map((service, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg rounded-2xl shadow-lg p-6 text-center"
                    >
                        <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                        <p className="text">{service.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};