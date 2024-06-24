import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { Input, message } from 'antd';
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("id");
        console.log(formData)
        try {
            setLoading(true);
            const response = await axios.post(
                `${process.env.REACT_APP_SERVERURL}/user/contactus`,
                {
                    userId: userId,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                }
            );
            const data = await response;
            if (data?.data?.success === true) {
                setFormData({
                    name: "",
                    email: "",
                    message: ""
                });
                setLoading(false);
                toast.success(data?.data?.msg);
                setTimeout(() => {
                    navigate("/contactus");
                }, 2000);
            } else {
                toast.error(data?.data?.msg);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setLoading(false);
        }
    };



    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <Toaster />
                {/* Form container */}
                <div className="sm:mx-auto sm:w-full sm:max-w-md content-center">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Contact Us
                    </h2>
                </div>

                {/* Form section */}
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Name field */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Name
                            </label>
                            <div className="mt-2">
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="py-2 input-style" // Apply custom class input-style
                                    required
                                />
                            </div>
                        </div>

                        {/* Email field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email
                            </label>
                            <div className="mt-2">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="py-2 input-style" // Apply same custom class input-style
                                    required
                                />
                            </div>
                        </div>

                        {/* Message field */}
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Message
                            </label>
                            <div className="mt-2">
                                <Input.TextArea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="py-2 input-style" // Apply same custom class input-style
                                    rows={4}
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit button */}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={loading}
                            >
                                {loading ? "Sending message..." : "Send Message"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ContactUsPage;
