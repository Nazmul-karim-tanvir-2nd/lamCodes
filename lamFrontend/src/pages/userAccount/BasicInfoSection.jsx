import { SectionTitle } from '../../components/SectionTitle';
import FloatingInput from '../../components/custom/FloatingInput';
import FloatingSelect from '../../components/custom/FloatingSelect';
import { Button } from '../../components/ui/Button';
import { Check, Info, Search, User } from 'lucide-react';

const RequiredLabel = ({ children }) => (
    <span>{children} <span className="text-red-600">*</span></span>
);

const BasicInfoSection = ({ formData, handleChange, handleCIFSearch }) => {
    const isBiometricPending = formData.biometricStatus?.toLowerCase() === 'pending';
    const isBiometricVerified = formData.biometricStatus?.toLowerCase() === 'verified';

    return (
        <>
            <SectionTitle>
                <User className="w-5 h-5 text-red-600 mr-2" />
                Basic Information
            </SectionTitle>

            <div className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-y-2 gap-x-4 md:gap-x-8 mb-14 shadow">
                <div className="md:col-span-1 flex gap-4">
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
                        <Search className="mr-1" />
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

                {isBiometricPending && (
                    <div className="md:col-span-3 flex items-center gap-3 bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg shadow-sm justify-center">
                        <Info className="w-5 h-5 shrink-0" />
                        <span className="text-sm md:text-base font-medium">
                            Biometric verification is <strong>pending</strong>. Access to other form sections is restricted until verification is complete.
                        </span>
                    </div>
                )}

                {isBiometricVerified && (
                    <div className="md:col-span-3 flex items-center gap-3 bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg shadow-sm justify-center">
                        <Check className="w-5 h-5 shrink-0" />
                        <span className="text-sm md:text-base font-medium">
                            Biometric verification is <strong>verified</strong>. Access to other form sections is granted.
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};

export default BasicInfoSection;