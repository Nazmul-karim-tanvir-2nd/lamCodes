export const SectionTitle = ({ children }) => (
    <div className="mb-5 flex items-center gap-2 sm:gap-3">
        <div className="bg-blue-600 w-[12px] h-[32px] sm:w-[16px] sm:h-[40px] rounded"></div>
        <h2 className="text-base sm:text-xl font-semibold text-gray-700 font-sans">
            {children}
        </h2>
    </div>
);
