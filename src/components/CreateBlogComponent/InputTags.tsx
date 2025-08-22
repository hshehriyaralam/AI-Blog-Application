'use client'
import { ContextTheme } from '../../Context/DarkTheme'
import { useContext } from 'react';
import { Button } from '../ui/button';

export default function InputTags({value,onChange,onKeyDown, addTag,removeTag,formData}:any){
  const { themeValue,  lightText, DarkText } = useContext(ContextTheme);

  return(
    <div>
      <label className={`block text-sm font-medium mb-1 ${themeValue ? lightText : DarkText}`}>
        Tags
      </label>
      <div className="flex gap-2 mb-2 items-center">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Add tag..."
          className={`flex-1 px-3 py-2 text-sm border rounded-md ${themeValue ? 'border-gray-300' : 'border-gray-600'} ${themeValue ? lightText : DarkText}`}
        />
        <Button 
          onClick={addTag} 
          type='button'
          size="sm" 
          className={`h-[30px] border border-gray-500 ${themeValue ? 'text-gray-800' : 'text-gray-300'} cursor-pointer`}
        >
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {formData.tags.map((tag: string, i: number) => (
          <span 
            key={i} 
            className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${
              themeValue ? 'bg-blue-100 text-blue-800' : 'bg-blue-900 text-blue-100'
            }`}
          >
            {tag}
            <button 
              onClick={() => removeTag(i)}   
              className="ml-1 text-xs cursor-pointer"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}
