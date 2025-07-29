import useUserFormStore from '../../store/useUserFormStore';
import { useState, useEffect } from 'react';
import dummyUsers from '../../data/dummyUser';

const Input = ({ label, name, type = 'text', value, onChange, disabled = false }) => (
    <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="p-2 border rounded bg-white shadow-sm outline-none focus:ring-2 focus:ring-purple-400"
        />
    </div>
);

const SectionTitle = ({ children }) => (
    <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-indigo-500 pl-3 my-6">
        {children}
    </h2>
);

const UserAccountForm = () => {
    const { formData, updateField } = useUserFormStore();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (e.target.type === 'file') {
            updateField(name, files[0]);
        } else {
            updateField(name, value);
        }
    };

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        updateField("requestDate", today);
    }, [updateField]);

    const handleCIFSearch = () => {
        const match = dummyUsers.find((u) => u.cif === formData.cif);
        if (match) {
            updateField("name", match.name);
            updateField("mobile", match.mobile);
            updateField("gender", match.gender);
            updateField("bloodGroup", match.bloodGroup);
            updateField("emergencyContact", match.emergencyContact);
            updateField("biometricStatus", match.biometricStatus);
        } else {
            alert("No user found with this CIF");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
        alert("Form submitted! Check console for full data.");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full p-10">
            <h1 className="text-2xl font-bold text-center text-blue-800 mb-10">
                New User Account Opening Request
            </h1>

            {/* Employee Information */}
            <SectionTitle>Employee Information</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 flex gap-4">
                    <div className="flex-1">
                        <Input label="CIF/NID" name="cif" value={formData.cif} onChange={handleChange} />
                    </div>
                    <button
                        type="button"
                        onClick={handleCIFSearch}
                        className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
                    >
                        Search
                    </button>
                </div>

                <Input label="Name" name="name" value={formData.name} onChange={handleChange} disabled />
                <Input label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} disabled />
                <Input label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
                <Input label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
                <Input
                    label="Emergency Contact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                />
                <Input
                    label="Biometric Status (Pending / Verified)"
                    name="biometricStatus"
                    value={formData.biometricStatus}
                    onChange={handleChange}
                />
                <Input
                    label="Joining Date"
                    name="joiningDate"
                    type="date"
                    value={formData.joiningDate}
                    onChange={handleChange}
                />

                {formData.biometricStatus === 'Pending' && (
                    <div className="md:col-span-2 bg-red-100 text-red-700 p-4 rounded border border-red-300">
                        ⚠️ Biometric verification is pending. Access will be restricted until verification is complete.
                    </div>
                )}
            </div>

            {/* Department & Role */}
            <SectionTitle>Department & Role Details</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Department" name="department" value={formData.department} onChange={handleChange} />
                <Input label="Division" name="division" value={formData.division} onChange={handleChange} />
                <Input label="Branch" name="branch" value={formData.branch} onChange={handleChange} />
                <Input label="Designation" name="designation" value={formData.designation} onChange={handleChange} />

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Employment Status</label>
                    <div className="flex gap-6">
                        <label>
                            <input
                                type="radio"
                                name="employmentStatus"
                                value="Permanent"
                                checked={formData.employmentStatus === 'Permanent'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Permanent
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="employmentStatus"
                                value="Contractual"
                                checked={formData.employmentStatus === 'Contractual'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Contractual
                        </label>
                    </div>
                </div>

                {formData.employmentStatus === 'Contractual' && (
                    <Input
                        label="Contract Expiry Date"
                        name="contractExpiry"
                        type="date"
                        value={formData.contractExpiry}
                        onChange={handleChange}
                    />
                )}

                <Input
                    label="Line Manager CIF"
                    name="lineManagerCIF"
                    value={formData.lineManagerCIF}
                    onChange={handleChange}
                />
            </div>

            {/* Access Requirements */}
            <SectionTitle>Access Requirements</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Requested Systems / Software"
                    name="requestedSystems"
                    value={formData.requestedSystems}
                    onChange={handleChange}
                />
                <Input
                    label="Role-Based Access Type"
                    name="accessType"
                    value={formData.accessType}
                    onChange={handleChange}
                />
                <Input
                    label="Justification / Purpose"
                    name="justification"
                    value={formData.justification}
                    onChange={handleChange}
                />
                <Input
                    label="Role Designation"
                    name="roleDesignation"
                    value={formData.roleDesignation}
                    onChange={handleChange}
                />
            </div>

            {/* Additional Notes */}
            <SectionTitle>Additional Notes / Attachments</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Remarks / Special Instructions"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                />
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Upload Supporting Documents</label>
                    <input
                        type="file"
                        name="documents"
                        onChange={handleChange}
                        className="p-2 border rounded-lg bg-white shadow-sm"
                    />
                </div>
            </div>

            {/* Footer / Metadata */}
            <SectionTitle>Form Metadata</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Requested By"
                    name="requestedBy"
                    value={formData.requestedBy}
                    onChange={handleChange}
                />
                <Input
                    label="Request Date"
                    name="requestDate"
                    type="date"
                    value={formData.requestDate}
                    onChange={handleChange}
                />
                <Input
                    label="Approval Status"
                    name="approvalStatus"
                    value={formData.approvalStatus}
                    onChange={handleChange}
                    disabled
                />
            </div>

            {/* Submit Button */}
            <div className="mt-10 text-center">
                <button
                    type="submit"
                    className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg shadow hover:bg-purple-700 transition-all"
                >
                    Submit Request
                </button>
            </div>
        </form>
    );
};

export default UserAccountForm;