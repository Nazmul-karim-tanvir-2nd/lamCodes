import React from "react";

const Skeleton = ({ className = "", ...props }) => {
    return (
        <div
            {...props}
            className={`bg-gray-300 rounded animate-pulse ${className}`}
        />
    );
};

export { Skeleton };