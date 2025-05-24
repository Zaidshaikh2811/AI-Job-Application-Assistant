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
import { Plus, Edit, Trash2, GraduationCap } from 'lucide-react';
import {
    addEducation,
    getEducation,
    updateEducation,
    deleteEducation,
} from '@/actions/user';

type Education = {
    _id?: string;
    degree: string;
    institution: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
    currentlyStudying: boolean;
    grade: string;
    description: string;
};

const initialForm: Education = {
    degree: '',
    institution: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    currentlyStudying: false,
    grade: '',
    description: '',
};

const EducationPage = () => {
    const [educationList, setEducationList] = useState<Education[]>([]);
    const [form, setForm] = useState<Education>(initialForm);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchEducation = async () => {
        setLoading(true);
        try {
            const res = await getEducation();
            if (res.success) {
                // Convert ISO dates to YYYY-MM format for inputs
                const educationArray = res.data as Education[];
                const formattedEducation = educationArray.map((edu: Education) => ({
                    ...edu,
                    startDate: edu.startDate ? new Date(edu.startDate).toISOString().substring(0, 7) : '',
                    endDate: edu.endDate ? new Date(edu.endDate).toISOString().substring(0, 7) : '',
                }));
                setEducationList(formattedEducation);
            } else {
                toast.error(res.error || 'Failed to load education');
            }
        } catch {
            toast.error('Failed to load education');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEducation();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleCheckboxChange = (checked: boolean) => {
        setForm({
            ...form,
            currentlyStudying: checked,
            endDate: checked ? '' : form.endDate,
        });
    };

    const handleSubmit = async () => {
        // Basic validation
        if (!form.degree || !form.institution || !form.startDate) {
            toast.error('Please fill in required fields (degree, institution, start date)');
            return;
        }

        setLoading(true);
        try {
            if (editingId) {
                const res = await updateEducation(editingId, form);
                if (res.success) {
                    toast.success('Education updated successfully');
                    resetForm();
                    fetchEducation();
                } else {
                    toast.error(res.error || 'Failed to update education');
                }
            } else {
                const res = await addEducation(form);
                if (res.success) {
                    toast.success('Education added successfully');
                    resetForm();
                    fetchEducation();
                } else {
                    toast.error(res.error || 'Failed to add education');
                }
            }
        } catch {
            toast.error('An error occurred while saving');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setForm(initialForm);
        setEditingId(null);
        setIsModalOpen(false);
    };

    const handleEdit = (education: Education) => {
        setForm(education);
        setEditingId(education._id || null);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setForm(initialForm);
        setEditingId(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string | undefined) => {
        if (!id) return;

        if (!confirm('Are you sure you want to delete this education entry?')) {
            return;
        }

        setLoading(true);
        try {
            const res = await deleteEducation(id);
            if (res.success) {
                toast.success('Education deleted successfully');
                fetchEducation();
            } else {
                toast.error(res.error || 'Failed to delete education');
            }
        } catch {
            toast.error('Failed to delete education');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        return new Date(dateString + '-01').toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <GraduationCap className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-bold">Education</h2>
                </div>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={handleAdd} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add Education
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {editingId ? 'Edit Education' : 'Add New Education'}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="degree">Degree *</Label>
                                    <Input
                                        id="degree"
                                        name="degree"
                                        value={form.degree}
                                        onChange={handleChange}
                                        placeholder="Bachelor of Science"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="fieldOfStudy">Field of Study</Label>
                                    <Input
                                        id="fieldOfStudy"
                                        name="fieldOfStudy"
                                        value={form.fieldOfStudy}
                                        onChange={handleChange}
                                        placeholder="Computer Science"
                                    />
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="institution">Institution *</Label>
                                    <Input
                                        id="institution"
                                        name="institution"
                                        value={form.institution}
                                        onChange={handleChange}
                                        placeholder="University of Technology"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="startDate">Start Date *</Label>
                                    <Input
                                        id="startDate"
                                        type="month"
                                        name="startDate"
                                        value={form.startDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {!form.currentlyStudying && (
                                    <div className="space-y-2">
                                        <Label htmlFor="endDate">End Date</Label>
                                        <Input
                                            id="endDate"
                                            type="month"
                                            name="endDate"
                                            value={form.endDate || ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                )}
                                <div className="flex items-center space-x-2 mt-6">
                                    <Checkbox
                                        id="currentlyStudying"
                                        checked={form.currentlyStudying}
                                        onCheckedChange={handleCheckboxChange}
                                    />
                                    <Label htmlFor="currentlyStudying">Currently Studying</Label>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="grade">GPA/Grade</Label>
                                    <Input
                                        id="grade"
                                        name="grade"
                                        value={form.grade}
                                        onChange={handleChange}
                                        placeholder="3.8/4.0 or First Class Honours"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Relevant coursework, achievements, or additional details..."
                                    rows={3}
                                />
                            </div>
                            <div className="flex justify-end space-x-2 pt-4">
                                <Button variant="outline" onClick={resetForm} disabled={loading}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit} disabled={loading}>
                                    {loading ? 'Saving...' : (editingId ? 'Update Education' : 'Add Education')}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Education List */}
            <div className="space-y-4">
                {loading && educationList.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center text-muted-foreground">
                            <p>Loading education entries...</p>
                        </CardContent>
                    </Card>
                ) : educationList.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center text-muted-foreground">
                            <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg mb-2">No education entries added yet.</p>
                            <p className="text-sm">Click &quot;Add Education&quot; to get started.</p>
                        </CardContent>
                    </Card>
                ) : (
                    educationList.map((edu, idx) => (
                        <Card key={edu._id || idx} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-xl font-semibold text-foreground">
                                                    {edu.degree}
                                                    {edu.fieldOfStudy && (
                                                        <span className="text-muted-foreground font-normal">
                                                            {' '}in {edu.fieldOfStudy}
                                                        </span>
                                                    )}
                                                </h3>
                                                <p className="text-lg text-muted-foreground font-medium">
                                                    {edu.institution}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            📅 {formatDate(edu.startDate)} - {edu.currentlyStudying ? 'Present' : formatDate(edu.endDate || '')}
                                        </p>
                                        {edu.grade && (
                                            <div className="mb-3">
                                                <p className="text-sm font-medium text-foreground mb-1">
                                                    Grade:
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {edu.grade}
                                                </p>
                                            </div>
                                        )}
                                        {edu.description && (
                                            <div>
                                                <p className="text-sm font-medium text-foreground mb-1">
                                                    Description:
                                                </p>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {edu.description}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(edu)}
                                            disabled={loading}
                                            className="flex items-center gap-1"
                                        >
                                            <Edit className="h-3 w-3" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(edu._id)}
                                            disabled={loading}
                                            className="flex items-center gap-1"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                            Delete
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

export default EducationPage;