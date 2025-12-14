import { FaHeadset, FaTools, FaQuestionCircle } from "react-icons/fa";
import { motion } from "framer-motion";



export const Support = () => {
    const supports = [
        {
            icon: <FaHeadset size={26} />,
            title: "24/7 Customer Support",
            desc: "Our support team is available around the clock to help with any issues or questions."
        },
        {
            icon: <FaTools size={26} />,
            title: "Technical Assistance",
            desc: "Instant help for system, dashboard, and order-related technical problems."
        },
        {
            icon: <FaQuestionCircle size={26} />,
            title: "Help Center",
            desc: "Detailed guides, FAQs, and documentation to help you use the platform efficiently."
        },
    ]; return (
        <div className="min-h-screen bg py-16 px-6">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-center mb-12"
            >
                Support & Assistance
            </motion.h2>


            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {supports.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="border rounded-2xl p-6 text-center shadow-md"
                    >
                        <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text">{item.desc}</p>
                    </motion.div>
                ))}
            </div>


            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-12"
            >
                <p className="text-gray-600 mb-4">
                    Need immediate help? Our support team is just one click away.
                </p>
                <button className="btn btn-primary px-8">Contact Support</button>
            </motion.div>
        </div>
    );
};