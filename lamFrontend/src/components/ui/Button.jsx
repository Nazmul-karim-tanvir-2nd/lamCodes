import { cn } from "../../lib/utils";

export function Button({ className, variant = "default", size = "default", children, ...props }) {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const variantStyles = {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-gray-300 text-gray-900 hover:bg-gray-100",
        ghost: "bg-transparent hover:bg-gray-100",
    };
    const sizeStyles = {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-6 text-base",
    };

    return (
        <button
            className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
            {...props}
        >
            {children}
        </button>
    );
}
