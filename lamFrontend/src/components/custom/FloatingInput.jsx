// src/components/FloatingInput.jsx
import { useState } from "react";
import classNames from "classnames";

const FloatingInput = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    disabled = false,
    placeholder = " ",
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const shouldFloat = isFocused || (value && value.length > 0);

    const labelTop = shouldFloat
        ? "0.25rem"
        : type === "date"
            ? "1.4rem"
            : "1.4rem";

    return (
        <div className="relative w-full min-h-[60px]">
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoComplete="off"
                className={classNames(
                    "w-full bg-transparent text-gray-800 dark:text-white outline-none pt-6 pb-1 px-2",
                    "text-sm sm:text-base border-b transition-all duration-300 ease-in-out",
                    {
                        "border-dashed border-gray-400": !isFocused && !disabled,
                        "hover:border-gray-600 hover:border-b": !isFocused && !disabled,
                        "border-b-2 border-blue-500": isFocused && !disabled,
                        "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300": disabled,
                    }
                )}
                style={{
                    transition: "all 0.3s ease",
                }}
            />
            <label
                htmlFor={name}
                className={classNames(
                    "absolute left-2 px-1 bg-white dark:bg-gray-900 select-none transition-all duration-300",
                    {
                        "text-blue-600 font-medium text-xs sm:text-sm": shouldFloat,
                        "text-gray-700 text-base sm:text-lg": !shouldFloat,
                        "cursor-not-allowed text-gray-400": disabled,
                    }
                )}
                style={{ top: labelTop }}
            >
                {label}
            </label>
        </div>
    );
};

export default FloatingInput;