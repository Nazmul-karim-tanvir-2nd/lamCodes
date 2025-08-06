import { SectionTitle } from '../../components/SectionTitle';
import FloatingInput from '../../components/custom/FloatingInput';
import { Info } from 'lucide-react';

const MetadataSection = ({ formData, handleChange }) => {
    const isEditable = formData.biometricStatus?.toLowerCase() === 'verified';

    return (
        <>
            <SectionTitle>
                <Info className="w-5 h-5 text-red-600 mr-2" />
                Approval & Submission Info
            </SectionTitle>

            <div className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-y-2 gap-x-4 md:gap-x-8 mb-8 shadow">
                <FloatingInput label="Requested By" name="requestedBy" value={formData.requestedBy} onChange={handleChange} disabled={!isEditable} />
                <FloatingInput label="Request Date" name="requestDate" type="date" value={formData.requestDate} onChange={handleChange} disabled />
                <FloatingInput label="Approval Status" name="approvalStatus" value={formData.approvalStatus} onChange={handleChange} disabled />
            </div>
        </>
    );
};

export default MetadataSection;