'use client'
import { ContextTheme } from '../../Context/DarkTheme'
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useContext } from 'react';


export default function PreviewBlog({formData}:any){
      const { themeValue,  lightText, DarkText } = useContext(ContextTheme);
    return(
      <div className={`p-3 rounded-lg ${themeValue ? 'bg-gray-50' : 'bg-gray-800'}`}>
              <h2 className={`text-sm font-medium mb-2 ${themeValue ? lightText : DarkText}`}>
                Preview
              </h2>
              <div className={`p-2 rounded text-xs ${themeValue ? 'bg-white' : 'bg-gray-700'}`}>
                <h3 className={`font-medium mb-1 ${themeValue ? 'text-gray-800' : 'text-gray-200'}`}>
                  {formData.title || "Your Title"}
                </h3>
                <p className={`${themeValue ? 'text-gray-600' : 'text-gray-300'} line-clamp-3`}>
                  {formData.summary || "Summary preview"}
                </p>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.tags.map((tag: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, i: Key | null | undefined) => (
                      <span 
                        key={i} 
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          themeValue ? 'bg-blue-100 text-blue-800' : 'bg-blue-900 text-blue-100'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
    )
}