'use client'
import { ContextTheme } from '../../Context/DarkTheme'
import { useContext } from 'react';
import { Button } from '../ui/button';




export default function CenteredButtons({CancellBlog, text}:any){
  const { themeValue } = useContext(ContextTheme)
  return(
    <div className="mt-6 flex justify-center gap-3">
    <Button
    onClick={CancellBlog}
    type='button'
    variant="outline"
    className={`px-4 py-2 border border-gray-500 ${themeValue ? 'text-gray-800' : 'text-gray-300'} cursor-pointer  `}
    >
    Cancel
    </Button>
    <Button
    type={'submit'} 
    className="px-4 py-2 bg-blue-600 text-gray-100 hover:bg-blue-700 cursor-pointer  "
    >
    {text}
    </Button>
</div>
  )
}