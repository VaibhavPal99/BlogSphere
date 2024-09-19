import { Auth2 } from "../components/Auth2"
import { Quote } from "../components/Quote"

export const Signin = ()=>{
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth2></Auth2>
            </div>
            <div className="hidden lg:block">
            <Quote></Quote>
            </div>
        </div>
       
    </div>
}