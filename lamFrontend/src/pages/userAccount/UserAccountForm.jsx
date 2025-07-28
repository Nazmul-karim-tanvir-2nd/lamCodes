import { useState } from "react";

const SectionTitle = ({ children }) => (
    <h2 className="text-lg font-semibold text-gray-700 mb-4 mt-10 px-4 py-2 bg-gray-50 border-l-4 border-cyan-600 rounded">
        {children}
    </h2>
);

const inputStyle =
    "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white text-sm";

const UserAccountForm = () => {
    const [cif, setCif] = useState("");
    const [name, setName] = useState("John Doe");
    const [mobile, setMobile] = useState("01XXXXXXXXX");
    const [biometric, setBiometric] = useState("");
    const [employmentStatus, setEmploymentStatus] = useState("");
    const [contractExpiry, setContractExpiry] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form submitted!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6 md:p-10">
            <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-200">
                <h1 className="text-2xl font-bold text-indigo-700 text-center mb-10 font-sans tracking-wide">
                    📝 New User Account Opening
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section: Basic Info */}
                    <SectionTitle>Basic Information</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">CIF/NID</label>
                            <input
                                type="text"
                                value={cif}
                                onChange={(e) => setCif(e.target.value)}
                                placeholder="Enter CIF/NID"
                                required
                                className={inputStyle}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                readOnly
                                className={`${inputStyle} bg-gray-100 cursor-not-allowed`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Mobile</label>
                            <input
                                type="text"
                                value={mobile}
                                readOnly
                                className={`${inputStyle} bg-gray-100 cursor-not-allowed`}
                            />
                        </div>
                    </div>

                    {/* Section: Verification */}
                    <SectionTitle>Verification</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Biometric Verified</label>
                            <select
                                value={biometric}
                                onChange={(e) => setBiometric(e.target.value)}
                                required
                                className={inputStyle}
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            {biometric === "No" && (
                                <p className="text-sm text-red-600 mt-1 font-medium">
                                    Access Restricted
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Section: Employment Info */}
                    {biometric === "Yes" && (
                        <>
                            <SectionTitle>Employment Information</SectionTitle>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Joining Date</label>
                                    <input type="date" required className={inputStyle} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Department</label>
                                    <input type="text" required placeholder="e.g. IT" className={inputStyle} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Branch</label>
                                    <input type="text" required className={inputStyle} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Role</label>
                                    <input type="text" required className={inputStyle} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Employment Status</label>
                                    <select
                                        value={employmentStatus}
                                        onChange={(e) => setEmploymentStatus(e.target.value)}
                                        required
                                        className={inputStyle}
                                    >
                                        <option value="">Select</option>
                                        <option value="Permanent">Permanent</option>
                                        <option value="Contractual">Contractual</option>
                                    </select>
                                </div>

                                {employmentStatus === "Contractual" && (
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Contract Expiry</label>
                                        <input
                                            type="date"
                                            value={contractExpiry}
                                            onChange={(e) => setContractExpiry(e.target.value)}
                                            className={inputStyle}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Section: Access */}
                            <SectionTitle>System Access</SectionTitle>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Line Manager</label>
                                    <input
                                        type="text"
                                        value="Auto-filled from CIF"
                                        readOnly
                                        className={`${inputStyle} bg-gray-100 cursor-not-allowed`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Requested Access</label>
                                    <input
                                        type="text"
                                        placeholder="Auto-suggested"
                                        className={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Access Type</label>
                                    <select required className={inputStyle}>
                                        <option value="">Select</option>
                                        <option value="Viewer">Viewer</option>
                                        <option value="Editor">Editor</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                            </div>

                            {/* Section: Justification */}
                            <SectionTitle>Additional Info</SectionTitle>
                            <div className="space-y-6 px-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Justification</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Why is access required?"
                                        required
                                        className={`${inputStyle} resize-none`}
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Upload Supporting Document</label>
                                    <input
                                        type="file"
                                        className="block w-full text-sm text-gray-700 file:border file:border-gray-300 file:rounded file:px-4 file:py-2 file:bg-gray-100"
                                    />
                                </div>
                            </div>

                            <div className="text-right mt-6 px-4">
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded hover:bg-indigo-700 transition"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UserAccountForm;