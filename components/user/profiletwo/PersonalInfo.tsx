'use client';

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserProfileData, updateUserProfileData } from "@/actions/user";
import { toast } from "sonner";

// Define types for your user profile data
type UserProfileData = {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn: string;
    portfolio: string;
};

// Define the expected response type from your server actions
type ApiResponse = {
    success: boolean;
    error?: string;
    data?: UserProfileData;
};

export default function PersonalInfo() {
    const [data, setData] = useState<UserProfileData>({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        linkedIn: "",
        portfolio: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Load data on component mount
    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            try {
                const response = await getUserProfileData() as ApiResponse;
                console.log(response);

                if (response.success && response.data) {
                    setData({
                        fullName: response.data.fullName || "",
                        email: response.data.email || "",
                        phone: response.data.phone || "",
                        location: response.data.location || "",
                        linkedIn: response.data.linkedIn || "",
                        portfolio: response.data.portfolio || "",
                    });
                } else {
                    toast.error("Failed to load personal information", {
                        description: response.error || "Unknown error occurred",
                    });
                }
            } catch (error) {
                toast.error("Failed to load personal information", {
                    description: error instanceof Error ? error.message : "Unknown error occurred",
                });
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    // Handle form input change
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    // Toggle edit mode
    function toggleEdit() {
        setIsEditing(!isEditing);
    }

    // Save data using server action
    async function handleSave() {
        setIsLoading(true);
        try {
            const result = await updateUserProfileData(data) as ApiResponse;
            if (result.success) {
                toast.success("Personal information saved successfully");
                setIsEditing(false);
            } else {
                toast.error("Failed to save personal information", {
                    description: result.error || "Unknown error occurred",
                });
            }
        } catch (error) {
            toast.error("Failed to save personal information", {
                description: error instanceof Error ? error.message : "Unknown error occurred",
            });
        } finally {
            setIsLoading(false);
        }
    }

    // Cancel editing and reset to original data
    async function handleCancel() {
        setIsLoading(true);
        try {
            const response = await getUserProfileData() as ApiResponse;
            if (response.success && response.data) {
                setData({
                    fullName: response.data.fullName || "",
                    email: response.data.email || "",
                    phone: response.data.phone || "",
                    location: response.data.location || "",
                    linkedIn: response.data.linkedIn || "",
                    portfolio: response.data.portfolio || "",
                });
                setIsEditing(false);
            } else {
                toast.error("Failed to reset form", {
                    description: response.error || "Unknown error occurred",
                });
            }
        } catch (error) {
            toast.error("Failed to reset form", {
                description: error instanceof Error ? error.message : "Unknown error occurred",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        name="fullName"
                        value={data.fullName}
                        onChange={handleChange}
                        disabled={!isEditing || isLoading}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={handleChange}
                        disabled={!isEditing || isLoading}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={data.phone}
                        onChange={handleChange}
                        disabled={!isEditing || isLoading}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        name="location"
                        value={data.location}
                        onChange={handleChange}
                        disabled={!isEditing || isLoading}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                    <Input
                        id="linkedIn"
                        name="linkedIn"
                        type="url"
                        value={data.linkedIn}
                        onChange={handleChange}
                        disabled={!isEditing || isLoading}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio / GitHub</Label>
                    <Input
                        id="portfolio"
                        name="portfolio"
                        type="url"
                        value={data.portfolio}
                        onChange={handleChange}
                        disabled={!isEditing || isLoading}
                    />
                </div>
            </div>

            <div className="flex gap-2 justify-end">
                {isEditing ? (
                    <>
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </>
                ) : (
                    <Button
                        onClick={toggleEdit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Edit"}
                    </Button>
                )}
            </div>
        </div>
    );
}