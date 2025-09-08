'use client'
import { User } from "lucide-react";
import { useAllUserQuery } from "../../Redux/Services/userApi"

export default function AuthorsFilter({ themeValue, light, dark, value, onChange }: any) {
  const { data, isLoading } = useAllUserQuery({})

  // ✅ unique authors
  const uniqueAuthors = Array.from(
    new Map((data?.data || []).map((u: any) => [u?._id, u])).values()
  );

  return (
    <div>
      <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${themeValue ? 'text-gray-700' : 'text-gray-300'}`}>
        <User size={16} />
        Author
      </label>
      <select
        value={String(value || "")}   // ✅ force string value
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
        className={`w-full px-3 py-2 rounded-lg border ${
          themeValue ? `${light} border-gray-300 text-gray-800` : `${dark} border-gray-600 text-white`
        }`}
      >
        <option value="">All authors</option>
        {uniqueAuthors.map((user: any, index: number) => (
          <option key={user?._id ?? `user-${index}`} value={String(user?._id ?? "")}>
            {user?.name || "Unknown"}
          </option>
        ))}
      </select>
    </div>
  )
}
