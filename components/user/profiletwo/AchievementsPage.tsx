import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import {
    Plus,
    Edit2,
    Trash2,
    Trophy,
    Calendar,
    Award,
    Loader2,
    Search,
    SortAsc,
    SortDesc
} from "lucide-react";

// Import your CRUD functions here
import { getAchievements, addAchievement, updateAchievement, deleteAchievement } from "@/actions/user";

interface Achievement {
    _id: string;
    title: string;
    description: string;
    date: string;
}

export default function AchievementsPage() {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [filteredAchievements, setFilteredAchievements] = useState<Achievement[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    // Filter and sort achievements
    useEffect(() => {
        let filtered = achievements;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(achievement =>
                achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                achievement.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort by date
        filtered = filtered.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

        setFilteredAchievements(filtered);
    }, [achievements, searchTerm, sortOrder]);

    // Fetch achievements on component mount
    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        try {
            setLoading(true);


            // Replace this simulation with actual API call:
            const result = await getAchievements();
            console.log("Fetched achievements:", result);

            if (result.success) {
                setAchievements(Array.isArray(result.data) ? result.data as Achievement[] : []);
            }


        } catch (error) {
            console.error("Error fetching achievements:", error);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    };

    function openModal(achievement?: Achievement) {
        if (achievement) {
            setEditingAchievement(achievement);
        } else {
            setEditingAchievement({ _id: "", title: "", description: "", date: "" });
        }
        setModalOpen(true);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (!editingAchievement) return;
        const { name, value } = e.target;
        setEditingAchievement({ ...editingAchievement, [name]: value });
    }

    const handleSave = async () => {
        if (!editingAchievement || !editingAchievement.title.trim()) {
            return;
        }

        try {
            setSaving(true);



            // Replace simulation with actual API calls:
            if (!editingAchievement._id) {
                const result = await addAchievement({
                    title: editingAchievement.title.trim(),
                    description: editingAchievement.description,
                    date: new Date(editingAchievement.date)
                });
                if (result.success) {
                    setAchievements(prev => [...prev, result.data as Achievement]);
                }
            } else {
                const result = await updateAchievement(editingAchievement._id, {
                    title: editingAchievement.title.trim(),
                    description: editingAchievement.description,
                    date: new Date(editingAchievement.date)
                });
                if (result.success) {
                    setAchievements(prev =>
                        prev.map(achievement =>
                            achievement._id === editingAchievement._id ? (result.data as Achievement) : achievement
                        )
                    );
                }
            }
        } catch (error) {
            console.error("Error saving achievement:", error);
            setSaving(false);
        }
        finally {
            setSaving(false);
            setModalOpen(false);
            setEditingAchievement(null);
        }
    };

    const handleDelete = async (achievementId: string) => {
        if (!confirm("Are you sure you want to delete this achievement?")) {
            return;
        }

        try {
            // Simulate API call - replace with actual call:
            setAchievements(prev => prev.filter(achievement => achievement._id !== achievementId));

            // Replace with actual API call:
            const result = await deleteAchievement(achievementId);
            if (result.success) {
                setAchievements(prev => prev.filter(achievement => achievement._id !== achievementId));
            }
        } catch (error) {
            console.error("Error deleting achievement:", error);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-muted-foreground">Loading your achievements...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <Trophy className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Achievements</h1>
                            <p className="text-muted-foreground">
                                Showcase your accomplishments and milestones
                            </p>
                        </div>
                    </div>
                    <Button onClick={() => openModal()} className="flex items-center space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>Add Achievement</span>
                    </Button>
                </div>

                {/* Search and Sort Section */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search achievements..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                            className="flex items-center space-x-1"
                        >
                            {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                            <span>{sortOrder === "asc" ? "Oldest First" : "Newest First"}</span>
                        </Button>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Achievements Display */}
            {filteredAchievements.length === 0 ? (
                <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                        <Award className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                        {achievements.length === 0 ? "No achievements added yet" : "No achievements match your search"}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        {achievements.length === 0
                            ? "Start documenting your accomplishments and milestones."
                            : "Try adjusting your search terms."
                        }
                    </p>
                    {achievements.length === 0 && (
                        <Button onClick={() => openModal()} variant="default">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Your First Achievement
                        </Button>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredAchievements.map(achievement => (
                        <Card key={achievement._id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <Trophy className="h-5 w-5 text-yellow-600" />
                                            <CardTitle className="text-lg">{achievement.title}</CardTitle>
                                        </div>
                                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span>{formatDate(achievement.date)}</span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => openModal(achievement)}
                                            className="flex items-center space-x-1"
                                        >
                                            <Edit2 className="h-3 w-3" />
                                            <span>Edit</span>
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDelete(achievement._id)}
                                            className="text-destructive hover:text-destructive flex items-center space-x-1"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                            <span>Delete</span>
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <p className="text-muted-foreground whitespace-pre-wrap">{achievement.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Stats Summary */}
            {achievements.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center space-x-2">
                            <Award className="h-5 w-5" />
                            <span>Achievement Summary</span>
                        </CardTitle>
                        <CardDescription>Your accomplishment overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-600">{achievements.length}</div>
                                <div className="text-sm text-muted-foreground">Total Achievements</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {new Date().getFullYear() - new Date(Math.min(...achievements.map(a => new Date(a.date).getTime()))).getFullYear() + 1}
                                </div>
                                <div className="text-sm text-muted-foreground">Years of Excellence</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {achievements.filter(a => new Date(a.date).getFullYear() === new Date().getFullYear()).length}
                                </div>
                                <div className="text-sm text-muted-foreground">This Year</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Add/Edit Achievement Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                            <Trophy className="h-5 w-5 text-yellow-600" />
                            <span>{editingAchievement?._id ? "Edit" : "Add"} Achievement</span>
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Achievement Title *</Label>
                            <Input
                                id="title"
                                name="title"
                                value={editingAchievement?.title || ""}
                                onChange={handleChange}
                                placeholder="e.g., Employee of the Year, Best Innovation Award"
                                autoFocus
                                disabled={saving}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="date">Date Achieved *</Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                value={editingAchievement?.date || ""}
                                onChange={handleChange}
                                disabled={saving}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={editingAchievement?.description || ""}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Describe the achievement, its significance, and impact..."
                                disabled={saving}
                            />
                        </div>
                    </div>

                    <DialogFooter className="space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => setModalOpen(false)}
                            disabled={saving}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={saving || !editingAchievement?.title.trim() || !editingAchievement?.date}
                        >
                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {saving ? "Saving..." : (editingAchievement?._id ? "Update Achievement" : "Add Achievement")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}