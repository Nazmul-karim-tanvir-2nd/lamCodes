import useUserFormStore from '../../store/useUserFormStore';
import { useEffect } from 'react';
import dummyUsers from '../../data/dummyUser';
import FloatingInput from '../../components/FloatingInput';
import FloatingCheckbox from '../../components/custom/FloatingCheckbox';
import FloatingSelect from '../../components/custom/FloatingSelect';
import { SectionTitle } from '../../components/SectionTitle';
import { Button } from '../../components/ui/Button';
import {
    User,
    Building2,
    KeyRound,
    FileText,
    Info,
    Search
} from 'lucide-react';

const RequiredLabel = ({ children }) => (
    <span>
        {children} <span className="text-red-600">*</span>
    </span>
);

const UserAccountForm = () => {
    const { formData, updateField } = useUserFormStore();

    const handleChange = (e) => {
        const { name, value, files, type, checked } = e.target;
        if (type === 'file') {
            updateField(name, files[0]);
        } else if (type === 'checkbox') {
            updateField(name, checked);
        } else {
            updateField(name, value);
        }
    };

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        updateField("requestDate", today);
        updateField("approvalStatus", "Pending");
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
        <form
            onSubmit={handleSubmit}
            className="w-full p-2 sm:p-2 space-y-2"
        >

            <h1 className="text-2xl font-semibold text-center text-blue-800 mb-8 border-b border-red-200 pb-4">
                New User Account Opening Request
            </h1>

            {/* Basic Information */}
            <SectionTitle>
                <User className="w-5 h-5 text-red-600 mr-2" />
                Basic Information
            </SectionTitle>
            <div className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-y-2 gap-x-4 md:gap-x-8 mb-14 shadow">
                <div className="md:col-span-2 flex gap-4">
                    <FloatingInput
                        label={<RequiredLabel>CIF/NID</RequiredLabel>}
                        name="cif"
                        value={formData.cif}
                        onChange={handleChange}
                    />
                    <Button
                        type="button"
                        onClick={handleCIFSearch}
                        className="self-end bg-red-600/80 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
                    >
                        <Search className="mr-1" /> Search
                    </Button>
                </div>

                <FloatingInput label={<RequiredLabel>Name</RequiredLabel>} name="name" value={formData.name} onChange={handleChange} disabled />
                <FloatingInput label={<RequiredLabel>Mobile</RequiredLabel>} name="mobile" value={formData.mobile} onChange={handleChange} disabled />

                <FloatingSelect
                    label={<RequiredLabel>Gender</RequiredLabel>}
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    options={[
                        { label: "Male", value: "Male" },
                        { label: "Female", value: "Female" },
                        { label: "Other", value: "Other" },
                    ]}
                />

                <FloatingInput label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
                <FloatingInput label="Emergency Contact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />
                <FloatingInput label="Biometric Status (Pending / Verified)" name="biometricStatus" value={formData.biometricStatus} onChange={handleChange} disabled />
                <FloatingInput label={<RequiredLabel>Joining Date</RequiredLabel>} name="joiningDate" type="date" value={formData.joiningDate} onChange={handleChange} />

                {formData.biometricStatus?.toLowerCase() === 'pending' && (
                    <div className="md:col-span-3 bg-red-100 text-red-700 p-4 rounded border border-red-300">
                        ⚠️ Biometric verification is pending. Access will be restricted until verification is complete.
                    </div>
                )}
            </div>

            {/* Department & Role Details */}
            <SectionTitle>
                <Building2 className="w-5 h-5 text-red-600 mr-2" />
                Department & Role Details
            </SectionTitle>
            <div className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-y-2 gap-x-4 md:gap-x-8 mb-14 shadow">
                <FloatingInput label={<RequiredLabel>Department</RequiredLabel>} name="department" value={formData.department} onChange={handleChange} />
                <FloatingInput label={<RequiredLabel>Division</RequiredLabel>} name="division" value={formData.division} onChange={handleChange} />
                <FloatingInput label={<RequiredLabel>Branch</RequiredLabel>} name="branch" value={formData.branch} onChange={handleChange} />
                <FloatingInput label={<RequiredLabel>Designation</RequiredLabel>} name="designation" value={formData.designation} onChange={handleChange} />

                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatingCheckbox
                        label="Permanent Employment"
                        name="employmentStatusPermanent"
                        checked={formData.employmentStatus === "Permanent"}
                        onChange={(e) =>
                            updateField("employmentStatus", e.target.checked ? "Permanent" : "")
                        }
                    />
                    <FloatingCheckbox
                        label="Contractual Employment"
                        name="employmentStatusContractual"
                        checked={formData.employmentStatus === "Contractual"}
                        onChange={(e) =>
                            updateField("employmentStatus", e.target.checked ? "Contractual" : "")
                        }
                    />
                </div>

                {formData.employmentStatus === 'Contractual' && (
                    <FloatingInput
                        label={<RequiredLabel>Contract Expiry Date</RequiredLabel>}
                        name="contractExpiry"
                        type="date"
                        value={formData.contractExpiry}
                        onChange={handleChange}
                    />
                )}

                <FloatingInput label="Line Manager CIF" name="lineManagerCIF" value={formData.lineManagerCIF} onChange={handleChange} />
            </div>

            {/* Access Requirements */}
            <SectionTitle>
                <KeyRound className="w-5 h-5 text-red-600 mr-2" />
                Access Requirements
            </SectionTitle>
            <div className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-y-2 gap-x-4 md:gap-x-8 mb-14 shadow">
                <FloatingInput label={<RequiredLabel>Requested Systems / Software</RequiredLabel>} name="requestedSystems" value={formData.requestedSystems} onChange={handleChange} />
                <FloatingInput label={<RequiredLabel>Role-Based Access Type</RequiredLabel>} name="accessType" value={formData.accessType} onChange={handleChange} />
                <FloatingInput label={<RequiredLabel>Justification / Purpose</RequiredLabel>} name="justification" value={formData.justification} onChange={handleChange} />
                <FloatingInput label="Role Designation" name="roleDesignation" value={formData.roleDesignation} onChange={handleChange} />
            </div>

            {/* Additional Notes / Attachments */}
            <SectionTitle>
                <FileText className="w-5 h-5 text-red-600 mr-2" />
                Additional Notes / Attachments
            </SectionTitle>
            <div className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-6 gap-x-4 md:gap-x-8 mb-14 shadow">
                <FloatingInput label="Remarks / Special Instructions" name="remarks" value={formData.remarks} onChange={handleChange} />
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Upload Supporting Documents
                    </label>
                    <input
                        type="file"
                        name="documents"
                        onChange={handleChange}
                        className="p-2 border rounded-lg bg-white shadow-sm"
                    />
                </div>
            </div>

            {/* Form Metadata */}
            <SectionTitle>
                <Info className="w-5 h-5 text-red-600 mr-2" />
                Submitted by
            </SectionTitle>
            <div className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-y-2 gap-x-4 md:gap-x-8 mb-14 shadow">
                <FloatingInput label="Requested By" name="requestedBy" value={formData.requestedBy} onChange={handleChange} />
                <FloatingInput label="Request Date" name="requestDate" type="date" value={formData.requestDate} onChange={handleChange} />
                <FloatingInput label="Approval Status" name="approvalStatus" value={formData.approvalStatus} onChange={handleChange} disabled />
            </div>

            {/* Submit Button */}
            <div className="text-center">
                <Button
                    type="submit"
                    size="lg"
                    className="px-12 bg-red-600/80 hover:bg-red-700 text-white rounded-md transition"
                >
                    Submit Request
                </Button>
            </div>
        </form>
    );
};

export default UserAccountForm;
