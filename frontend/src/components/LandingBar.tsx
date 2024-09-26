import { Link } from "react-router-dom"

export const LandingBar = () => {
    return (
        <div>
            <div className="border-b border-gray-200 bg-white shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-center max-w-5xl mx-auto py-4 px-4 sm:px-6">
                    {/* Logo / Brand */}
                    <Link
                        to={'/'}
                        className="flex items-center justify-center text-2xl sm:text-3xl font-serif font-bold text-gray-900 hover:text-gray-700 transition-colors duration-300 ease-in-out"
                    >
                        BlogSphere
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center justify-center sm:justify-end space-x-4 mt-4 sm:mt-0">
                        <Link
                            to={'/signin'}
                            className="text-base sm:text-lg text-gray-700 hover:text-gray-900 transition-all duration-300"
                        >
                            Sign in
                        </Link>

                        <Link to={'/signup'}>
                            <button
                                type="button"
                                className="bg-black text-white text-sm sm:text-base px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-all duration-300"
                            >
                                Get started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
