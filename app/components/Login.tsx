import {Building2, X} from "lucide-react";
import React, {useState} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";



interface LoginProps {
    onClose: () => void;
}


interface FormErrors {
    username?: string;
    password?: string;
}

export default function Login({onClose}:LoginProps){

    const router = useRouter();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [touched, setTouched] = useState({
        username: false,
        password: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const validate = (name: string, value: string) => {
        if (!value.trim()) {
            return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        }
        return '';
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validate(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (touched[name as keyof typeof touched]) {
            const error = validate(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: FormErrors = {};

        Object.keys(formData).forEach(key => {
            const error = validate(key, formData[key as keyof typeof formData]);
            if (error) {
                newErrors[key as keyof FormErrors] = error;
            }
        });
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {



            const params = new URLSearchParams({
                username: formData.username,
                password: formData.password,
            })

            try {
                const params = new URLSearchParams({
                    username: formData.username,
                    password: formData.password,
                });

                const response = await fetch(`http://civilink-gateway-service:9090/api/v1/users/login?${params.toString()}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    Cookies.set("token", data.access_token, {
                        expires: 7,
                        secure: true,
                        sameSite: "Strict",
                    });

                    console.log("Login successful:", data);

                    try {
                        const decodedPayload = JSON.parse(atob(data.access_token.split(".")[1]));
                        const userRoles = decodedPayload.realm_access?.roles || [];

                        if (userRoles.includes("group_member")) {
                            router.push("/application");
                        } else {
                            router.push("/");
                        }
                    } catch (decodeError) {
                        console.error("Error decoding token:", decodeError);
                        setErrors({ username: "Invalid token received." });
                    }
                } else {
                    setErrors({ username: "Invalid credentials" });
                }
            } catch (error) {
                console.error("Login error:", error);
                setErrors({ username: "Login failed. Try again." });
            }

            console.log('Form submitted:', formData);
        }
    };

    return(
        <>

            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    <div className="p-8">
                        <div className="flex items-center justify-center space-x-2 mb-8">
                            <Building2 className="h-10 w-10 text-green-500" />
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                                CiviLink
                            </h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                    placeholder="Enter your username"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 transition-all duration-200 ${
                                        errors.username && touched.username
                                            ? 'border-red-500 focus:ring-red-200'
                                            : 'border-gray-300 focus:ring-green-200 focus:border-green-500'
                                    }`}/>
                                {errors.username && touched.username && (
                                    <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                                )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter your password"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 transition-all duration-200 ${
                                errors.password && touched.password
                                    ? 'border-red-500 focus:ring-red-200'
                                    : 'border-gray-300 focus:ring-green-200 focus:border-green-500'
                            }`}
                        />
                        {errors.password && touched.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <a href="#" className="text-sm text-green-600 hover:text-green-700 transition-colors">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                        Sign in
                    </button>

                    <div className="relative mt-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">New to BuildConnect?</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-full py-2 px-4 border-2 border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                        Create an account
                    </button>
                </form>
            </div>
        </div>
    </div>


        </>
    );

}
