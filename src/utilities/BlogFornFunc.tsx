'use client'
import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { toBase64 } from '../utilities/file';
import {useAddBlogMutation } from '../Redux/Services/blogApi'
import   {useGetUserQuery}  from '../Redux/Services/userApi'
import { useAlert } from '../Context/AlertContext'



interface BlogFormDataTypes {
  title: string;
  content: string;
  summary: string;
  tags: string[];
  image: File | null;
  imagePreview: string;
  userId : string
}

export default function  BlogFormFunctions(){
  const { showAlert } = useAlert()
  const { data} = useGetUserQuery(undefined)
  const [addBlogMutation] = useAddBlogMutation();
  const [loading , setLoading] = useState(false)
    const [formData, setFormData] = useState<BlogFormDataTypes>({
        title: '',
        content: '',
        summary: '',
        tags: [],
        image: null,
        imagePreview: '',
        userId : ''
      });
  const [tagInput, setTagInput] = useState('');
  const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFormData(prev => ({
        ...prev,
        image: selectedFile,
        imagePreview: URL.createObjectURL(selectedFile)
      }));
    }
  };

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

     const CancellBlog = () => {
    setFormData({
    title: '',
    content: '',
    summary: '',
    tags: [],
    image: null,
    imagePreview: '',
    userId : ''
    })
  }

   const handleImageUpload = async () => {
    if (!formData.image) return;

    try {
      const base64File = await toBase64(formData.image);
      const res = await axios.post('/api/upload', { file: base64File });

      if (res.status === 200) {
        const imageUrl = res.data.url;
        console.log("Uploaded Image URL:", imageUrl);

        setFormData(prev => ({
          ...prev,
          imagePreview: imageUrl,
          image: null, // optional clear
        }));

        return imageUrl;
      } else {
        throw new Error("Image Upload failed");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };
 

const addBlogs = async (e: any) => {
  e.preventDefault();
  setLoading(true);
  try {
    const imageURL = await handleImageUpload();
    const blogPayload = {
      blogTitle: formData.title,
      blogContent: formData.content,
      blogSummary: formData.summary,
      blogTags: formData.tags,
      blogImage: imageURL,
      userId: data?.user.id,
    };
    await addBlogMutation(blogPayload).unwrap();
    showAlert('success', 'Article Published Successfully');
    CancellBlog();
  } catch (error) {
    console.error("Failed to add blog:", error);
    showAlert('error', 'Failed to publish');
  } finally {
    setLoading(false);
  }
};



 

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
       setTagInput,
       loading
      }
}