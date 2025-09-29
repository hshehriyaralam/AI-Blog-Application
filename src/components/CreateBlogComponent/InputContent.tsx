'use client'
import { ContextTheme } from '../../Context/DarkTheme'
import { useContext } from 'react';

export default function InputContent({value, onChange}: any){
  const { themeValue } = useContext(ContextTheme);
  
  return(
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${themeValue ? 'text-gray-700' : 'text-gray-300'}`}>
        Blog Content
      </label>
      <textarea
        name="content"
        required
        rows={4}
        value={value}
        onChange={onChange}
        placeholder="Write your amazing content here..."
        className={`w-full px-4 py-3 rounded-lg  outline-none border transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical ${
          themeValue 
            ? 'bg-white border-gray-300 text-gray-800 placeholder-gray-400' 
            : 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
        }`}
      />
    </div>
  )
}