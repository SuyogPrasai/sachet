import mongoose, { Schema, Document } from "mongoose";

export interface VerifiedEmail extends Document {
    email: string;
    orgName: string;
    link: string;
    createdAt: boolean;
    updatedAt: boolean;
    userID?: string;
}

const VerifiedEmailSchema: Schema = new Schema({
    email: { type: String, required: true },
    orgName: { type: String, required: true },
    link: { type: String, required: true },
    userID: { type: String, required: false, ref: 'User'},
},
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);


const VerifiedEmailModel = (mongoose.models.VerifiedEmail as mongoose.Model<VerifiedEmail>) || (mongoose.model<VerifiedEmail>('VerifiedEmail', VerifiedEmailSchema));

export default VerifiedEmailModel;