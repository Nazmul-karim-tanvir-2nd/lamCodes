// src/components/common/Breadcrumb.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({ items = [] }) => {
    return (
        <nav className="flex items-center text-sm text-gray-600 mb-4">
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    {item.path ? (
                        <Link
                            to={item.path}
                            className="hover:text-blue-600 font-medium"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-500">{item.label}</span>
                    )}
                    {index < items.length - 1 && (
                        <ChevronRight size={16} className="mx-2 text-gray-400" />
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Breadcrumb;
