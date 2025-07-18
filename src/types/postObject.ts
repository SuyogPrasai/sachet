import { Document } from "mongoose";

export default interface PostObject {
    title: string;
    content?: string;
    // image?: string; // Path to the featured image
    // publisherID?: string;
    voteCount?: number;
    postTags: string[];
    updatedAt?: Date;
    createdAt?: Date;
    trashed?: boolean;
    category: string;
}

export interface PostObjectDB extends Document, PostObject {}
