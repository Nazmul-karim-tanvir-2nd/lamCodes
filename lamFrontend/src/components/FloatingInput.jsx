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

    // Adjust label top position specifically for date inputs to avoid overlap
    const labelTop = shouldFloat
        ? "0.25rem"   // roughly 4px when floating
        : type === "date"
            ? "1.50rem"   // move label a bit lower for date inputs when not floated
            : "1.25rem";  // keep same for other types when not floated

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
                    "placeholder-transparent transition-all duration-300 ease-in-out border-b",
                    {
                        "border-dashed border-gray-300": !isFocused && !disabled,
                        "hover:border-gray-400 hover:border-b hover:border-solid": !isFocused && !disabled,
                        "border-b-2 border-solid border-teal-500": isFocused && !disabled,
                        "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200 border-solid": disabled,
                    }
                )}
                style={{
                    transition: "all 0.3s ease",
                }}
            />
            <label
                htmlFor={name}
                className={classNames(
                    "absolute left-2 bg-white px-1 select-none transition-all duration-300 ease-in-out",
                    {
                        "text-teal-500 text-xs sm:text-sm": shouldFloat,
                        "text-gray-400 text-base sm:text-lg": !shouldFloat,
                        "cursor-not-allowed": disabled,
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
