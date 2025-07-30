// src/components/ui/Checkbox.jsx
import React from "react";
import { cn } from "../../lib/utils";

export const Checkbox = ({ label, checked, onChange, className, ...props }) => {
    return (
        <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className={cn(
                    "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500",
                    className
                )}
                {...props}
            />
            <span className="text-sm text-gray-700">{label}</span>
        </label>
    );
};