import { useState } from "react";

const SectionTitle = ({ children }) => (
    <h2 className="text-lg font-semibold text-gray-700 mb-4 mt-8 py-4 border-b px-4 border-b-cyan-500 rounded border-gray-200 pb-1">
        {children}
    </h2>
);

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
        <div className="bg-white w-full min-h-screen py-8 px-10 text-gray-900">
            <h1 className="text-xl font-semibold text-blue-600 mb-6 text-center font-mono">
                📝 New User Account Opening
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6 px-4">
                {/* Section: Basic Info */}
                <SectionTitle>Basic Information</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">CIF/NID</label>
                        <input
                            type="text"
                            value={cif}
                            onChange={(e) => setCif(e.target.value)}
                            placeholder="Enter CIF/NID"
                            required
                            className="input"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            readOnly
                            className="input bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Mobile</label>
                        <input
                            type="text"
                            value={mobile}
                            readOnly
                            className="input bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Section: Verification */}
                <SectionTitle>Verification</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Biometric Verified
                        </label>
                        <select
                            value={biometric}
                            onChange={(e) => setBiometric(e.target.value)}
                            required
                            className="input"
                        >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        {biometric === "No" && (
                            <p className="text-sm text-red-500 mt-1 font-medium">
                                Access Restricted
                            </p>
                        )}
                    </div>
                </div>

                {/* Section: Employment Info */}
                {biometric === "Yes" && (
                    <>
                        <SectionTitle>Employment Information</SectionTitle>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Joining Date
                                </label>
                                <input type="date" required className="input" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Department
                                </label>
                                <input type="text" required placeholder="e.g. IT" className="input" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Branch</label>
                                <input type="text" required className="input" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Role</label>
                                <input type="text" required className="input" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Employment Status
                                </label>
                                <select
                                    value={employmentStatus}
                                    onChange={(e) => setEmploymentStatus(e.target.value)}
                                    required
                                    className="input"
                                >
                                    <option value="">Select</option>
                                    <option value="Permanent">Permanent</option>
                                    <option value="Contractual">Contractual</option>
                                </select>
                            </div>

                            {employmentStatus === "Contractual" && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Contract Expiry
                                    </label>
                                    <input
                                        type="date"
                                        value={contractExpiry}
                                        onChange={(e) => setContractExpiry(e.target.value)}
                                        className="input"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Section: Access */}
                        <SectionTitle>System Access</SectionTitle>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Line Manager
                                </label>
                                <input
                                    type="text"
                                    value="Auto-filled from CIF"
                                    readOnly
                                    className="input bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Requested Access
                                </label>
                                <input
                                    type="text"
                                    placeholder="Auto-suggested"
                                    className="input"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Access Type
                                </label>
                                <select required className="input">
                                    <option value="">Select</option>
                                    <option value="Viewer">Viewer</option>
                                    <option value="Editor">Editor</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        {/* Section: Justification */}
                        <SectionTitle>Additional Info</SectionTitle>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Justification
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Why is access required?"
                                    required
                                    className="input resize-none"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Upload Supporting Document
                                </label>
                                <input
                                    type="file"
                                    className="block w-full text-sm text-gray-700"
                                />
                            </div>
                        </div>

                        <div className="text-right mt-6">
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
    );
};

export default UserAccountForm;
