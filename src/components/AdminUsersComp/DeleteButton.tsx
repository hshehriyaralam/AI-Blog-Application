"use client"
import { Trash2 } from "lucide-react";

export default function DeleteButton({themeValue,setShowDeleteModal}:any){
    return(
        <div className="flex items-center space-x-1">
            <button
                onClick={() => setShowDeleteModal(true)}
                className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                themeValue
                    ? 'bg-red-100 hover:bg-red-100 text-red-600 hover:text-red-700'
                    : 'bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-red-300'
                }`}
                title="Delete User"
            >
                <Trash2 size={14} />
            </button>
            </div>
    )
}