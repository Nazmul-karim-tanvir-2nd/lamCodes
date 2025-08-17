import { useState } from "react";
import classNames from "classnames";

const FloatingSelect = ({ label, name, value, onChange, options = [], disabled = false, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const shouldFloat = isFocused || value;

  const labelTop = shouldFloat ? "0.25rem" : "1.4rem";

  return (
    <div className="relative w-full min-h-[60px]">
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

      <select
        id={name}
        name={name}
        aria-label={name}
        value={value || ""}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        className={classNames(
          "w-full appearance-none bg-transparent pt-6 pb-2 px-2 text-sm sm:text-base outline-none border-b transition-all duration-300 ease-in-out",
          {
            "border-dashed border-gray-400": !isFocused && !error && !disabled,
            "hover:border-gray-600": !isFocused && !error && !disabled,
            "border-b-2 border-blue-500": isFocused && !error && !disabled,
            "border-b-2 border-red-500": error, // RED border when error is true
            "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300": disabled,
          }
        )}
      >
        <option value="" disabled>-- Select --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-red-500 text-sm mt-1">This field is required</p>
      )}
    </div>
  );
};

export default FloatingSelect;
