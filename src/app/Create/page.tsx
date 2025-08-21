'use client'
import { useState, ChangeEvent, useContext } from 'react';
import { ContextTheme } from '../../Context/DarkTheme';
import { Button } from '../../components/ui/button';
import InputTitle from '../../components/CreateBlogComponent/InputTitle'

interface BlogFormData {
  title: string;
  content: string;
  summary: string;
  tags: string[];
  image: File | null;
  imagePreview: string;
}

export default function WriteBlogForm() {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    summary: '',
    tags: [],
    image: null,
    imagePreview: ''
  });

  const [tagInput, setTagInput] = useState('');
  const { themeValue, light, dark, lightText, DarkText } = useContext(ContextTheme);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const generateSummary = () => {
    // AI would analyze title + content to generate summary
    setFormData(prev => ({
      ...prev,
      summary: `AI-generated summary based on: "${prev.title}"...`
    }));
  };

  const generateTags = () => {
    // AI would analyze title + content to generate tags
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, ...["Tech", "Writing", "AI"]]
    }));
  };

  return (
    <div className={`w-full min-h-screen ${themeValue ? light : dark}`}>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <h1 className={`text-xl font-semibold mb-4 text-center ${themeValue ? lightText : DarkText}`}>
          Add Article
        </h1>

        {/* Main Editor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Column - Title and Content */}
          <div className="space-y-3">
            {/* // Input Titlle  */}
            <InputTitle  onChange={handleChange} value={formData.title} />

            <div>
              <label className={`block text-sm font-medium mb-1 ${themeValue ? lightText : DarkText}`}>
                Blog Content
              </label>
              <textarea
                name="content"
                rows={6}
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your content here..."
                className={`w-full px-3 py-2 text-sm border rounded-md ${themeValue ? 'border-gray-300' : 'border-gray-600'} text-gray-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${themeValue ? lightText : DarkText}`}>
                Featured Image
              </label>
              <label className={`block w-full h-32 border-2 border-dashed rounded-md cursor-pointer flex items-center justify-center ${
                themeValue ? 'border-gray-300 bg-gray-50' : 'border-gray-600 bg-gray-800'
              }`}>
                {formData.imagePreview ? (
                  <img src={formData.imagePreview} alt="Preview" className="h-full w-full object-cover rounded" />
                ) : (
                  <div className={`text-center ${themeValue ? 'text-gray-500' : 'text-gray-400'}`}>
                    <p className="text-sm">Click to upload</p>
                    <p className="text-xs">PNG, JPG (Max 5MB)</p>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>
          </div>

          {/* Middle Column - Summary and Tags */}
          <div className="space-y-3">
            <div>
              <label className={`block text-sm font-medium mb-1 ${themeValue ? lightText : DarkText}`}>
                Summary
              </label>
              <textarea
                name="summary"
                rows={4}
                value={formData.summary}
                onChange={handleChange}
                placeholder="Blog summary..."
                className={`w-full px-3 py-2 text-sm border rounded-md ${themeValue ? 'border-gray-300' : 'border-gray-600'} text-gray-500 `}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${themeValue ? lightText : DarkText}`}>
                Tags
              </label>
              <div className="flex gap-2 mb-2 items-center">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Add tag..."
                  className={`flex-1 px-3 py-2 text-sm border rounded-md ${themeValue ? 'border-gray-300' : 'border-gray-600'} ${themeValue ? lightText : DarkText}`}
                />
                <Button onClick={addTag} size="sm" className={`h-[30px]   border border-gray-500 ${themeValue ? 'text-gray-800' : 'text-gray-300'}  cursor-pointer`}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${
                      themeValue ? 'bg-blue-100 text-blue-800' : 'bg-blue-900 text-blue-100'
                    }`}
                  >
                    {tag}
                    <button 
                      onClick={() => removeTag(i)} 
                      className="ml-1 text-xs cursor-pointer "
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - AI Tools */}
          <div className="space-y-3">
            <div className={`p-3 rounded-lg ${themeValue ? 'bg-gray-50' : 'bg-gray-800'}`}>
              <h2 className={`text-sm font-medium mb-2 ${themeValue ? lightText : DarkText}`}>
                AI Assistance
              </h2>
              <div className="space-y-2">
                <Button
                  onClick={generateSummary}
                  variant="outline"
                  className={`w-full flex justify-between items-center text-xs ${themeValue ? '' : 'border-gray-500'}`}
                >
                  <span >Generate Summary</span>
                  <span className="text-xs">⌘S</span>
                </Button>
                <Button
                  onClick={generateTags}
                  variant="outline"
                  className={`w-full flex justify-between items-center text-xs ${themeValue ? '' : 'border-gray-500'} `}
                >
                  <span>Suggest Tags</span>
                  <span className="text-xs">⌘T</span>
                </Button>
              </div>
            </div>

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
                    {formData.tags.map((tag, i) => (
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
          </div>
        </div>

        {/* Action Buttons - Centered */}
        <div className="mt-6 flex justify-center gap-3">
          <Button 
            variant="outline"
            className={`px-4 py-2 border border-gray-500 ${themeValue ? 'text-gray-800' : 'text-gray-300'} cursor-pointer  `}
          >
            Cancel
          </Button>
          <Button 
            className="px-4 py-2 bg-blue-600 text-gray-100 hover:bg-blue-700 cursor-pointer  "
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
    
  );
}