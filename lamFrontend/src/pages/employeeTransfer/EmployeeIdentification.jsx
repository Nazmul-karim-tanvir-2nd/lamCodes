import FloatingInput from "../../components/custom/FloatingInput";
import { SectionTitle } from "../../components/SectionTitle";
import { Search, User } from "lucide-react";
import dummyUsers from "../../data/dummyUser";
import useUserFormStore from "../../store/useUserFormStore";

const EmployeeIdentification = () => {
    const { formData, updateField } = useUserFormStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateField(name, value);
    };

    const handleSearch = () => {
        const match = dummyUsers.find((u) => u.cif === formData.cif);
        if (match) {
            updateField("name", match.name);
            updateField("currentDepartment", match.department);
            updateField("currentBranch", match.branch);
            updateField("currentDesignation", match.designation);
            updateField("currentLineManager", match.lineManager);
        } else {
            alert("No user found with this CIF");
        }
    };

    return (
        <>
            <SectionTitle className="mb-3">
                <User className="w-5 h-5 text-red-600 mr-2" />
                Employee Identification
            </SectionTitle>

            <section className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 shadow">
                <div className="flex gap-2 items-end">
                    <FloatingInput
                        label="CIF / NID"
                        name="cif"
                        value={formData.cif}
                        onChange={handleChange}
                        className="flex-1"
                    />
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="bg-red-600/80 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </div>

                <FloatingInput label="Full Name" name="name" value={formData.name} disabled />
                <div></div>

                <FloatingInput label="Current Department" name="currentDepartment" value={formData.currentDepartment} disabled />
                <FloatingInput label="Current Branch" name="currentBranch" value={formData.currentBranch} disabled />
                <FloatingInput label="Current Designation" name="currentDesignation" value={formData.currentDesignation} disabled />
                <FloatingInput label="Current Line Manager" name="currentLineManager" value={formData.currentLineManager} disabled />
            </section>
        </>
    );
};

export default EmployeeIdentification;