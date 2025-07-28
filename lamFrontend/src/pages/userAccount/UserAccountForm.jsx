import { useState } from "react";

const SectionTitle = ({ children }) => (
    <h2 className="text-lg font-semibold text-cyan-700 mb-4 mt-6 px-2 border-b border-cyan-300">
        {children}
    </h2>
);

const InputWrapper = ({ label, children }) => (
    <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
        {children}
    </div>
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
        <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen px-6 py-10 text-gray-900 font-sans">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8 border border-gray-200">
                <h1 className="text-2xl font-bold text-center text-indigo-600 mb-8">
                    📝 New User Account Opening Form
                </h1>

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Section: Basic Information */}
                    <div>
                        <SectionTitle>Basic Information</SectionTitle>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InputWrapper label="CIF/NID">
                                <input
                                    type="text"
                                    value={cif}
                                    onChange={(e) => setCif(e.target.value)}
                                    placeholder="Enter CIF/NID"
                                    required
                                    className="input"
                                />
                            </InputWrapper>

                            <InputWrapper label="Name">
                                <input
                                    type="text"
                                    value={name}
                                    readOnly
                                    className="input bg-gray-100 cursor-not-allowed"
                                />
                            </InputWrapper>

                            <InputWrapper label="Mobile">
                                <input
                                    type="text"
                                    value={mobile}
                                    readOnly
                                    className="input bg-gray-100 cursor-not-allowed"
                                />
                            </InputWrapper>
                        </div>
                    </div>

                    {/* Section: Verification */}
                    <div>
                        <SectionTitle>Verification</SectionTitle>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputWrapper label="Biometric Verified">
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
                            </InputWrapper>
                        </div>
                    </div>

                    {/* Section: Employment Information */}
                    <div>
                        <SectionTitle>Employment Information</SectionTitle>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InputWrapper label="Joining Date">
                                <input type="date" required className="input" />
                            </InputWrapper>

                            <InputWrapper label="Department">
                                <input type="text" required placeholder="e.g. IT" className="input" />
                            </InputWrapper>

                            <InputWrapper label="Branch">
                                <input type="text" required className="input" />
                            </InputWrapper>

                            <InputWrapper label="Role">
                                <input type="text" required className="input" />
                            </InputWrapper>

                            <InputWrapper label="Employment Status">
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
                            </InputWrapper>

                            {employmentStatus === "Contractual" && (
                                <InputWrapper label="Contract Expiry">
                                    <input
                                        type="date"
                                        value={contractExpiry}
                                        onChange={(e) => setContractExpiry(e.target.value)}
                                        className="input"
                                    />
                                </InputWrapper>
                            )}
                        </div>
                    </div>

                    {/* Section: System Access */}
                    <div>
                        <SectionTitle>System Access</SectionTitle>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InputWrapper label="Line Manager">
                                <input
                                    type="text"
                                    value="Auto-filled from CIF"
                                    readOnly
                                    className="input bg-gray-100 cursor-not-allowed"
                                />
                            </InputWrapper>

                            <InputWrapper label="Requested Access">
                                <input
                                    type="text"
                                    placeholder="Auto-suggested"
                                    className="input"
                                />
                            </InputWrapper>

                            <InputWrapper label="Access Type">
                                <select required className="input">
                                    <option value="">Select</option>
                                    <option value="Viewer">Viewer</option>
                                    <option value="Editor">Editor</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </InputWrapper>
                        </div>
                    </div>

                    {/* Section: Justification */}
                    <div>
                        <SectionTitle>Additional Info</SectionTitle>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputWrapper label="Justification">
                                <textarea
                                    rows={4}
                                    placeholder="Why is access required?"
                                    required
                                    className="input resize-none"
                                ></textarea>
                            </InputWrapper>

                            <InputWrapper label="Upload Supporting Document">
                                <input
                                    type="file"
                                    className="block w-full text-sm text-gray-700"
                                />
                            </InputWrapper>
                        </div>
                    </div>

                    <div className="text-right mt-8">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-8 py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
                        >
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserAccountForm;