// src/components/ui/Select.jsx
import { cn } from "../../lib/utils";
import React from "react";

export const Select = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <select
            className={cn(
                "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2",
                className
            )}
            ref={ref}
            {...props}
        >
            {children}
        </select>
    );
});

Select.displayName = "Select";