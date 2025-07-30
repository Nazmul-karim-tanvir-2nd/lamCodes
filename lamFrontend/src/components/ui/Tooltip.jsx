import React, { useState } from "react";

export function TooltipProvider({ children, delayDuration = 0 }) {
    // For simplicity, just render children directly.
    // You can expand this for context if needed.
    return <>{children}</>;
}

export function Tooltip({ children }) {
    return <>{children}</>;
}

export function TooltipTrigger({ children }) {
    // Expect only one child (usually an element)
    return React.cloneElement(children, { tabIndex: 0 });
}

export function TooltipContent({ children, className = "", ...props }) {
    return (
        <div
            {...props}
            className={`absolute z-50 bg-gray-800 text-white text-sm rounded px-2 py-1 shadow-lg ${className}`}
            style={{ whiteSpace: "nowrap" }}
        >
            {children}
        </div>
    );
}