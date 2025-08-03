export const SectionTitle = ({ children }) => (
    <div className="group mb-2 flex items-center gap-2 sm:gap-3 transition-all duration-300">
        {/* Dash/Line */}
        <div
            className="w-[12px] h-[32px] sm:w-[16px] sm:h-[40px] rounded-sm
                 bg-gradient-to-b from-blue-500 to-blue-700
                 group-hover:w-[4px] group-hover:rounded-none
                 group-hover:bg-blue-700
                 transition-all duration-300 ease-in-out"
        ></div>

        {/* Icon + Text container */}
        <div className="flex items-center gap-2 text-gray-700 group-hover:text-blue-700 font-sans font-semibold text-base sm:text-xl">
            {children}
        </div>
    </div>
);
