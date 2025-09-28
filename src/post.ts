import { Schema,Types,  model } from 'mongoose';

// 1. Create an interface representing a TS object.
export interface IPost {
  title: string;
  body: string;
  userid: Types.ObjectId;
  _id?: Types.ObjectId;
}

// 2. Create a Schema corresponding to the document in MongoDB.
const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  userid: { type: Schema.Types.ObjectId, ref: 'User', required: true }    
});
// 3. Create a Model.
export const PostModel = model('Post', postSchema);