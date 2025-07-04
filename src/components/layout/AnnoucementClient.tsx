"use client"
import Announcement from '@/types/post_objects/announcement'
import React, { useState, useEffect } from 'react'
 
interface AnnouncementProps {
    announcement: Announcement;
}

function AnnoucementClient({ announcement } : AnnouncementProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if announcement should be shown
        const shouldShowAnnouncement = () => {
            const announcementKey = `announcement_${announcement.title}_shown`;
            const lastShown = sessionStorage.getItem(announcementKey);
            const now = Date.now();
            
            // Show announcement if:
            // 1. Never shown before, OR
            // 2. Last shown more than 24 hours ago, OR
            // 3. Only 20% chance on each visit
            if (!lastShown) {
                return Math.random() < 0.3; // 30% chance for first-time visitors
            }
            
            const lastShownTime = parseInt(lastShown);
            const hoursAgo = (now - lastShownTime) / (1000 * 60 * 60);
            
            if (hoursAgo > 24) {
                return Math.random() < 0.2; // 20% chance if 24+ hours have passed
            }
            
            return false; // Don't show if recently shown
        };

        if (shouldShowAnnouncement()) {
            setIsVisible(true);
        }
    }, [announcement.title]);

    const handleClose = () => {
        // Mark as shown when user closes it
        const announcementKey = `announcement_${announcement.title}_shown`;
        sessionStorage.setItem(announcementKey, Date.now().toString());
        setIsVisible(false);
    };

    // Don't render anything if the announcement shouldn't be shown
    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className=" bg-blue-500 text-white p-6 md:p-10 shadow-2xl relative w-full transform transition-all duration-500 ease-out animate-fade-in">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full w-10 h-10 flex items-center justify-center transition-transform duration-200 hover:rotate-90"
                    aria-label="Close Announcement"
                >
                    ×
                </button>
                <div className="text-left max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-oswald mb-4 md:mb-6 tracking-tight">
                        {announcement.title}
                    </h2>
                    <p className="text-xl md:text-2xl font-oswald mb-4 md:mb-6 text-indigo-100">
                        {announcement.author}
                    </p>
                    <div
                        className="text-base md:text-lg font-roboto leading-relaxed mb-6 md:mb-8 text-gray-100"
                        dangerouslySetInnerHTML={{ __html: announcement.content || '' }}>
                    </div>
                    <button
                        className="border-2 border-white text-white bg-transparent py-2 px-6 md:py-3 md:px-10 font-sans font-semibold text-base md:text-lg hover:bg-white hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors duration-200"
                        aria-label="Learn More About BNKS Chronicles"
                    >
                        <a href={announcement.link} target='_blank'>
                            Learn More
                        </a>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AnnoucementClient