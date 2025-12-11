import React from "react";

const brands = ["Nike", "Adidas", "Puma", "Reebok", "Levi's", "H&M", "Fila", "Tommy Hilfiger"];

const Brands = () => {
    return (
        <div className=" bg pb-4">
            {/* Heading */}
            <h3 className="text-2xl font-bold text-center mb-2 text-gray-900">
                Our Partnered Brands
            </h3>

            {/* Ticker */}
            <div className="overflow-hidden whitespace-nowrap">
                <div className="animate-scroll inline-block">
                    {brands.map((brand, index) => (
                        <span
                            key={index}
                            className="mx-8 text-xl font-semibold text-gray-800 inline-block"
                        >
                            {brand}
                        </span>
                    ))}
                    {/* Repeat brands for seamless loop */}
                    {brands.map((brand, index) => (
                        <span
                            key={index + brands.length}
                            className="mx-8 text-xl font-semibold text-gray-800 inline-block"
                        >
                            {brand}
                        </span>
                    ))}
                </div>
            </div>

            {/* Scroll Animation */}
            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    display: inline-block;
                    white-space: nowrap;
                    animation: scroll 20s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Brands;
