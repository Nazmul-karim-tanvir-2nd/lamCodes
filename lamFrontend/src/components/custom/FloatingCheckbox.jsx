// src/components/FloatingCheckbox.jsx
import { useState } from "react";
import classNames from "classnames";

const FloatingCheckbox = ({ label, name, checked, onChange, disabled = false }) => {
    const [isFocused, setIsFocused] = useState(false);
    const shouldFloat = isFocused || checked;

    return (
        <div className="relative w-full min-h-[60px]">
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={classNames(
                    "appearance-none w-5 h-5 border border-gray-400 rounded-md checked:bg-red-600 checked:border-red-600",
                    "focus:ring-2 focus:ring-red-400 transition-all cursor-pointer",
                    {
                        "bg-gray-200 cursor-not-allowed": disabled,
                    }
                )}
            />
            <label
                htmlFor={name}
                className={classNames(
                    "ml-2 absolute left-7 px-1 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 dark:bg-gray-900 transition-all duration-200 select-none",
                    {
                        "text-sm font-medium text-red-600": shouldFloat,
                        "text-base": !shouldFloat,
                        "text-gray-400 cursor-not-allowed": disabled,
                    }
                )}
            >
                {label}
            </label>
        </div>
    );
};

export default FloatingCheckbox;