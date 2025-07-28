import { useState } from "react";

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
        <div className="bg-gray-50 w-full min-h-screen pt-6 px-6 text-gray-900">
            <h1 className="text-2xl font-bold text-indigo-700 mb-8 tracking-wide">
                📝 New User Account Opening Request
            </h1>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
            >
                {/* CIF */}
                <div>
                    <label className="block mb-1 font-semibold">Employee CIF/NID</label>
                    <input
                        type="text"
                        value={cif}
                        onChange={(e) => setCif(e.target.value)}
                        placeholder="Enter CIF/NID"
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Name */}
                <div>
                    <label className="block mb-1 font-semibold">Name</label>
                    <input
                        type="text"
                        value={name}
                        readOnly
                        className="w-full border border-gray-300 bg-gray-100 rounded-md px-3 py-2 cursor-not-allowed"
                    />
                </div>

                {/* Mobile */}
                <div>
                    <label className="block mb-1 font-semibold">Mobile</label>
                    <input
                        type="text"
                        value={mobile}
                        readOnly
                        className="w-full border border-gray-300 bg-gray-100 rounded-md px-3 py-2 cursor-not-allowed"
                    />
                </div>

                {/* Biometric */}
                <div>
                    <label className="block mb-1 font-semibold">Biometric Verified</label>
                    <select
                        value={biometric}
                        onChange={(e) => setBiometric(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    {biometric === "No" && (
                        <p className="mt-1 text-red-600 font-semibold">Access Restricted</p>
                    )}
                </div>

                {/* Conditional fields */}
                {biometric === "Yes" && (
                    <>
                        <div>
                            <label className="block mb-1 font-semibold">Joining Date</label>
                            <input
                                type="date"
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Department</label>
                            <input
                                type="text"
                                placeholder="e.g. IT, HR"
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Branch</label>
                            <input
                                type="text"
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Role</label>
                            <input
                                type="text"
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Employment Status</label>
                            <select
                                value={employmentStatus}
                                onChange={(e) => setEmploymentStatus(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select</option>
                                <option value="Permanent">Permanent</option>
                                <option value="Contractual">Contractual</option>
                            </select>
                        </div>

                        {employmentStatus === "Contractual" && (
                            <div>
                                <label className="block mb-1 font-semibold">
                                    Contract Expiry Date
                                </label>
                                <input
                                    type="date"
                                    value={contractExpiry}
                                    onChange={(e) => setContractExpiry(e.target.value)}
                                    required
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block mb-1 font-semibold">Line Manager</label>
                            <input
                                type="text"
                                value="Auto-filled from CIF"
                                readOnly
                                className="w-full border border-gray-300 bg-gray-100 rounded-md px-3 py-2 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Requested Systems Access</label>
                            <input
                                type="text"
                                placeholder="Auto-suggest by department"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Access Type</label>
                            <select
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select</option>
                                <option value="Viewer">Viewer</option>
                                <option value="Editor">Editor</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block mb-1 font-semibold">Justification for Access</label>
                            <textarea
                                rows={3}
                                placeholder="Why is access required?"
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                            ></textarea>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block mb-1 font-semibold">
                                Additional Notes / Upload Documents
                            </label>
                            <input
                                type="file"
                                className="block w-full text-sm text-gray-700 cursor-pointer"
                            />
                        </div>

                        <div className="md:col-span-2 text-right mt-4">
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-700 transition"
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
