"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { addHobby, deleteHobby, getHobbies, updateHobby } from "@/actions/user";

interface Hobby {
    id: number;
    name: string;
}




const toast = {
    success: (message: string) => console.log("Success:", message),
    error: (message: string) => console.log("Error:", message)
};

export default function HobbiesPage() {
    const [hobbies, setHobbies] = useState<Hobby[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingHobby, setEditingHobby] = useState<Hobby | null>(null);
    const [loading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition();

    // Load hobbies on component mount
    useEffect(() => {
        loadHobbies();
    }, []);

    const loadHobbies = async () => {
        setLoading(true);
        try {
            startTransition(async () => {
                const result = await getHobbies();


                if (result.success) {
                    setHobbies(result.data as Hobby[]);
                } else {
                    toast.error(result.error || "Failed to load hobbies");
                }
                setLoading(false);
            });
        } catch {
            toast.error("Failed to load hobbies");
            setLoading(false);
        }
    };

    function openModal(hobby?: Hobby) {
        if (hobby) {
            setEditingHobby(hobby);
        } else {
            setEditingHobby({ id: -1, name: "" });
        }
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setEditingHobby(null);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!editingHobby) return;
        setEditingHobby({ ...editingHobby, name: e.target.value });
    }

    const handleSave = async () => {
        if (!editingHobby || editingHobby.name.trim() === "") {
            toast.error("Please enter a hobby name");
            return;
        }

        startTransition(async () => {
            try {
                let result;

                if (editingHobby.id === -1) {
                    // Adding new hobby
                    result = await addHobby({ name: editingHobby.name });
                } else {
                    // Updating existing hobby
                    result = await updateHobby(editingHobby.id, { name: editingHobby.name });
                }

                if (result.success) {
                    toast.success(result.message || "Hobby saved successfully");
                    closeModal();
                    await loadHobbies(); // Reload to get updated data
                } else {
                    toast.error(result.error || "Failed to save hobby");
                }
            } catch (error) {
                toast.error("An unexpected error occurred");
                console.error("Error saving hobby:", error);
            }
        });
    };

    const handleDelete = async (id: number, hobbyName: string) => {
        if (!confirm(`Are you sure you want to delete "${hobbyName}"?`)) return;

        startTransition(async () => {
            try {
                const result = await deleteHobby(id);

                if (result.success) {
                    toast.success(result.message || "Hobby deleted successfully");
                    await loadHobbies(); // Reload to get updated data with correct indices
                } else {
                    toast.error(result.error || "Failed to delete hobby");
                }
            } catch (error) {
                toast.error("An unexpected error occurred");
                console.error("Error deleting hobby:", error);
            }
        });
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2 text-muted-foreground">Loading hobbies...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Hobbies & Interests</h1>
                    <p className="text-muted-foreground mt-1">Add your personal interests and hobbies</p>
                </div>
                <Button
                    onClick={() => openModal()}
                    disabled={isPending}
                    className="gap-2"
                >
                    {isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Plus className="h-4 w-4" />
                    )}
                    {isPending ? "Loading..." : "Add Hobby"}
                </Button>
            </div>

            {hobbies.length === 0 ? (
                <Card className="border-dashed border-2">
                    <CardContent className="text-center py-16">
                        <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                            <Plus className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">No hobbies added yet</h3>
                        <p className="text-muted-foreground mb-4">Start by adding your first hobby or interest</p>
                        <Button
                            onClick={() => openModal()}
                            disabled={isPending}
                            variant="outline"
                            className="gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add Your First Hobby
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {hobbies.map((hobby) => (
                        <Card key={hobby.id} className="group hover:shadow-md transition-all duration-200 hover:border-primary/50">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-foreground truncate" title={hobby.name}>
                                            {hobby.name}
                                        </h3>
                                    </div>
                                    <div className="flex gap-1 ml-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openModal(hobby)}
                                            disabled={isPending}
                                            className="h-8 w-8 p-0 text-primary hover:text-primary hover:bg-primary/10"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(hobby.id, hobby.name)}
                                            disabled={isPending}
                                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                            {editingHobby?.id === -1 ? "Add New Hobby" : "Edit Hobby"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="hobby-name" className="text-sm font-medium">
                                Hobby Name *
                            </Label>
                            <Input
                                id="hobby-name"
                                value={editingHobby?.name || ""}
                                onChange={handleChange}
                                placeholder="e.g., Photography, Reading, Cooking..."
                                disabled={isPending}
                                maxLength={50}
                            />
                            <p className="text-xs text-muted-foreground">
                                {editingHobby?.name?.length || 0}/50 characters
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={closeModal}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={isPending || !editingHobby?.name.trim()}
                        >
                            {isPending ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Saving...
                                </div>
                            ) : (
                                editingHobby?.id === -1 ? "Add Hobby" : "Update Hobby"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}