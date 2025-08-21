'use client'
import { useState, ChangeEvent, useContext, SetStateAction } from 'react';
import { ContextTheme } from '../../Context/DarkTheme';
import { Button } from '../../components/ui/button';
import InputTitle from '../../components/CreateBlogComponent/InputTitle'
import InputContent from '../../components/CreateBlogComponent/InputContent';
import FeatureImage  from '../../components/CreateBlogComponent/FeatureImage';
import InputSummary from '../../components/CreateBlogComponent/InputSummary'
import InputTags from '../../components/CreateBlogComponent/InputTags';
import PreviewBlog from '../../components/CreateBlogComponent/PreviewBlog';
import CenteredButtons from '../../components/CreateBlogComponent/CenteredButtons';

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

  const CancellBlog = () => {
    setFormData({
    title: '',
    content: '',
    summary: '',
    tags: [],
    image: null,
    imagePreview: ''
    })
  }

  const addBlogs = () => {
    alert("add Blogs")
  }


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
            {/* Blog Titlle  */}
            <InputTitle  onChange={handleChange} value={formData.title} />
            {/* Blog Content  */}
            <InputContent  onChange={handleChange} value={formData.content}  />
            {/* Feature Image */}
            <FeatureImage  onChange={handleImageChange} imagePreview={formData.imagePreview} /> 
           </div>

          {/* Middle Column - Summary and Tags */}
          <div className="space-y-3">
            {/* Input Summary */}
            <InputSummary  value={formData.summary} onChange={handleChange} />
            {/* InputTags */}
            <InputTags 
            value={tagInput} 
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTagInput(e.target.value)}
            onKeyDown={(e: { key: string; }) => e.key === 'Enter' && addTag()}
            addTag={addTag}
            removeTag={removeTag}
            formData={formData}
            />
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

            {/* Preview Blogs  */}
            <PreviewBlog  formData={formData} />
          </div>
        </div>

        {/* Action Buttons - Centered */}
        <CenteredButtons addBlog={addBlogs} CancellBlog={CancellBlog} />
      </div>
    </div>
    
  );
}