import mongoose, { Document,Schema } from "mongoose";


export interface IBlog  extends Document {
    blogTitle : string,
    blogContent : string,
    blogSummary : string,
    blogTags : string[],
    blogImage : string,
    userId : mongoose.Schema.Types.ObjectId;
}

const blogShema = new Schema<IBlog>(
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
            type : [String],
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

