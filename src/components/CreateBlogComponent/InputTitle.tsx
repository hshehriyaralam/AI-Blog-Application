'use client'
import { ContextTheme } from '../../Context/DarkTheme'
import { useContext } from 'react';

export default function InputTitle({value, onChange}: any){
  const { themeValue } = useContext(ContextTheme);
  
  return(
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${themeValue ? 'text-gray-700' : 'text-gray-300'}`}>
        Blog Title
      </label>
      <input
        type="text"
        name="title"
        required
        value={value}
        onChange={onChange}
        placeholder="Enter a captivating title..."
        className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
          themeValue 
            ? 'bg-white border-gray-300 text-gray-800 placeholder-gray-400' 
            : 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
        }`}
      />
    </div>
  )
}