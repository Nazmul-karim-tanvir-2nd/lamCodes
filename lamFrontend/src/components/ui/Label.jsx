// src/components/ui/Label.jsx
import { cn } from "../../lib/utils";
import React from "react";

export const Label = React.forwardRef(({ className, ...props }, ref) => (
    <label
        ref={ref}
        className={cn("text-sm font-medium text-gray-700", className)}
        {...props}
    />
));

Label.displayName = "Label";
