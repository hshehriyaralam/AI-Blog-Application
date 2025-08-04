'use client'
import { useState, KeyboardEvent, ChangeEvent } from 'react';

interface BlogFormData {
  title: string;
  summary: string;
  content: string;
  tags: string[];
  image: File | null;
  imagePreview: string;
}

export default function WriteBlogForm() {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    summary: '',
    content: '',
    tags: [],
    image: null,
    imagePreview: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === 'Enter' && target.value.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, target.value.trim()],
      }));
      target.value = '';
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const generateSummary = () => {
    setFormData(prev => ({
      ...prev,
      summary: "This is an AI-generated summary based on your content."
    }));
  };

  const generateTags = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, "AI", "Technology", "React"]
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-2 py-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Write New Blog</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white border border-gray-200 rounded-md p-4 shadow-sm">
        {/* Left Column: Title, Tags, Summary */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-blue-200 focus:ring-1"
            />
          </div>

          {/* Tags */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">Tags</label>
              <button
                onClick={generateTags}
                className="text-xs text-blue-600 hover:underline"
              >
                Generate Tags
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-1">
              {formData.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 text-xs rounded-full px-2 py-0.5 flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(i)}
                    className="text-xs text-blue-500 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              onKeyDown={handleTagKeyDown}
              placeholder="Press Enter to add tag"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-200"
            />
          </div>

          {/* Summary */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">Content Summary</label>
              <button
                type="button"
                onClick={generateSummary}
                className="text-xs text-blue-600 hover:underline"
              >
                Generate Summary
              </button>
            </div>
            <textarea
              name="summary"
              rows={4}
              value={formData.summary}
              onChange={handleChange}
              placeholder="Enter or generate content summary"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Right Column: Content, Image */}
        <div className="space-y-4">
          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              name="content"
              rows={4}
              value={formData.content}
              onChange={handleChange}
              placeholder="Write blog content here..."
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-200"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content Image</label>
            <label className="block w-full h-30 border-2 border-dashed border-gray-300 rounded-md bg-gray-50 cursor-pointer flex items-center justify-center hover:bg-gray-100 transition-colors">
              {formData.imagePreview ? (
                <img src={formData.imagePreview} alt="Preview" className="w-full h-full object-cover rounded" />
              ) : (
                <div className="text-gray-500 text-center text-sm">
                  <p>Click to upload</p>
                  <p className="text-xs">PNG, JPG - Max 5MB</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          className="px-5 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
        >
          Publish
        </button>
        <button
          type="button"
          className="px-5 py-1.5 border border-gray-400 text-gray-700 text-sm rounded-md hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
