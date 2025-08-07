import useUserFormStore from '../../store/useUserFormStore';
import { useEffect } from 'react';
import dummyUsers from '../../data/dummyUser.js';
import { Button } from '../../components/ui/Button.jsx';

import BasicInfoSection from './BasicInfoSection.jsx';
import DepartmentRoleSection from './DepartmentRoleSection.jsx';
import AttachmentsSection from './AttachmentsSection.jsx';
import MetadataSection from './MetadataSection.jsx';

const UserAccountForm = () => {
    const { formData, updateField } = useUserFormStore();

    const handleChange = (e) => {
        const { name, value, files, type, checked } = e.target;
        if (type === 'file') {
            const file = files[0];
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
                alert("Invalid file type. Only PDF, JPG, and PNG are allowed.");
                return;
            }
            updateField(name, file);
        }
        else if (type === 'checkbox') updateField(name, checked);
        else updateField(name, value);
    };

    const handleCIFSearch = () => {
        const sanitizedCIF = formData.cif.trim().replace(/[^\w\s\-]/gi, '');
        const match = dummyUsers.find((u) => u.cif === sanitizedCIF);
        if (match) {
            updateField("name", match.name);
            updateField("mobile", match.mobile);
            updateField("gender", match.gender);
            updateField("bloodGroup", match.bloodGroup);
            updateField("emergencyContact", match.emergencyContact);
            updateField("biometricStatus", match.biometricStatus);
        } else {
            alert("No user found with this CIF");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
        alert("Form submitted! Check console for full data.");
    };

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        updateField("requestDate", today);
        updateField("approvalStatus", "Pending");
    }, [updateField]);

    return (
        <form onSubmit={handleSubmit} className="w-full p-2 space-y-2">
            <h1 className="text-base sm:text-xl font-bold text-center text-blue-800 mb-4 underline underline-offset-8 decoration-gray-500/80">
                New User Account Opening Request
            </h1>

            <BasicInfoSection formData={formData} handleChange={handleChange} handleCIFSearch={handleCIFSearch} />
            <DepartmentRoleSection formData={formData} handleChange={handleChange} updateField={updateField} />
            <AttachmentsSection formData={formData} handleChange={handleChange} />
            <MetadataSection formData={formData} handleChange={handleChange} />

            <div className="text-center">
                <Button
                    type="submit"
                    size="lg"
                    className="px-12 bg-red-600/80 hover:bg-red-700 text-white rounded-md transition"
                >
                    Submit Request
                </Button>
            </div>
        </form>
    );
};

export default UserAccountForm;