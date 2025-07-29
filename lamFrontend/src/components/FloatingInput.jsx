import { useState } from "react";
import classNames from "classnames";

const FloatingInput = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    disabled = false,
    placeholder = " ", // trick for floating label with empty placeholder
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const shouldFloat = isFocused || value?.length > 0;

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
                className={classNames(
                    "w-full border-b-2 bg-transparent text-gray-900 outline-none transition-all duration-200 pt-5 pb-1 px-1",
                    {
                        "border-purple-600": isFocused && !disabled,
                        "border-gray-300": !isFocused && !disabled,
                        "bg-gray-100 text-gray-400 cursor-not-allowed": disabled,
                    }
                )}
                autoComplete="off"
            />
            <label
                htmlFor={name}
                className={classNames(
                    "absolute left-1 px-1 pointer-events-none transition-all duration-200 bg-white",
                    {
                        "text-purple-600 text-xs -top-2": shouldFloat,
                        "text-gray-500 top-3.5": !shouldFloat,
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
