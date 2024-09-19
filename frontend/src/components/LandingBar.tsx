import { Link } from "react-router-dom"

export const LandingBar = () => {

    return <div>
         <div className="border-b flex justify-between max-w-5xl mx-auto py-4 px-6">
                <Link to={'/'} className="flex flex-col justify-center font-semibold cursor-pointer text-3xl font-serif">
                    Medium
                </Link> 
            <div>
                    <Link className="pr-4" to={'/signin'}>
                         Sign in
                    </Link>  
                    <Link to={'/signup'}>
                        <button type="button" className="mr-4 focus:outline-none text-white bg-black focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2">Get started</button>
                    </Link>  
            </div>
        </div>
    </div>
}