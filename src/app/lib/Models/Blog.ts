import mongoose, { Document, Model, Schema } from "mongoose";


export interface Blogs extends Document {
    blogTitle : string,
    blogContent : string,
    blogSummary : string,
    blogTags : string,
    blogImage : string,
    userId : String
}

const blogShema = new Schema<Blogs>(
    {
        blogTitle : {
            type : String,
            required : true
        },
        blogContent : {
            type : String,
            required : true
        },
        blogSummary :  {
            type : String,
            required : true,
        },
        blogTags :  {
            type : String,
            required : true,
        },
        blogImage : {
           type : String,
           required : true,
        },
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true          
        }
    },{
        timestamps : true
    }
)


export const Blogs = mongoose.model("Blog", blogShema )

