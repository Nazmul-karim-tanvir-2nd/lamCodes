import FloatingInput from "../../components/custom/FloatingInput";
import { SectionTitle } from "../../components/SectionTitle";
import { RiKey2Fill } from "react-icons/ri";
import useUserTransfer from "../../store/useUserTransfer";

const AccessChangeInstructions = () => {
    const { formData, updateField } = useUserTransfer();

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateField(name, value);
    };

    return (
        <>
            <SectionTitle className="mb-3">
                <RiKey2Fill className="w-5 h-5 text-red-600 mr-2" />
                Access Change Instructions
            </SectionTitle>

            <section className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 shadow">
                <FloatingInput label="Revoke Existing Software Access" name="revokeSoftware" value={formData.revokeSoftware} onChange={handleChange} />
                <FloatingInput label="Revoke Existing Device Access" name="revokeDevice" value={formData.revokeDevice} onChange={handleChange} />
                <FloatingInput label="Assign New Role-Based Access (Auto from Matrix)" name="autoAssignAccess" value={formData.autoAssignAccess} onChange={handleChange} />
                <FloatingInput label="Remarks (if any)" name="accessRemarks" value={formData.accessRemarks} onChange={handleChange} />
            </section>
        </>
    );
};

export default AccessChangeInstructions;