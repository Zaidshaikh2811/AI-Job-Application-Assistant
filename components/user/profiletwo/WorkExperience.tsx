'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import {
    addWorkExperience,
    getWorkExperiences,
    updateWorkExperience,
    deleteWorkExperience,
} from '@/actions/user';

type Experience = {
    _id?: string;
    jobTitle: string;
    companyName: string;
    location: string;
    startDate: string;
    endDate?: string;
    currentlyWorking: boolean;
    responsibilities: string;
    technologies: string;
};

const initialForm: Experience = {
    jobTitle: '',
    companyName: '',
    location: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    responsibilities: '',
    technologies: '',
};

const WorkExperience = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [form, setForm] = useState<Experience>(initialForm);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const fetchExperiences = async () => {
        setIsLoading(true);
        try {

            const res = await getWorkExperiences();


            if (res.success) {
                const data = res.data as Experience[];


                setExperiences(data || []);
            } else {
                toast.error(res.error || 'Failed to load experiences');
            }
        }
        catch (error) {
            console.error('Error fetching experiences:', error);
            toast.error('An error occurred while loading experiences');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleCheckboxChange = (checked: boolean) => {
        setForm({
            ...form,
            currentlyWorking: checked,
            endDate: checked ? '' : form.endDate,
        });
    };

    const handleSubmit = async () => {
        // Convert technologies string to array
        setIsSubmitting(true);
        try {
            let technologiesArray: string[] = [];
            if (typeof form.technologies === 'string') {
                technologiesArray = form.technologies.split(',').map((tech) => tech.trim()).filter(Boolean);
            } else if (Array.isArray(form.technologies)) {
                technologiesArray = (form.technologies as string[]).filter(Boolean);
            }

            const formWithTechArray = {
                ...form,
                technologies: technologiesArray,
            };

            if (editingId) {
                const res = await updateWorkExperience(editingId, formWithTechArray);
                if (res.success) {
                    toast.success('Experience updated successfully');
                    resetForm();
                    fetchExperiences();
                } else {
                    toast.error(res.error || 'Failed to update experience');
                }
            } else {
                const res = await addWorkExperience(formWithTechArray);
                if (res.success) {
                    toast.success('Experience added successfully');
                    resetForm();
                    fetchExperiences();
                } else {
                    toast.error(res.error || 'Failed to add experience');
                }
            }
        }
        catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred while submitting the form');
        } finally {
            setIsSubmitting(false);
            // Close modal only on successful submission or if it's an add operation
            if (!editingId || (editingId && experiences.find(exp => exp._id === editingId))) {
                setIsModalOpen(false);
            }
        }
    };

    const resetForm = () => {
        setForm(initialForm);
        setEditingId(null);
        setIsModalOpen(false);
    };

    const handleEdit = (experience: Experience) => {
        // Ensure technologies is a string for the form input
        const formExperience = {
            ...experience,
            technologies: Array.isArray(experience.technologies) ? experience.technologies.join(', ') : experience.technologies,
        };
        setForm(formExperience);
        setEditingId(experience._id || null);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setForm(initialForm);
        setEditingId(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string | undefined) => {
        if (!id) return;
        setIsDeleting(id);
        try {

            const res = await deleteWorkExperience(id);
            if (res.success) {
                toast.success('Experience deleted successfully');
                fetchExperiences();
            } else {
                toast.error(res.error || 'Failed to delete experience');
            }
        }
        catch (err) {
            console.log(err);

            toast.error('An error occurred while deleting');
        } finally {
            setIsDeleting(null);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        });
    };


    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Work Experience</h2>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={handleAdd} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add Experience
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {editingId ? 'Edit Experience' : 'Add New Experience'}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="jobTitle">Job Title</Label>
                                    <Input
                                        id="jobTitle"
                                        name="jobTitle"
                                        value={form.jobTitle}
                                        onChange={handleChange}
                                        placeholder="Software Engineer"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="companyName">Company Name</Label>
                                    <Input
                                        id="companyName"
                                        name="companyName"
                                        value={form.companyName}
                                        onChange={handleChange}
                                        placeholder="Tech Corp"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                        placeholder="New York, NY"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="startDate">Start Date</Label>
                                    <Input
                                        id="startDate"
                                        type="date"
                                        name="startDate"
                                        value={form.startDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                {!form.currentlyWorking && (
                                    <div className="space-y-2">
                                        <Label htmlFor="endDate">End Date</Label>
                                        <Input
                                            id="endDate"
                                            type="date"
                                            name="endDate"
                                            value={form.endDate || ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                )}
                                <div className="flex items-center space-x-2 mt-6">
                                    <Checkbox
                                        id="currentlyWorking"
                                        checked={form.currentlyWorking}
                                        onCheckedChange={handleCheckboxChange}
                                    />
                                    <Label htmlFor="currentlyWorking">Currently Working</Label>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="responsibilities">Responsibilities</Label>
                                <Textarea
                                    id="responsibilities"
                                    name="responsibilities"
                                    value={form.responsibilities}
                                    onChange={handleChange}
                                    placeholder="Describe your key responsibilities and achievements..."
                                    rows={4}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="technologies">Technologies</Label>
                                <Input
                                    id="technologies"
                                    name="technologies"
                                    value={form.technologies}
                                    onChange={handleChange}
                                    placeholder="React, TypeScript, Node.js, etc."
                                />
                            </div>
                            <div className="flex justify-end space-x-2 pt-4">
                                <Button variant="outline" onClick={resetForm} disabled={isSubmitting}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit} disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {editingId ? 'Updating...' : 'Adding...'}
                                        </>
                                    ) : (
                                        <>{editingId ? 'Update Experience' : 'Add Experience'}</>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Experience List */}
            <div className="space-y-4">
                {
                    isLoading ? (
                        <Card>
                            <CardContent className="p-8 flex justify-center items-center">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <span className="ml-2">Loading experiences...</span>
                            </CardContent>
                        </Card>
                    ) :
                        experiences.length === 0 ? (
                            <Card>
                                <CardContent className="p-8 text-center text-muted-foreground">
                                    <p>No work experiences added yet.</p>
                                    <p className="text-sm mt-1">Click &quot;Add Experience&quot; to get started.</p>
                                </CardContent>
                            </Card>
                        ) : (
                            experiences.map((exp, idx) => (
                                <Card key={exp._id || idx} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-foreground">
                                                            {exp.jobTitle}
                                                        </h3>
                                                        <p className="text-lg text-muted-foreground font-medium">
                                                            {exp.companyName}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    📍 {exp.location}
                                                </p>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    📅 {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate || '')}
                                                </p>
                                                {exp.responsibilities && (
                                                    <div className="mb-3">
                                                        {exp.technologies && (
                                                            <div>
                                                                <p className="text-sm font-medium text-foreground mb-1">
                                                                    Technologies:
                                                                </p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {Array.isArray(exp.technologies)
                                                                        ? exp.technologies.join(', ')
                                                                        : exp.technologies}
                                                                </p>
                                                            </div>
                                                        )}
                                                        <p className="text-sm font-medium text-foreground mb-1">
                                                            Technologies:
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {exp.technologies}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-2 ml-4">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(exp)}
                                                    className="flex items-center gap-1"
                                                    disabled={isDeleting === exp._id}
                                                >
                                                    <Edit className="h-3 w-3" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(exp._id)}
                                                    className="flex items-center gap-1"
                                                    disabled={isDeleting === exp._id}
                                                >
                                                    {isDeleting === exp._id ? (
                                                        <Loader2 className="h-3 w-3 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="h-3 w-3" />
                                                    )}
                                                    {isDeleting === exp._id ? 'Deleting...' : 'Delete'}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
            </div>
        </div>
    );
};

export default WorkExperience;