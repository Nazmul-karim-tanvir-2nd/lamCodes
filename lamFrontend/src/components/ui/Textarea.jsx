// src/components/ui/Textarea.jsx
import { cn } from "../../lib/utils";
import React from "react";

export const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                "flex w-full min-h-[80px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});

Textarea.displayName = "Textarea";