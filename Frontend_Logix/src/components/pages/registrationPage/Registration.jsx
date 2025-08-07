import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    FaUser, FaIdCard, FaPhone, FaEnvelope, FaUniversity,
    FaUsers, FaFilePowerpoint, FaArrowRight, FaArrowLeft, FaCheck
} from 'react-icons/fa';

const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        branch: '',
        rollNumber: '',
        phone: '',
        email: '',
        collegeEmail: '',
        participantType: '',
        projectName: '',
        presentationFile: null,
        teamMembers: [{ name: '', email: '' }],
        agreeTerms: false
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleTeamMemberChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMembers = [...formData.teamMembers];
        updatedMembers[index] = {
            ...updatedMembers[index],
            [name]: value
        };
        setFormData(prev => ({
            ...prev,
            teamMembers: updatedMembers
        }));
    };

    const addTeamMember = () => {
        if (formData.teamMembers.length < 4) {
            setFormData(prev => ({
                ...prev,
                teamMembers: [...prev.teamMembers, { name: '', email: '' }]
            }));
        }
    };

    const removeTeamMember = (index) => {
        const updatedMembers = [...formData.teamMembers];
        updatedMembers.splice(index, 1);
        setFormData(prev => ({
            ...prev,
            teamMembers: updatedMembers
        }));
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.name.trim()) newErrors.name = 'Name is required';
            if (!formData.branch.trim()) newErrors.branch = 'Branch is required';
            if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required';
            if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
            if (!formData.email.trim()) newErrors.email = 'Email is required';
            else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
            if (!formData.collegeEmail.trim()) newErrors.collegeEmail = 'College email is required';
            else if (!/^\S+@\S+\.\S+$/.test(formData.collegeEmail)) newErrors.collegeEmail = 'College email is invalid';
        }

        if (step === 2) {
            if (!formData.participantType) newErrors.participantType = 'Please select participation type';

            if (formData.participantType === 'presenter') {
                if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
                if (!formData.presentationFile) newErrors.presentationFile = 'Presentation file is required';

                formData.teamMembers.forEach((member, index) => {
                    if (!member.name.trim()) newErrors[`teamMemberName${index}`] = 'Member name is required';
                    if (!member.email.trim()) newErrors[`teamMemberEmail${index}`] = 'Member email is required';
                    else if (!/^\S+@\S+\.\S+$/.test(member.email)) newErrors[`teamMemberEmail${index}`] = 'Member email is invalid';
                });
            }
        }

        if (step === 3) {
            if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and privacy policy';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFinalStepValid = validateStep(currentStep);

        if (isFinalStepValid) {
            setIsSubmitting(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Form submitted:', formData);
            setIsSubmitting(false);
            navigate('/event-details');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const stepVariants = {
        enter: { x: 100, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -100, opacity: 0 }
    };

    return (
        <div className="min-h-screen w-full sm:w-auto bg-gray-900 text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                    InnovateX Registration
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Join the most exciting tech competition of the year
                </p>
            </motion.div>

            <div className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700">
                {/* Progress Steps */}
                <div className="flex justify-between px-6 py-4 border-b border-gray-700">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'} transition-colors`}>
                                {step}
                            </div>
                            <span className={`text-xs mt-1 ${currentStep >= step ? 'text-purple-400' : 'text-gray-500'}`}>
                                {step === 1 ? 'Personal' : step === 2 ? 'Role' : 'Confirm'}
                            </span>
                        </div>
                    ))}
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="p-6"
                >
                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        {/* Step 1: Personal Info */}
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial="enter"
                                animate="center"
                                exit="exit"
                                variants={stepVariants}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div variants={itemVariants} className="space-y-3">
                                    {[
                                        { id: 'name', label: 'Full Name', icon: <FaUser />, placeholder: 'John Doe' },
                                        { id: 'branch', label: 'Branch', icon: <FaUniversity />, placeholder: 'Computer Science' },
                                        { id: 'rollNumber', label: 'Roll Number', icon: <FaIdCard />, placeholder: 'CS2023001' },
                                        { id: 'phone', label: 'Phone Number', icon: <FaPhone />, placeholder: '+1 234 567 8900' },
                                        { id: 'email', label: 'Personal Email', icon: <FaEnvelope />, placeholder: 'john@example.com' },
                                        { id: 'collegeEmail', label: 'College Email', icon: <FaEnvelope />, placeholder: 'john@college.edu' }
                                    ].map((field) => (
                                        <div key={field.id}>
                                            <label htmlFor={field.id} className="block text-sm font-medium text-gray-300 mb-1">
                                                {field.label}
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    {field.icon}
                                                </div>
                                                <input
                                                    type={field.id.includes('Email') ? 'email' : 'text'}
                                                    id={field.id}
                                                    name={field.id}
                                                    value={formData[field.id]}
                                                    onChange={handleChange}
                                                    className={`bg-gray-700 text-white pl-10 w-full rounded-lg py-2 px-3 focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors[field.id] ? 'border border-red-500' : 'border border-gray-600'}`}
                                                    placeholder={field.placeholder}
                                                />
                                            </div>
                                            {errors[field.id] && <p className="mt-1 text-xs text-red-400">{errors[field.id]}</p>}
                                        </div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        )}

                        {/* Step 2: Participant Type */}
                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial="enter"
                                animate="center"
                                exit="exit"
                                variants={stepVariants}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div variants={itemVariants} className="space-y-4">
                                    <div>
                                        <h3 className="text-md font-medium text-gray-300 mb-3">How are you participating?</h3>
                                        <div className="grid grid-cols-1 gap-3">
                                            {[
                                                { value: 'bidder', label: 'Audience Member (Bidder)', description: 'I will attend to watch presentations and vote on projects' },
                                                { value: 'presenter', label: 'Project Presenter', description: 'I will present my project to the audience and judges' }
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, participantType: option.value }))}
                                                    className={`p-4 rounded-lg border-2 transition-all text-left ${formData.participantType === option.value ? 'border-purple-500 bg-purple-900/30' : 'border-gray-600 hover:border-purple-400'}`}
                                                >
                                                    <h4 className="text-md font-medium mb-1">{option.label}</h4>
                                                    <p className="text-xs text-gray-400">{option.description}</p>
                                                </button>
                                            ))}
                                        </div>
                                        {errors.participantType && <p className="mt-1 text-xs text-red-400">{errors.participantType}</p>}
                                    </div>

                                    {/* Presenter-specific fields */}
                                    {formData.participantType === 'presenter' && (
                                        <div className="space-y-3 pt-2">
                                            <div>
                                                <label htmlFor="projectName" className="block text-sm font-medium text-gray-300 mb-1">
                                                    Project Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="projectName"
                                                    name="projectName"
                                                    value={formData.projectName}
                                                    onChange={handleChange}
                                                    className={`bg-gray-700 text-white w-full rounded-lg py-2 px-3 focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.projectName ? 'border border-red-500' : 'border border-gray-600'}`}
                                                    placeholder="AI Campus Navigator"
                                                />
                                                {errors.projectName && <p className="mt-1 text-xs text-red-400">{errors.projectName}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="presentationFile" className="block text-sm font-medium text-gray-300 mb-1">
                                                    Presentation File (PPT/PDF)
                                                </label>
                                                <div className="flex items-center">
                                                    <label className="flex flex-col items-center px-3 py-4 bg-gray-700 rounded-lg border-2 border-dashed border-gray-600 cursor-pointer hover:border-purple-500 transition-colors w-full">
                                                        <FaFilePowerpoint className="text-xl mb-1 text-purple-400" />
                                                        <span className="text-xs text-center">
                                                            {formData.presentationFile ? (
                                                                <span className="text-purple-300">{formData.presentationFile.name}</span>
                                                            ) : (
                                                                'Click to upload your presentation'
                                                            )}
                                                        </span>
                                                        <input
                                                            type="file"
                                                            id="presentationFile"
                                                            name="presentationFile"
                                                            onChange={handleChange}
                                                            className="hidden"
                                                            accept=".ppt,.pptx,.pdf"
                                                        />
                                                    </label>
                                                </div>
                                                {errors.presentationFile && <p className="mt-1 text-xs text-red-400">{errors.presentationFile}</p>}
                                            </div>

                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <label className="block text-sm font-medium text-gray-300">
                                                        Team Members
                                                    </label>
                                                    <span className="text-xs text-gray-500">
                                                        {formData.teamMembers.length}/4 members
                                                    </span>
                                                </div>
                                                <div className="space-y-2">
                                                    {formData.teamMembers.map((member, index) => (
                                                        <div key={index} className="bg-gray-700/30 p-3 rounded-lg">
                                                            <div className="grid grid-cols-1 gap-2">
                                                                <div>
                                                                    <input
                                                                        type="text"
                                                                        name="name"
                                                                        value={member.name}
                                                                        onChange={(e) => handleTeamMemberChange(index, e)}
                                                                        className={`bg-gray-700 text-white w-full rounded-lg py-2 px-3 focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors[`teamMemberName${index}`] ? 'border border-red-500' : 'border border-gray-600'}`}
                                                                        placeholder="Member Name"
                                                                    />
                                                                    {errors[`teamMemberName${index}`] && <p className="mt-1 text-xs text-red-400">{errors[`teamMemberName${index}`]}</p>}
                                                                </div>
                                                                <div>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        value={member.email}
                                                                        onChange={(e) => handleTeamMemberChange(index, e)}
                                                                        className={`bg-gray-700 text-white w-full rounded-lg py-2 px-3 focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors[`teamMemberEmail${index}`] ? 'border border-red-500' : 'border border-gray-600'}`}
                                                                        placeholder="member@example.com"
                                                                    />
                                                                    {errors[`teamMemberEmail${index}`] && <p className="mt-1 text-xs text-red-400">{errors[`teamMemberEmail${index}`]}</p>}
                                                                </div>
                                                                {index > 0 && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeTeamMember(index)}
                                                                        className="text-xs text-red-400 hover:text-red-300 text-right"
                                                                    >
                                                                        Remove Member
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {formData.teamMembers.length < 4 && (
                                                        <button
                                                            type="button"
                                                            onClick={addTeamMember}
                                                            className="text-xs text-purple-400 hover:text-purple-300 flex items-center"
                                                        >
                                                            <span className="mr-1">+ Add Team Member</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </motion.div>
                        )}

                        {/* Step 3: Confirmation - Made more mobile-friendly */}
                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial="enter"
                                animate="center"
                                exit="exit"
                                variants={stepVariants}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                <motion.div
                                    variants={itemVariants}
                                    className="w-full max-w-3xl mx-auto bg-gray-700/30 rounded-lg p-4 space-y-4 md:p-6 "
                                >
                                    <h3 className="text-md md:text-lg font-semibold text-purple-400 mb-3 border-b border-gray-600 pb-2">
                                        Registration Summary
                                    </h3>

                                    {/* Personal Info Section */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-gray-400 mb-2">Personal Information</h4>
                                        <div className="space-y-2">
                                            {[
                                                { label: 'Name', value: formData.name },
                                                { label: 'Branch', value: formData.branch },
                                                { label: 'Roll Number', value: formData.rollNumber },
                                                { label: 'Phone', value: formData.phone },
                                                { label: 'Email', value: formData.email },
                                                { label: 'College Email', value: formData.collegeEmail }
                                            ].map((item) => (
                                                <div key={item.label} className="flex justify-between text-sm">
                                                    <span className="text-gray-400">{item.label}:</span>
                                                    <span className="text-white text-right max-w-[60%] truncate">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Participation Details Section */}
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-400 mb-2">Participation Details</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">Role:</span>
                                                <span className="text-white capitalize">{formData.participantType}</span>
                                            </div>

                                            {formData.participantType === 'presenter' && (
                                                <>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-400">Project Name:</span>
                                                        <span className="text-white text-right max-w-[60%] truncate">{formData.projectName}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-400">Presentation File:</span>
                                                        <span className="text-white text-right max-w-[60%] truncate">
                                                            {formData.presentationFile?.name || 'Not uploaded'}
                                                        </span>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="text-gray-400 text-sm mb-1">Team Members:</div>
                                                        <ul className="space-y-1">
                                                            {formData.teamMembers.map((member, index) => (
                                                                <li key={index} className="text-sm">
                                                                    <div className="flex justify-between">
                                                                        <span className="text-white">{member.name}</span>
                                                                        <span className="text-gray-300 text-xs text-right max-w-[50%] truncate">
                                                                            {member.email}
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Terms Checkbox */}
                                    <div className="flex items-start gap-2 pt-2">
                                        <input
                                            id="agreeTerms"
                                            name="agreeTerms"
                                            type="checkbox"
                                            checked={formData.agreeTerms}
                                            onChange={(e) => setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
                                            className="w-4 h-4 rounded bg-gray-700 border-gray-600 focus:ring-purple-500 focus:ring-2 mt-1"
                                        />
                                        <label htmlFor="agreeTerms" className="text-xs md:text-sm text-gray-300">
                                            Send email to added members and ask them to register
                                        </label>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}


                        {/* Navigation Buttons */}
                        <motion.div variants={itemVariants} className="flex justify-between pt-4">
                            {currentStep > 1 ? (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center text-sm"
                                >
                                    <FaArrowLeft className="mr-1" /> Back
                                </button>
                            ) : (
                                <div></div>
                            )}

                            {currentStep < 3 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center text-sm"
                                >
                                    Next <FaArrowRight className="ml-1" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all flex items-center text-sm"
                                >
                                    {isSubmitting ? (
                                        'Submitting...'
                                    ) : (
                                        <>
                                            Complete Registration <FaCheck className="ml-1" />
                                        </>
                                    )}
                                </button>
                            )}
                        </motion.div>
                    </motion.form>
                </motion.div>
            </div>
        </div>
    );
};

export default Registration;