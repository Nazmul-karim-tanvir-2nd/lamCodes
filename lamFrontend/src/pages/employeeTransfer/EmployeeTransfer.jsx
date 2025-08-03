import { useEffect } from 'react';
import useUserFormStore from '../../store/useUserFormStore';
import FloatingInput from '../../components/custom/FloatingInput';
import { SectionTitle } from '../../components/SectionTitle';
import { Search } from 'lucide-react';
import dummyUsers from '../../data/dummyUser';

const EmployeeTransfer = () => {
    const { formData, updateField } = useUserFormStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateField(name, value);
    };

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        updateField('requestDate', today);
    }, [updateField]);

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

            {/* Employee Identification */}
            <section className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-y-2 gap-x-4 md:gap-x-8 mb-14 shadow">
                <SectionTitle className="md:col-span-3">Employee Identification</SectionTitle>

                <div className="md:col-span-3 flex gap-4">
                    <FloatingInput
                        label="CIF / Employee Ref ID"
                        name="cif"
                        value={formData.cif}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="self-end bg-red-600/80 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </div>

                <FloatingInput label="Full Name" name="name" value={formData.name} disabled />
                <FloatingInput label="Current Department" name="currentDepartment" value={formData.currentDepartment} disabled />
                <FloatingInput label="Current Branch" name="currentBranch" value={formData.currentBranch} disabled />
                <FloatingInput label="Current Designation" name="currentDesignation" value={formData.currentDesignation} disabled />
                <FloatingInput label="Current Line Manager" name="currentLineManager" value={formData.currentLineManager} disabled />
            </section>

            {/* New Assignment Details */}
            <section className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-y-2 gap-x-4 md:gap-x-8 mb-14 shadow">
                <SectionTitle className="md:col-span-3">New Assignment Details</SectionTitle>
                <FloatingInput label="New Department" name="newDepartment" value={formData.newDepartment} onChange={handleChange} />
                <FloatingInput label="New Branch" name="newBranch" value={formData.newBranch} onChange={handleChange} />
                <FloatingInput label="New Line Manager" name="newLineManager" value={formData.newLineManager} onChange={handleChange} />
                <FloatingInput label="Effective Date of Transfer" name="effectiveDate" type="date" value={formData.effectiveDate} onChange={handleChange} />
                <FloatingInput label="Reason for Transfer (Optional)" name="reason" value={formData.reason} onChange={handleChange} />
                <FloatingInput label="Remarks (if any)" name="newRemarks" value={formData.newRemarks} onChange={handleChange} />
            </section>

            {/* Access Change Instructions */}
            <section className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-y-2 gap-x-4 md:gap-x-8 mb-14 shadow">
                <SectionTitle className="md:col-span-3">Access Change Instructions</SectionTitle>
                <FloatingInput label="Revoke Existing Software Access" name="revokeSoftware" value={formData.revokeSoftware} onChange={handleChange} />
                <FloatingInput label="Revoke Existing Device Access" name="revokeDevice" value={formData.revokeDevice} onChange={handleChange} />
                <FloatingInput label="Assign New Role-Based Access (Auto from Matrix)" name="autoAssignAccess" value={formData.autoAssignAccess} onChange={handleChange} />
                <FloatingInput label="Remarks (if any)" name="accessRemarks" value={formData.accessRemarks} onChange={handleChange} />
            </section>

            {/* Approval & Submission Info */}
            <section className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-y-2 gap-x-4 md:gap-x-8 mb-14 shadow">
                <SectionTitle className="md:col-span-3">Approval & Submission Info</SectionTitle>
                <FloatingInput label="Requested By" name="requestedBy" value={formData.requestedBy} onChange={handleChange} />
                <FloatingInput label="Request Date" name="requestDate" type="date" value={formData.requestDate} disabled />
                <FloatingInput label="Line Manager Approval Status" name="lineManagerApproval" value={formData.lineManagerApproval} onChange={handleChange} />
                <FloatingInput label="Department Head / HR Approval Status" name="hrApproval" value={formData.hrApproval} onChange={handleChange} />
                <FloatingInput label="IT/Admin Final Action Status" name="itFinalAction" value={formData.itFinalAction} onChange={handleChange} />
            </section>

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
