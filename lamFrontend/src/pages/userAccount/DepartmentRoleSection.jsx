import { SectionTitle } from '../../components/SectionTitle';
import FloatingInput from '../../components/custom/FloatingInput';
import FloatingCheckbox from '../../components/custom/FloatingCheckbox';
import { Building2 } from 'lucide-react';

const RequiredLabel = ({ children }) => (
    <span>{children} <span className="text-red-600">*</span></span>
);

const DepartmentRoleSection = ({ formData, handleChange, updateField }) => {
    const isEditable = formData.biometricStatus?.toLowerCase() === 'verified';

    return (
        <>
            <SectionTitle>
                <Building2 className="w-5 h-5 text-red-600 mr-2" />
                Department & Role Details
            </SectionTitle>

            <div className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-y-2 gap-x-4 md:gap-x-8 mb-14 shadow">
                <FloatingInput label={<RequiredLabel>Department</RequiredLabel>} name="department" value={formData.department} onChange={handleChange} disabled={!isEditable} />
                <FloatingInput label={<RequiredLabel>Division</RequiredLabel>} name="division" value={formData.division} onChange={handleChange} disabled={!isEditable} />
                <FloatingInput label={<RequiredLabel>Branch</RequiredLabel>} name="branch" value={formData.branch} onChange={handleChange} disabled={!isEditable} />
                <FloatingInput label={<RequiredLabel>Designation</RequiredLabel>} name="designation" value={formData.designation} onChange={handleChange} disabled={!isEditable} />

                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatingCheckbox
                        label="Permanent Employment"
                        name="employmentStatusPermanent"
                        checked={formData.employmentStatus === "Permanent"}
                        onChange={(e) => updateField("employmentStatus", e.target.checked ? "Permanent" : "")}
                        disabled={!isEditable}
                    />
                    <FloatingCheckbox
                        label="Contractual Employment"
                        name="employmentStatusContractual"
                        checked={formData.employmentStatus === "Contractual"}
                        onChange={(e) => updateField("employmentStatus", e.target.checked ? "Contractual" : "")}
                        disabled={!isEditable}
                    />
                </div>

                {formData.employmentStatus === 'Contractual' && (
                    <FloatingInput
                        label={<RequiredLabel>Contract Expiry Date</RequiredLabel>}
                        name="contractExpiry"
                        type="date"
                        value={formData.contractExpiry}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                )}

                <FloatingInput label="Line Manager CIF" name="lineManagerCIF" value={formData.lineManagerCIF} onChange={handleChange} disabled={!isEditable} />
            </div>
        </>
    );
};

export default DepartmentRoleSection;