import { render } from '@react-email/render';
import { NodeMailer } from "@/lib/nodemailer";
import ThreadEmail from "@/emails/ThreadNewsletter";

import { ApiResponse } from '@/types/api-responses';
import Thread from "@/types/post_objects/thread";

import NewsletterModel from "@/models/Newsletter";

export async function sendThreadNewsLetters(thread: Thread): Promise<ApiResponse> {
    try {
        const {
            _id,
            title,
            content,
            createdAt,
            postTags,
            category,
            published_for,
            link,
            author,
            updatedAt,
            details,
        } = thread;

        console.log("dasf")

        const pipeline = [
            {
                $project: {
                    email: 1,
                    _id: 0, // Exclude _id field
                },
            },
        ];

        const emailProps = {
            title: title,
            content: content ?? "",
            publishedIn: createdAt ? createdAt.toDateString() : "",
            publisherName: author,
            details,
            threadURL: link
        };

        const email_html = await render(ThreadEmail(emailProps))
        const emails = await NewsletterModel.aggregate(pipeline).exec();
        console.log(emails)

        
        await Promise.all(emails.map(async (email) => {
            try {
                const mailOptions = {
                    from: process.env.GMAIL_EMAIL || 'studentsachet@gmail.com',
                    to: email.email,
                    subject: emailProps.title + " | " +  'Parewa Thread',
                    html: email_html,
                };
                const info = await NodeMailer.sendMail(mailOptions);
                console.log('Email sent: ' + info.messageId);
            } catch (emailError) {
                console.log("Error sending this email", emailError);
            }
        }));
        return {
            success: true,
            message: "Successfully sent thread newsletter"
        };

    } catch (emailError) {
        console.log("Error Sending Thread Newsletter");
        return {
            success: false,
            message: "Error Sending Thread Newsletter"
        }
    }
}