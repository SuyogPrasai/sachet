'use client';

import React, { useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/useToast';
import { Button } from '../ui/button';
import { Bell, Check, X } from 'lucide-react';
import useFcmToken from '@/hooks/useFcmToken';

export default function PushManager() {
    const { toast } = useToast();
    const { token, notificationPermissionStatus } = useFcmToken();

    const handlePermission = useCallback(async (allow: boolean) => {

        if (allow) {
            try {
                // Check if notifications are supported
                if (!('Notification' in window)) {
                    console.log('Notifications not supported');
                    toast({
                        title: 'Not Supported',
                        description: 'Your browser does not support notifications.',
                        variant: 'destructive',
                    });
                    return;
                }

                console.log('Current permission:', Notification.permission);

                // Request permission
                const permission = await Notification.requestPermission();
                console.log('Permission result:', permission);

                if (permission === 'granted') {
                    toast({
                        title: 'Notifications Enabled',
                        description: 'You will now receive notifications.',
                    });
                } else {
                    toast({
                        title: 'Permission Denied',
                        description: 'You won\'t receive notifications.',
                        variant: 'destructive',
                    });
                }
            } catch (error) {
                console.error('Error requesting permission:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to request notification permission.',
                    variant: 'destructive',
                });
            }
        } else {
            console.log('Permission skipped');
            toast({
                title: 'Permission Skipped',
                description: 'If the pop up asking you for the permission didn\'t appear, please enable notifications manually from settings.',
            });
        }
    }, [toast]);

    useEffect(() => {
        console.log('PushManager mounted, showing toast'); // Debug log
        if (Notification.permission === "granted") {
            return;
        }

        if (Notification.permission === 'default') {
            // Small delay to ensure component is fully mounted
            const timer = setTimeout(() => {
                toast({
                    title: 'Enable Notifications',
                    description: (
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 mt-2">
                                <div className="mt-0.5 flex-shrink-0">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Bell className="w-4 h-4 " />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700 leading-relaxed font-roboto">
                                        Stay updated with the latest features, security updates, and important announcements.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-0">
                                <Button
                                    onClick={() => {
                                        console.log('Allow button clicked'); // Debug log
                                        handlePermission(true);
                                    }}
                                    size="sm"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all duration-200 hover:shadow-md"
                                >
                                    <Check className="w-4 h-4 mr-1.5" />
                                    Allow
                                </Button>
                                <Button
                                    onClick={() => {
                                        console.log('Not Now button clicked'); // Debug log
                                        handlePermission(false);
                                    }}
                                    size="sm"
                                    variant="outline"
                                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                                >
                                    <X className="w-4 h-4 mr-1.5" />
                                    Not Now
                                </Button>
                            </div>

                            <p className="text-xs text-gray-500 leading-relaxed">
                                You can change this setting anytime in your browser preferences.
                            </p>
                        </div>
                    ),
                    duration: 30000,
                    className: "max-w-md",
                });
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [toast, handlePermission]);

    return (
        <>
        </>
    );
}