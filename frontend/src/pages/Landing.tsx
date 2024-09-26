import { LandingBar } from "../components/LandingBar"
import { Link } from "react-router-dom"

export const Landing = () => {
    return (
        <div>
            <div>
                <LandingBar />
            </div>
            <div className="bg-neutral-50 text-gray-900 font-serif">
                <section className="flex flex-col items-start justify-center max-w-5xl mx-auto py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug sm:leading-tight md:leading-tight lg:leading-tight">
                        Human <br /> stories & ideas
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-3 sm:mt-4 md:mt-6 text-gray-600">
                        A place to read, write, and deepen your understanding
                    </p>

                    <Link 
                        to={'/signup'} 
                        className="mt-5 sm:mt-6 px-5 sm:px-6 py-2 sm:py-3 bg-green-600 text-white text-base sm:text-lg md:text-xl rounded-full hover:bg-green-500 transition-all duration-300 ease-in-out"
                    >
                        Start reading
                    </Link>
                </section>
            </div>
        </div>
    )
}
