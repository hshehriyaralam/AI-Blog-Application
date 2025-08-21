'use client'
import { ContextTheme } from '../../Context/DarkTheme'
import { useContext } from 'react';


export default function InputTitle({value,onChange}:any){
      const { themeValue,  lightText, DarkText } = useContext(ContextTheme);
    return(
        <div>
            <label className={`block text-sm font-medium mb-1 ${themeValue ? lightText : DarkText}`}>
            Blog Title
            </label>
            <input
            type="text"
            name="title"
            value={value}
            onChange={onChange}
            placeholder="Enter blog title"
            className={`w-full px-3 py-2 text-sm border rounded-md ${themeValue ? 'border-gray-300' : 'border-gray-600'} text-gray-500`}
            />
        </div>
    )
}