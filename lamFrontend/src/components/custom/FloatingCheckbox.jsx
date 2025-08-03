import { useState } from "react";
import classNames from "classnames";

const FloatingCheckbox = ({ label, name, checked, onChange, disabled = false }) => {
    const [isFocused, setIsFocused] = useState(false);
    const shouldFloat = isFocused || checked;

    return (
        <div className="w-full py-1 flex items-center justify-start gap-2">
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
                    "appearance-none w-4 h-4 border border-gray-400 rounded-md checked:bg-red-600 checked:border-red-600",
                    "focus:ring-2 focus:ring-red-400 transition-all cursor-pointer",
                    {
                        "bg-gray-200 cursor-not-allowed": disabled,
                    }
                )}
            />
            <label
                htmlFor={name}
                className={classNames(
                    "text-base text-gray-700 dark:bg-gray-900 transition-all select-none",
                    {
                        "font-medium text-red-600": shouldFloat,
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