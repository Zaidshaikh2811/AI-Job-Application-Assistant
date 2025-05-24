"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Zap } from "lucide-react";
import {
    addSkill,
    getSkills,
    updateSkill,
    deleteSkill,
} from "@/actions/user"; // Adjust import path as needed

interface Skill {
    _id?: string;
    name: string;
    level: string;
}

const initialForm: Skill = {
    name: "",
    level: "",
};

export default function SkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch skills on component mount
    const fetchSkills = async () => {
        setLoading(true);
        try {
            const res = await getSkills();
            console.log("Fetched skills:", res);

            if (res.success) {
                setSkills(res.data as Skill[]);
                // setSkills([]);
            } else {
                toast.error(res.error || 'Failed to load skills');
            }
        } catch {
            toast.error('Failed to load skills');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    function openModal(skill?: Skill) {
        if (skill) {
            setEditingSkill(skill);
        } else {
            setEditingSkill(initialForm);
        }
        setModalOpen(true);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!editingSkill) return;
        const { name, value } = e.target;
        setEditingSkill({ ...editingSkill, [name]: value });
    }

    async function handleSave() {
        if (!editingSkill || !editingSkill.name.trim()) {
            toast.error('Please enter a skill name');
            return;
        }

        setLoading(true);
        try {
            if (editingSkill._id) {
                // Update existing skill
                const res = await updateSkill(editingSkill._id, editingSkill);
                if (res.success) {
                    toast.success('Skill updated successfully');
                    fetchSkills();
                    closeModal();
                } else {
                    toast.error(res.error || 'Failed to update skill');
                }
            } else {
                // Add new skill
                const res = await addSkill(editingSkill);
                if (res.success) {
                    toast.success('Skill added successfully');
                    fetchSkills();
                    closeModal();
                } else {
                    toast.error(res.error || 'Failed to add skill');
                }
            }
        } catch {
            toast.error('An error occurred while saving');
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(skillId?: string) {
        if (!skillId) return;

        if (!confirm('Are you sure you want to delete this skill?')) {
            return;
        }

        setLoading(true);
        try {
            const res = await deleteSkill(skillId);
            if (res.success) {
                toast.success('Skill deleted successfully');
                fetchSkills();
            } else {
                toast.error(res.error || 'Failed to delete skill');
            }
        } catch {
            toast.error('Failed to delete skill');
        } finally {
            setLoading(false);
        }
    }

    function closeModal() {
        setModalOpen(false);
        setEditingSkill(null);
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Zap className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-bold">Skills</h2>
                </div>
                <Button onClick={() => openModal()} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Skill
                </Button>
            </div>

            {/* Skills List */}
            <div className="space-y-4">
                {loading && skills.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center text-muted-foreground">
                            <p>Loading skills...</p>
                        </CardContent>
                    </Card>
                ) : skills.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center text-muted-foreground">
                            <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg mb-2">No skills added yet.</p>
                            <p className="text-sm">Click &quot;Add Skill&quot; to get started.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {skills.map((skill) => (
                            <Card key={skill._id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg text-foreground">
                                                {skill.name}
                                            </h3>
                                            {skill.level && (
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {skill.level}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openModal(skill)}
                                            disabled={loading}
                                            className="flex items-center gap-1 flex-1"
                                        >
                                            <Edit className="h-3 w-3" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(skill._id)}
                                            disabled={loading}
                                            className="flex items-center gap-1 flex-1"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                            Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {editingSkill?._id ? "Edit Skill" : "Add New Skill"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Skill Name *</Label>
                            <Input
                                id="name"
                                name="name"
                                value={editingSkill?.name || ""}
                                onChange={handleChange}
                                autoFocus
                                placeholder="e.g., JavaScript, Python, Adobe Photoshop"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="level">Proficiency Level (optional)</Label>
                            <Input
                                id="level"
                                name="level"
                                value={editingSkill?.level || ""}
                                onChange={handleChange}
                                placeholder="e.g., Beginner, Intermediate, Advanced, Expert"
                            />
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2">
                        <Button variant="outline" onClick={closeModal} disabled={loading}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={loading}>
                            {loading ? 'Saving...' : (editingSkill?._id ? "Update Skill" : "Add Skill")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}