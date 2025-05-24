import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Plus,
    Edit2,
    Trash2,
    Globe,
    Loader2,
    Search,
    Filter
} from "lucide-react";
import { addLanguage, deleteLanguage, getLanguages, updateLanguage } from "@/actions/user";
import { toast } from "sonner";

interface Language {
    _id: string;
    name: string;
    proficiency: string;
}

const proficiencyLevels = [
    { value: "Basic", color: "bg-red-100 text-red-800 border-red-300" },
    { value: "Intermediate", color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
    { value: "Fluent", color: "bg-blue-100 text-blue-800 border-blue-300" },
    { value: "Native", color: "bg-green-100 text-green-800 border-green-300" },
];


const getProficiencyColor = (proficiency: string) => {
    const level = proficiencyLevels.find(l => l.value === proficiency);
    return level?.color || "bg-gray-100 text-gray-800 border-gray-300";
};

export default function LanguagesPage() {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [filteredLanguages, setFilteredLanguages] = useState<Language[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingLang, setEditingLang] = useState<Language | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterProficiency, setFilterProficiency] = useState<string>("all");

    // Filter languages based on search and proficiency filter
    useEffect(() => {
        let filtered = languages;

        if (searchTerm) {
            filtered = filtered.filter(lang =>
                lang.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterProficiency !== "all") {
            filtered = filtered.filter(lang => lang.proficiency === filterProficiency);
        }

        setFilteredLanguages(filtered);
    }, [languages, searchTerm, filterProficiency]);

    const fetchLanguages = async () => {
        try {
            setLoading(true);
            const result = await getLanguages();
            console.log("Fetched languages:", result);

            if (result.success) {
                setLanguages(Array.isArray(result.data) ? result.data as Language[] : []);
            } else {
                console.error("Failed to fetch languages:", result.error);
            }
        } catch (error) {
            console.error("Error fetching languages:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLanguages();
    }, []);

    function openModal(lang?: Language) {
        if (lang) {
            setEditingLang(lang);
        } else {
            setEditingLang({ _id: "", name: "", proficiency: "" });
        }
        setModalOpen(true);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!editingLang) return;
        const { name, value } = e.target;
        setEditingLang({ ...editingLang, [name]: value });
    }

    function handleProficiencyChange(value: string) {
        if (!editingLang) return;
        setEditingLang({ ...editingLang, proficiency: value });
    }

    const handleSave = async () => {
        if (!editingLang || !editingLang.name.trim() || !editingLang.proficiency) {
            return;
        }

        setSaving(true);

        // Simulate API call

        if (!editingLang._id) {
            // Adding new language
            const newLang = {
                ...editingLang,
                _id: Date.now().toString()
            };
            const resp = await addLanguage({
                name: newLang.name,
                proficiency: newLang.proficiency as 'Basic' | 'Intermediate' | 'Fluent' | 'Native'
            })
            if (!resp.success) {
                toast.error("Failed to add language: " + resp.error);
                setSaving(false);
                return;
            }
            toast.success("Language added successfully!");
            setLanguages(prev => [...prev, newLang]);
        } else {
            // Updating existing language
            setLanguages(prev =>
                prev.map(lang => (lang._id === editingLang._id ? editingLang : lang))
            );
            const resp = await updateLanguage(editingLang._id, {
                name: editingLang.name,
                proficiency: editingLang.proficiency as 'Basic' | 'Intermediate' | 'Fluent' | 'Native'
            });
            if (!resp.success) {
                toast.error("Failed to update language: " + resp.error);
                setSaving(false);
                return;
            }
            toast.success("Language updated successfully!");
        }

        setModalOpen(false);
        setEditingLang(null);
        setSaving(false);

    };

    const handleDelete = async (languageId: string) => {
        if (!confirm("Are you sure you want to delete this language?")) {
            return;
        }

        try {
            const result = await deleteLanguage(languageId);
            if (result.success) {
                setLanguages(prev => prev.filter(lang => lang._id !== languageId));
            } else {
                console.error("Failed to delete language:", result.error);
            }
        } catch (error) {
            console.error("Error deleting language:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-muted-foreground">Loading your languages...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Globe className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Languages</h1>
                            <p className="text-muted-foreground">
                                Manage your language skills and proficiency levels
                            </p>
                        </div>
                    </div>
                    <Button onClick={() => openModal()} className="flex items-center space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>Add Language</span>
                    </Button>
                </div>

                {/* Search and Filter Section */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search languages..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <Select value={filterProficiency} onValueChange={setFilterProficiency}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Filter by level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Levels</SelectItem>
                                {proficiencyLevels.map(level => (
                                    <SelectItem key={level.value} value={level.value}>
                                        {level.value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Languages Grid */}
            {filteredLanguages.length === 0 ? (
                <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                        <Globe className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                        {languages.length === 0 ? "No languages added yet" : "No languages match your search"}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        {languages.length === 0
                            ? "Start building your language portfolio by adding your first language."
                            : "Try adjusting your search terms or filters."
                        }
                    </p>
                    {languages.length === 0 && (
                        <Button onClick={() => openModal()} variant="default">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Your First Language
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredLanguages.map(lang => (
                        <Card key={lang._id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Globe className="h-5 w-5 text-muted-foreground" />
                                        <CardTitle className="text-lg">{lang.name}</CardTitle>
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className={`${getProficiencyColor(lang.proficiency)} border`}
                                    >
                                        {lang.proficiency}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="flex justify-end space-x-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => openModal(lang)}
                                        className="flex items-center space-x-1"
                                    >
                                        <Edit2 className="h-3 w-3" />
                                        <span>Edit</span>
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleDelete(lang._id)}
                                        className="text-destructive hover:text-destructive flex items-center space-x-1"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                        <span>Delete</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Stats Summary */}
            {languages.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Language Summary</CardTitle>
                        <CardDescription>Your language proficiency overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {proficiencyLevels.map(level => {
                                const count = languages.filter(lang => lang.proficiency === level.value).length;
                                return (
                                    <div key={level.value} className="text-center">
                                        <div className="text-2xl font-bold">{count}</div>
                                        <div className="text-sm text-muted-foreground">{level.value}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Add/Edit Language Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                            <Globe className="h-5 w-5" />
                            <span>{editingLang?._id ? "Edit" : "Add"} Language</span>
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Language Name *</Label>
                            <Input
                                id="name"
                                name="name"
                                value={editingLang?.name || ""}
                                onChange={handleChange}
                                placeholder="e.g., Spanish, French, Mandarin"
                                autoFocus
                                disabled={saving}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="proficiency">Proficiency Level *</Label>
                            <Select
                                onValueChange={handleProficiencyChange}
                                value={editingLang?.proficiency || ""}
                                disabled={saving}
                            >
                                <SelectTrigger id="proficiency">
                                    <SelectValue placeholder="Select your proficiency level" />
                                </SelectTrigger>
                                <SelectContent>
                                    {proficiencyLevels.map(level => (
                                        <SelectItem key={level.value} value={level.value}>
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-3 h-3 rounded-full ${level.color.split(' ')[0]}`} />
                                                <span>{level.value}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
                            disabled={saving || !editingLang?.name.trim() || !editingLang?.proficiency}
                        >
                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {saving ? "Saving..." : (editingLang?._id ? "Update Language" : "Add Language")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}