'use client'
import { ContextTheme } from '../../Context/DarkTheme'
import { useContext } from 'react';


export default function FeatureImage({onChange,imagePreview }:any){
      const { themeValue,  lightText, DarkText } = useContext(ContextTheme);
    return(
        <div>
        <label className={`block text-sm font-medium mb-1 ${themeValue ? lightText : DarkText}`}>
        Featured Image
        </label>
        <label className={`block w-full h-32 border-2 border-dashed rounded-md cursor-pointer flex items-center justify-center ${
        themeValue ? 'border-gray-300 bg-gray-50' : 'border-gray-600 bg-gray-800'
        }`}>
        {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded" />
        ) : (
            <div className={`text-center ${themeValue ? 'text-gray-500' : 'text-gray-400'}`}>
            <p className="text-sm">Click to upload</p>
            <p className="text-xs">PNG, JPG (Max 5MB)</p>
            </div>
        )}
        <input type="file" className="hidden" accept="image/*" onChange={onChange} />
        </label>
    </div>
    )
}