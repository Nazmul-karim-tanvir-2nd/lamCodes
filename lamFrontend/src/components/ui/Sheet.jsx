import React from "react";

export function Sheet({ children, ...props }) {
    return (
        <div
            {...props}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50"
        >
            {children}
        </div>
    );
}

export function SheetContent({ children, className = "", ...props }) {
    return (
        <div
            {...props}
            className={`bg-white w-80 max-w-full h-full shadow-lg p-6 overflow-auto ${className}`}
        >
            {children}
        </div>
    );
}

export function SheetHeader({ children, className = "", ...props }) {
    return (
        <header {...props} className={`mb-4 ${className}`}>
            {children}
        </header>
    );
}

export function SheetTitle({ children, className = "", ...props }) {
    return (
        <h2 {...props} className={`text-xl font-semibold ${className}`}>
            {children}
        </h2>
    );
}

export function SheetDescription({ children, className = "", ...props }) {
    return (
        <p {...props} className={`text-gray-600 ${className}`}>
            {children}
        </p>
    );
}