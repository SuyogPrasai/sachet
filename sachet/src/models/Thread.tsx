import mongoose, { Schema } from "mongoose";

import { ThreadDB } from "@/types/post_objects/thread";

// Defining the Thread schema
const ThreadSchema: Schema<ThreadDB> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: false },
    publishedIn: { type: Date, required: true },
    published_for: { type: String, required: true },
    image: { type: String, required: false }, // Path to the featured image
    publisherID: { type: String, ref: "User", required: true }, // User ID reference
    voteCount: { type: Number, default: 0 },
    postTags: [{ type: String }],
    trashed: { type: Boolean, default: false },
    category: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Exporting the model
const ThreadModel = (mongoose.models.Thread as mongoose.Model<ThreadDB>) || (mongoose.model<ThreadDB>('Thread', ThreadSchema));

export default ThreadModel;