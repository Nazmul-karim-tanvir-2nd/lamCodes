import { useEffect } from 'react';
import { SectionTitle } from '../../components/SectionTitle';
import FloatingSelect from '../../components/custom/FloatingSelect';
import FloatingInput from '../../components/custom/FloatingInput';
import FloatingCheckbox from '../../components/custom/FloatingCheckbox';
import { Building2 } from 'lucide-react';

// Dummy Line Manager Data2
const lineManagers = [
    {
        cif: '111111',
        name: 'Jishan Rahman',
        mobile: '01900112233',
        designation: 'Senior Manager',
    },
    {
        cif: '222222',
        name: 'Tahsin Ahmed',
        mobile: '01711223344',
        designation: 'Assistant Manager',
    },
];

const RequiredLabel = ({ children }) => (
    <span>
        {children} <span className="text-red-600">*</span>
    </span>
);

const DepartmentRoleSection = ({
    formData,
    handleChange,
    updateField,
    departmentOptions = [],
    divisionOptions = [],
    branchOptions = [],
    designationOptions = [],
}) => {
    const isEditable = formData.biometricStatus?.toLowerCase() === 'verified';

    // Auto-fill fields based on Line Manager CIF
    useEffect(() => {
        const manager = lineManagers.find((m) => m.cif === formData.lineManagerCIF);
        if (manager) {
            updateField('lineManagerName', manager.name);
            updateField('lineManagerMobile', manager.mobile);
            updateField('lineManagerDesignation', manager.designation);
        } else {
            // Clear fields if no match
            updateField('lineManagerName', '');
            updateField('lineManagerMobile', '');
            updateField('lineManagerDesignation', '');
        }
    }, [formData.lineManagerCIF]);

    return (
        <>
            <SectionTitle>
                <Building2 className="w-5 h-5 text-red-600 mr-2" />
                Department & Role Details
            </SectionTitle>

            <div className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-y-2 gap-x-4 md:gap-x-8 mb-8 shadow">

                {/* Select fields */}
                <FloatingSelect
                    label={<RequiredLabel>Department</RequiredLabel>}
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    options={departmentOptions}
                    disabled={!isEditable}
                />
                <FloatingSelect
                    label={<RequiredLabel>Division</RequiredLabel>}
                    name="division"
                    value={formData.division}
                    onChange={handleChange}
                    options={divisionOptions}
                    disabled={!isEditable}
                />
                <FloatingSelect
                    label={<RequiredLabel>Branch</RequiredLabel>}
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    options={branchOptions}
                    disabled={!isEditable}
                />
                <FloatingSelect
                    label={<RequiredLabel>Designation</RequiredLabel>}
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    options={designationOptions}
                    disabled={!isEditable}
                />

                {/* Employment Type */}
                <div className="md:col-span-3">
                    <h3
                        className={`inline-block px-3 py-1 rounded mb-2
      ${formData.employmentStatus ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                    >
                        Select Employment Type
                    </h3>

                    <div className="flex flex-col gap-1 pl-8 sm:pl-16">
                        <FloatingCheckbox
                            label="Permanent Employment"
                            name="employmentStatusPermanent"
                            checked={formData.employmentStatus === 'Permanent'}
                            onChange={(e) =>
                                updateField('employmentStatus', e.target.checked ? 'Permanent' : '')
                            }
                            disabled={!isEditable}
                        />
                        <FloatingCheckbox
                            label="Contractual Employment"
                            name="employmentStatusContractual"
                            checked={formData.employmentStatus === 'Contractual'}
                            onChange={(e) =>
                                updateField('employmentStatus', e.target.checked ? 'Contractual' : '')
                            }
                            disabled={!isEditable}
                        />
                    </div>
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

                {/* Line Manager CIF + Auto fields */}
                <FloatingInput
                    label="Line Manager CIF"
                    name="lineManagerCIF"
                    value={formData.lineManagerCIF}
                    onChange={handleChange}
                    disabled={!isEditable}
                />
                <FloatingInput
                    label="Line Manager Name"
                    name="lineManagerName"
                    value={formData.lineManagerName || ''}
                    onChange={handleChange}
                    disabled
                />
                <FloatingInput
                    label="Line Manager Mobile"
                    name="lineManagerMobile"
                    value={formData.lineManagerMobile || ''}
                    onChange={handleChange}
                    disabled
                />
                <FloatingInput
                    label="Line Manager Designation"
                    name="lineManagerDesignation"
                    value={formData.lineManagerDesignation || ''}
                    onChange={handleChange}
                    disabled
                />
            </div>
        </>
    );
};

export default DepartmentRoleSection;