import FloatingInput from "../../components/custom/FloatingInput";
import { SectionTitle } from "../../components/SectionTitle";
import { Info } from "lucide-react";
import useUserFormStore from "../../store/useUserFormStore";

const ApprovalSubmissionInfo = () => {
    const { formData, updateField } = useUserFormStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateField(name, value);
    };

    return (
        <>
            <SectionTitle className="mb-3">
                <Info className="w-5 h-5 text-red-600 mr-2" />
                Approval & Submission Info
            </SectionTitle>

            <section className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 shadow">
                <FloatingInput label="Requested By" name="requestedBy" value={formData.requestedBy} onChange={handleChange} />
                <FloatingInput label="Request Date" name="requestDate" type="date" value={formData.requestDate} disabled />
                <FloatingInput label="Line Manager Approval Status" name="lineManagerApproval" value={formData.lineManagerApproval} onChange={handleChange} />
                <FloatingInput label="Department Head / HR Approval Status" name="hrApproval" value={formData.hrApproval} onChange={handleChange} />
                <FloatingInput label="IT/Admin Final Action Status" name="itFinalAction" value={formData.itFinalAction} onChange={handleChange} />
            </section>
        </>
    );
};

export default ApprovalSubmissionInfo;