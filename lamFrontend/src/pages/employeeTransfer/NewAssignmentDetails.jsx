import FloatingInput from "../../components/custom/FloatingInput";
import { SectionTitle } from "../../components/SectionTitle";
import { MdAssignment } from "react-icons/md";
import useUserFormStore from "../../store/useUserFormStore";

const NewAssignmentDetails = () => {
    const { formData, updateField } = useUserFormStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateField(name, value);
    };

    return (
        <>
            <SectionTitle className="mb-3">
                <MdAssignment className="w-5 h-5 text-red-600 mr-2" />
                New Assignment Details
            </SectionTitle>

            <section className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 shadow">
                <FloatingInput label="New Department" name="newDepartment" value={formData.newDepartment} onChange={handleChange} />
                <FloatingInput label="New Branch" name="newBranch" value={formData.newBranch} onChange={handleChange} />
                <FloatingInput label="New Line Manager" name="newLineManager" value={formData.newLineManager} onChange={handleChange} />
                <FloatingInput label="Effective Date of Transfer" name="effectiveDate" type="date" value={formData.effectiveDate} onChange={handleChange} />
                <FloatingInput label="Reason for Transfer (Optional)" name="reason" value={formData.reason} onChange={handleChange} />
                <FloatingInput label="Remarks (if any)" name="newRemarks" value={formData.newRemarks} onChange={handleChange} />
            </section>
        </>
    );
};

export default NewAssignmentDetails;