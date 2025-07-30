// src/pages/employeeTransfer/EmployeeTransfer.jsx
import { useEffect } from 'react';
import useUserFormStore from '../../store/useUserFormStore';
import FloatingInput from '../../components/FloatingInput';
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
        <form onSubmit={handleSubmit} className="w-full p-4 sm:p-10">
            <h1 className="text-xl sm:text-2xl font-bold text-center text-blue-800 mb-6 sm:mb-10 border-b-2 border-blue-200 pb-2">
                Employee Transfer Request Form
            </h1>

            {/* Employee Identification */}
            <SectionTitle>Employee Identification</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                <div className="md:col-span-2 flex flex-col sm:flex-row items-stretch gap-3">
                    <FloatingInput
                        label="CIF / Employee Ref ID"
                        name="cif"
                        value={formData.cif}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="mt-2 sm:mt-6 inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                    >
                        <Search />
                    </button>
                </div>
                <FloatingInput label="Full Name" name="name" value={formData.name} onChange={handleChange} disabled />
                <FloatingInput label="Current Department" name="currentDepartment" value={formData.currentDepartment} onChange={handleChange} disabled />
                <FloatingInput label="Current Branch" name="currentBranch" value={formData.currentBranch} onChange={handleChange} disabled />
                <FloatingInput label="Current Designation" name="currentDesignation" value={formData.currentDesignation} onChange={handleChange} disabled />
                <FloatingInput label="Current Line Manager" name="currentLineManager" value={formData.currentLineManager} onChange={handleChange} disabled />
            </div>

            {/* New Assignment Details */}
            <SectionTitle>New Assignment Details</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                <FloatingInput label="New Department" name="newDepartment" value={formData.newDepartment} onChange={handleChange} />
                <FloatingInput label="New Branch" name="newBranch" value={formData.newBranch} onChange={handleChange} />
                <FloatingInput label="New Line Manager" name="newLineManager" value={formData.newLineManager} onChange={handleChange} />
                <FloatingInput label="Effective Date of Transfer" name="effectiveDate" type="date" value={formData.effectiveDate} onChange={handleChange} />
                <FloatingInput label="Reason for Transfer (Optional)" name="reason" value={formData.reason} onChange={handleChange} />
                <FloatingInput label="Remarks (if any)" name="newRemarks" value={formData.newRemarks} onChange={handleChange} />
            </div>

            {/* Access Change Instructions */}
            <SectionTitle>Access Change Instructions</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                <FloatingInput label="Revoke Existing Software Access" name="revokeSoftware" value={formData.revokeSoftware} onChange={handleChange} />
                <FloatingInput label="Revoke Existing Device Access" name="revokeDevice" value={formData.revokeDevice} onChange={handleChange} />
                <FloatingInput label="Assign New Role-Based Access (Auto from Matrix)" name="autoAssignAccess" value={formData.autoAssignAccess} onChange={handleChange} />
                <FloatingInput label="Remarks (if any)" name="accessRemarks" value={formData.accessRemarks} onChange={handleChange} />
            </div>

            {/* Approval & Submission Info */}
            <SectionTitle>Approval & Submission Info</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                <FloatingInput label="Requested By" name="requestedBy" value={formData.requestedBy} onChange={handleChange} />
                <FloatingInput label="Request Date" name="requestDate" type="date" value={formData.requestDate} onChange={handleChange} disabled />
                <FloatingInput label="Line Manager Approval Status" name="lineManagerApproval" value={formData.lineManagerApproval} onChange={handleChange} />
                <FloatingInput label="Department Head / HR Approval Status" name="hrApproval" value={formData.hrApproval} onChange={handleChange} />
                <FloatingInput label="IT/Admin Final Action Status" name="itFinalAction" value={formData.itFinalAction} onChange={handleChange} />
            </div>

            <div className="text-center">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg shadow hover:bg-blue-700 transition-all"
                >
                    Submit Transfer Request
                </button>
            </div>
        </form>
    );
};

export default EmployeeTransfer;