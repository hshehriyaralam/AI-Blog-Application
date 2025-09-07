'use client'



export default function FilterActions({themeValue, light,dark}:any){
    return(
    <div className="flex gap-3 mt-4 justify-end">
            <button className={`px-4 py-2 rounded-lg border cursor-pointer ${
                themeValue 
                ? 'border-gray-300 text-gray-700 hover:bg-gray-50' 
                : 'border-gray-600 text-gray-300 hover:bg-gray-700'
            }`}>
                Clear All
            </button>
            <button className={`px-4 py-2 rounded-lg  
            bg-gradient-to-r from-indigo-500 to-purple-600 text-white
            rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all
            cursor-pointer
            `}>
                Apply Filters
            </button>
            </div>
    )
}