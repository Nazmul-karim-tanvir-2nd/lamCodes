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

    return (
        <div className="relative w-full min-h-[56px]">
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
                    "w-full bg-transparent text-gray-800 outline-none pt-6 pb-1 px-2 text-base sm:text-lg",
                    "placeholder-transparent transition-colors duration-300",
                    {
                        "border-b border-gray-300": !isFocused && !disabled,
                        "hover:border-gray-400": !isFocused && !disabled,
                        "border-b-2 border-teal-400": isFocused && !disabled,
                        "bg-gray-50 text-gray-400 cursor-not-allowed border-b border-gray-200": disabled,
                    }
                )}
                style={{
                    transition: "border-color 0.3s ease, border-width 0.3s ease",
                }}
            />
            <label
                htmlFor={name}
                className={classNames(
                    "absolute left-2 bg-white px-1 select-none transition-all duration-300 ease-in-out",
                    {
                        "text-teal-500 text-xs sm:text-sm top-1": shouldFloat,
                        "text-gray-400 text-base sm:text-lg top-5": !shouldFloat,
                        "cursor-not-allowed": disabled,
                    }
                )}
            >
                {label}
            </label>
        </div>
    );
};

export default FloatingInput;