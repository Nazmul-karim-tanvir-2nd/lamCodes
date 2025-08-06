import { useEffect } from "react";
import useUserTransfer from "../../store/useUserTransfer";
import EmployeeIdentification from "./EmployeeIdentification";
import NewAssignmentDetails from "./NewAssignmentDetails";
import AccessChangeInstructions from "./AccessChangeInstructions";
import ApprovalSubmissionInfo from "./ApprovalSubmissionInfo";

const EmployeeTransfer = () => {
    const { formData, updateField } = useUserTransfer();

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        updateField("requestDate", today);
    }, [updateField]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Transfer Request Submitted:", formData);
        alert("Transfer Request Submitted. Check console.");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full p-2 space-y-2">
            <h1 className="text-base sm:text-xl font-bold text-center text-blue-800 mb-4 underline underline-offset-8 decoration-gray-500/80">
                Employee Transfer Request Form
            </h1>

            <EmployeeIdentification />
            <NewAssignmentDetails />
            <AccessChangeInstructions />
            <ApprovalSubmissionInfo />

            <div className="text-center">
                <button
                    type="submit"
                    className="bg-red-600/80 hover:bg-red-700 text-white px-12 py-3 rounded-md transition font-semibold"
                >
                    Submit Transfer Request
                </button>
            </div>
        </form>
    );
};

export default EmployeeTransfer;