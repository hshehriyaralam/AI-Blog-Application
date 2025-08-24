'use client'
import { ContextTheme } from '../../Context/DarkTheme'
import { useContext, useState } from 'react';
import { User } from "lucide-react";
import { useAllUserQuery } from "../../Redux/Services/userApi"

function AuthorItem({ user, themeValue, lightText, DarkText }: any) {
  const [imgError, setImgError] = useState(false);
  const hasImage = user?.profilePic && user.profilePic.trim() !== "" && !imgError;

  return (
    <li className="flex items-center">
      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
        {hasImage ? (
          <img
            src={user.profilePic}
            alt={`${user.name || "Author"}-pic`}
            className="w-12 h-12 rounded-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <User className="w-7 h-7 text-gray-700" />
        )}
      </div>

      <div className="ml-3">
        <p className={`text-sm font-medium ${themeValue ? lightText : DarkText}`}>
          {user.name}
        </p>
        <p className="text-sm text-gray-500">{user?.blogCount} Articles</p>
      </div>
    </li>
  )
}

export default function TopAuthors() {
  const { data } = useAllUserQuery(undefined)
  const { themeValue, light, dark, lightText, DarkText } = useContext(ContextTheme)

  return (
    <div className={`p-6 rounded-lg shadow-md ${themeValue ? light : `border border-gray-500 ${dark}`}`}>
      <h3 className={`text-lg font-semibold mb-4 ${themeValue ? lightText : DarkText}`}>Top Authors</h3>
      <ul className="space-y-3">
        {data?.data?.map((user: any, index: number) => (
          <AuthorItem 
            key={index} 
            user={user} 
            themeValue={themeValue} 
            lightText={lightText} 
            DarkText={DarkText} 
          />
        ))}
      </ul>
    </div>
  )
}
