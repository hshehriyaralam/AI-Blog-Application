"use client"


export default function DeletePopUp({themeValue,setShowDeleteModal,confirmDelete}:any){
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl shadow-lg max-w-md w-full p-6 ${
            themeValue ? 'bg-white' : 'bg-gray-800'
          }`}>
            <h3 className={`text-lg font-semibold mb-2 ${
              themeValue ? 'text-gray-900' : 'text-white'
            }`}>
              Delete User Account
            </h3>
            <p className={`mb-4 ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>
              Are you sure you want to delete this user account? This action will permanently remove the user and all their data.
            </p>
            <p className="text-sm text-red-600 mb-6">
              ⚠️ This action cannot be undone.
            </p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  themeValue 
                    ? 'border border-gray-300 text-gray-700 hover:bg-gray-50' 
                    : 'border border-gray-600 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
    )
}