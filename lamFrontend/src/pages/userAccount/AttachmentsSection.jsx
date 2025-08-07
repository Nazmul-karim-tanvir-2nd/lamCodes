import { SectionTitle } from '../../components/SectionTitle';
import FloatingInput from '../../components/custom/FloatingInput';
import { FileText } from 'lucide-react';

const AttachmentsSection = ({ formData, handleChange }) => {
    const isEditable = formData.biometricStatus?.toLowerCase() === 'verified';

    return (
        <>
            <SectionTitle>
                <FileText className="w-5 h-5 text-red-600 mr-2" />
                Additional Notes / Attachments
            </SectionTitle>

            <div className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-6 gap-x-4 md:gap-x-8 mb-8 shadow">
                <FloatingInput
                    label="Remarks / Special Instructions"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    disabled={!isEditable}
                />
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Upload Supporting Documents</label>
                    <input
                        type="file"
                        name="documents"
                        onChange={handleChange}
                        className="p-2 border rounded-lg bg-white shadow-sm"
                        disabled={!isEditable}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Formats: PDF, DOC, JPG, PNG.
                    </p>
                </div>
            </div>
        </>
    );
};

export default AttachmentsSection;