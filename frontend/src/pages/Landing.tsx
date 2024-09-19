
import { LandingBar } from "../components/LandingBar"
import {Link} from "react-router-dom"

export const Landing = () => {
    return <div>
        <div>
            <LandingBar></LandingBar>
        </div>
        <div className="bg-neutral-50 text-gray-900 font-serif">
            <section className="flex flex-col items-start justify-center max-w-5xl mx-auto py-20 px-6">
            <h1 className="text-6xl font-bold leading-tight">
            Human <br /> stories & ideas
            </h1>
            <p className="text-lg mt-4 text-gray-600">
            A place to read, write, and deepen your understanding
            </p>

            <Link to={'/signup'} className="mt-6 px-6 py-3 bg-green-600 text-white text-lg rounded-full hover:bg-green-500">
            Start reading
            </Link>
            </section>
        </div>

    </div>
}