import mongoose, { Schema, Document } from "mongoose";

export interface Newsletter extends Document {
    email: string;
    createdAt: boolean;
    updatedAt: boolean;
    userID?: string;
}

const NewsletterSchema: Schema = new Schema({
    email: { type: String, required: true },
    userID: { type: String, required: false, ref: 'User'},
},
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);


const NewsletterModel = (mongoose.models.Newsletter as mongoose.Model<Newsletter>) || (mongoose.model<Newsletter>('Newsletter', NewsletterSchema));

export default NewsletterModel;