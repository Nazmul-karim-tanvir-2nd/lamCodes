// src/pages/userAccount/UserAccountForm.jsx
import useUserFormStore from '../../store/useUserFormStore';
import { useEffect } from 'react';
import dummyUsers from '../../data/dummyUser';
import FloatingInput from '../../components/FloatingInput';
import { SectionTitle } from '../../components/SectionTitle';
import { Search } from 'lucide-react';

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
        <form onSubmit={handleSubmit} className="w-full p-4 sm:p-10">
            <h1 className="text-lg sm:text-2xl font-bold text-center text-blue-800 mb-6 sm:mb-10 border-b-2 border-blue-200 pb-2">
                New User Account Opening Request
            </h1>

            {/* Employee Information */}
            <SectionTitle>Employee Information</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                <div className="md:col-span-2 flex flex-col sm:flex-row items-stretch gap-3">
                    <div className="flex-1">
                        <FloatingInput
                            label="CIF/NID"
                            name="cif"
                            value={formData.cif}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleCIFSearch}
                        className="mt-2 sm:mt-6 inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all"
                        aria-label="Search CIF"
                    >
                        <Search />
                    </button>
                </div>

                <FloatingInput label="Name" name="name" value={formData.name} onChange={handleChange} disabled />
                <FloatingInput label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} disabled />
                <FloatingInput label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
                <FloatingInput label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
                <FloatingInput label="Emergency Contact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />
                <FloatingInput label="Biometric Status (Pending / Verified)" name="biometricStatus" value={formData.biometricStatus} onChange={handleChange} />
                <FloatingInput label="Joining Date" name="joiningDate" type="date" value={formData.joiningDate} onChange={handleChange} />

                {formData.biometricStatus === 'Pending' && (
                    <div className="md:col-span-2 bg-red-100 text-red-700 p-4 rounded border border-red-300">
                        ⚠️ Biometric verification is pending. Access will be restricted until verification is complete.
                    </div>
                )}
            </div>

            {/* Department & Role Details */}
            <SectionTitle>Department & Role Details</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                <FloatingInput label="Department" name="department" value={formData.department} onChange={handleChange} />
                <FloatingInput label="Division" name="division" value={formData.division} onChange={handleChange} />
                <FloatingInput label="Branch" name="branch" value={formData.branch} onChange={handleChange} />
                <FloatingInput label="Designation" name="designation" value={formData.designation} onChange={handleChange} />

                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-2">Employment Status</label>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <label className="flex items-center">
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
                        <label className="flex items-center">
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
                    <FloatingInput label="Contract Expiry Date" name="contractExpiry" type="date" value={formData.contractExpiry} onChange={handleChange} />
                )}

                <FloatingInput label="Line Manager CIF" name="lineManagerCIF" value={formData.lineManagerCIF} onChange={handleChange} />
            </div>

            {/* Access Requirements */}
            <SectionTitle>Access Requirements</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                <FloatingInput label="Requested Systems / Software" name="requestedSystems" value={formData.requestedSystems} onChange={handleChange} />
                <FloatingInput label="Role-Based Access Type" name="accessType" value={formData.accessType} onChange={handleChange} />
                <FloatingInput label="Justification / Purpose" name="justification" value={formData.justification} onChange={handleChange} />
                <FloatingInput label="Role Designation" name="roleDesignation" value={formData.roleDesignation} onChange={handleChange} />
            </div>

            {/* Additional Notes */}
            <SectionTitle>Additional Notes / Attachments</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                <FloatingInput label="Remarks / Special Instructions" name="remarks" value={formData.remarks} onChange={handleChange} />
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

            {/* Metadata */}
            <SectionTitle>Form Metadata</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                <FloatingInput label="Requested By" name="requestedBy" value={formData.requestedBy} onChange={handleChange} />
                <FloatingInput label="Request Date" name="requestDate" type="date" value={formData.requestDate} onChange={handleChange} />
                <FloatingInput label="Approval Status" name="approvalStatus" value={formData.approvalStatus} onChange={handleChange} disabled />
            </div>

            {/* Submit */}
            <div className="mt-10 text-center">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg shadow hover:bg-blue-700 transition-all"
                >
                    Submit Request
                </button>
            </div>
        </form>
    );
};

export default UserAccountForm;