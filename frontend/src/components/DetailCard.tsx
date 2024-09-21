import { Detail } from "../hooks"



export const DetailCard = ({
    name,
    email,
    password,

}: Detail) => {

      return (
        <div className="flex justify-center py-10  min-h-10">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r p-6 text-center">
              <h2 className="text-black text-3xl font-bold uppercase tracking-wider">User Details</h2>
            </div>
    
            {/* Details Content */}
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="text-lg font-semibold text-gray-700">Name:</div>
                <div className="ml-auto text-lg font-bold text-gray-900">{name}</div>
              </div>
    
              <div className="flex items-center mb-6">
                <div className="text-lg font-semibold text-gray-700">Email/Username:</div>
                <div className="ml-auto text-lg font-bold text-gray-900">{email}</div>
              </div>
    
              <div className="flex items-center">

                <div className="text-lg font-semibold text-gray-700">Password:</div>
                <div className="ml-auto text-lg font-bold text-gray-900">{password}</div>
              </div>
            </div>
    
            {/* Action Button */}
            {/* <div className="bg-gray-100 p-6 text-center">
              <button className="w-full py-2 px-4 text-black font-semibold rounded-lg shadow-md hover:bg-slate-600 hover:text-white transition duration-300 ease-in-out">
                Edit Profile
              </button>
            </div> */}
          </div>
        </div>
      );
  
}