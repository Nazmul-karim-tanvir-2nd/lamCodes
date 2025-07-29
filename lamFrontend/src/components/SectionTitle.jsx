export const SectionTitle = ({ children }) => (
    <div className="mb-7 flex items-center gap-3">
        <div className="bg-blue-600 w-[16px] h-[40px] rounded"></div>
        <h2 className="text-xl font-semibold text-gray-700 my-6 font-sans">
            {children}
        </h2>
    </div>
);