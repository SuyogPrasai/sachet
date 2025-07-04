import mongoose, { Schema } from "mongoose";

import { AnnouncementDB } from "@/types/post_objects/announcement";

// Defining the Announcement schema
const AnnouncementSchema: Schema<AnnouncementDB> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: false },
    category: { type: String, required: true },
    publishedIn: { type: Date, required: true },
    publisherID: { type: String, ref: "User", required: true }, // User ID reference
    trashed: { type: Boolean, default: false },
    link: { type: String, required: false },
    author: { type: String, required: true },
    show: { type: Boolean, required: true },
  },

  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Exporting the model
const AnnouncementModel = (mongoose.models.Announcement as mongoose.Model<AnnouncementDB>) || (mongoose.model<AnnouncementDB>('Announcement', AnnouncementSchema));

export default AnnouncementModel;