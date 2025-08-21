'use client'
import { useState, ChangeEvent, useContext, SetStateAction } from 'react';


interface BlogFormDataTypes {
  title: string;
  content: string;
  summary: string;
  tags: string[];
  image: File | null;
  imagePreview: string;
}

export default function  BlogFormFunctions(){
    const [formData, setFormData] = useState<BlogFormDataTypes>({
        title: '',
        content: '',
        summary: '',
        tags: [],
        image: null,
        imagePreview: ''
      });
  const [tagInput, setTagInput] = useState('');

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
  }

   const addTag = () => {
    if (tagInput.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('')
    }
  }

    const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  }

  const addBlogs = () => {
    alert("add Blogs")
  }  

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

    return {
      handleChange,
      handleImageChange,
       addTag,
       removeTag,
       addBlogs,
       CancellBlog,
       formData,
       setFormData,
       tagInput,
       setTagInput
      }
}