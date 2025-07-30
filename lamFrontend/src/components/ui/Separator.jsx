// src/components/ui/Separator.jsx
import { cn } from "../../lib/utils";

export const Separator = ({ className, ...props }) => {
    return (
        <div
            className={cn("my-4 h-px w-full bg-gray-200", className)}
            {...props}
        />
    );
};