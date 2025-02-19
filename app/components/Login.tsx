import {Building2, X} from "lucide-react";

interface LoginProps {
    onClose: () => void;
}

export default function Login({onClose}:LoginProps){


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

                        <form className="space-y-6">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"

                                    placeholder="Enter your username"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 transition-all duration-200`}/>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"

                            placeholder="Enter your password"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 transition-all duration-200`

                            }
                        />

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
