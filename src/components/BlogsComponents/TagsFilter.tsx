'use client'
import { Tag } from 'lucide-react'
import { useFetchBlogQuery } from '../../Redux/Services/blogApi';

export default function TagsFilter({ themeValue, light, dark, value, onChange }: any) {
  const { data } = useFetchBlogQuery([])

  const allTags = data?.data?.map((b: { blogTags: string[] }) => b.blogTags).flat() || [];
  const uniqueTags: string[] = Array.from(new Set(allTags));

  return (
    <div>
      <label
        className={`flex items-center gap-2 text-sm font-medium mb-2 ${
          themeValue ? "text-gray-700" : "text-gray-300"
        }`}
      >
        <Tag size={16} />
        Tags
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-[28%] min-w-[230px] px-3 py-2 rounded-lg border text-sm
          ${
            themeValue
              ? `${light} border-gray-300 text-gray-800`
              : `${dark} border-gray-600 text-white`
          }`}
      >
        <option value="">All tags</option>
        {uniqueTags.map((tag, index) => (
          <option key={index} value={String(tag)}>
            {String(tag)}
          </option>
        ))}
      </select>
    </div>
  )
}
