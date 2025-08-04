export const SectionTitle = ({ children }) => (
    <h2
        style={{ fontFamily: 'IDLC' }}
        className="mb-2 flex items-center gap-2 text-gray-800 font-semibold text-lg sm:text-xl transition-colors duration-300 hover:text-blue-700"
    >
        {children}
    </h2>
);