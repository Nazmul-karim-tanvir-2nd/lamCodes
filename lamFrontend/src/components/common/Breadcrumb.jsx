// src/components/common/Breadcrumb.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({ items = [] }) => {
    return (
        <nav className="flex items-center text-base text-gray-600 mb-4 px-2">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className="flex items-center">
                        {item.path && !isLast ? (
                            <Link
                                to={item.path}
                                className="hover:underline hover:text-blue-600 transition-colors duration-200 font-medium"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-800 font-semibold">
                                {item.label}
                            </span>
                        )}
                        {index < items.length - 1 && (
                            <ChevronRight size={16} className="mx-2 text-gray-400" />
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
