"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2, FolderOpen, ExternalLink, Github } from "lucide-react";
import {
    addProject,
    getProjects,
    updateProject,
    deleteProject,
} from "@/actions/user"; // Adjust import path as needed

interface Project {
    _id?: string;
    title: string;
    description: string;
    technologies?: string[];
    githubLink?: string;
    liveLink?: string;
    // For compatibility with the original component
    link?: string;
}

// API Response types
interface ApiResponse<T = unknown> {
    success: boolean;
    error?: string;
    data?: T;
}

// Backend project type (for type safety when transforming data)
interface BackendProject {
    _id?: string;
    title: string;
    description: string;
    technologies?: string[];
    githubLink?: string;
    liveLink?: string;
}

const initialForm: Project = {
    title: "",
    description: "",
    link: "",
};

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch projects on component mount
    const fetchProjects = async (): Promise<void> => {
        setLoading(true);
        try {
            const res = await getProjects() as ApiResponse<BackendProject[]>;
            if (res.success && res.data) {
                // Transform backend data to match frontend interface
                const transformedProjects: Project[] = res.data.map((project: BackendProject) => ({
                    ...project,
                    // Create a generic 'link' field for the frontend
                    link: project.githubLink || project.liveLink || ''
                }));
                setProjects(transformedProjects);
            } else {
                toast.error(res.error || 'Failed to load projects');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to load projects';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    function openModal(project?: Project): void {
        if (project) {
            setEditingProject(project);
        } else {
            setEditingProject(initialForm);
        }
        setModalOpen(true);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        if (!editingProject) return;
        const { name, value } = e.target;
        setEditingProject({ ...editingProject, [name]: value });
    }

    async function handleSave(): Promise<void> {
        if (!editingProject || !editingProject.title.trim()) {
            toast.error('Please enter a project title');
            return;
        }

        setLoading(true);
        try {
            if (editingProject._id) {
                // Update existing project
                const res = await updateProject(editingProject._id, editingProject) as ApiResponse;
                if (res.success) {
                    toast.success('Project updated successfully');
                    await fetchProjects();
                    closeModal();
                } else {
                    toast.error(res.error || 'Failed to update project');
                }
            } else {
                // Add new project
                const res = await addProject(editingProject) as ApiResponse;
                if (res.success) {
                    toast.success('Project added successfully');
                    await fetchProjects();
                    closeModal();
                } else {
                    toast.error(res.error || 'Failed to add project');
                }
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred while saving';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(projectId?: string): Promise<void> {
        if (!projectId) return;

        if (!confirm('Are you sure you want to delete this project?')) {
            return;
        }

        setLoading(true);
        try {
            const res = await deleteProject(projectId) as ApiResponse;
            if (res.success) {
                toast.success('Project deleted successfully');
                await fetchProjects();
            } else {
                toast.error(res.error || 'Failed to delete project');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to delete project';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    function closeModal(): void {
        setModalOpen(false);
        setEditingProject(null);
    }

    function getProjectIcon(link: string) {
        if (link.includes('github.com')) {
            return <Github className="h-4 w-4" />;
        }
        return <ExternalLink className="h-4 w-4" />;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <FolderOpen className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-bold">Projects</h2>
                </div>
                <Button onClick={() => openModal()} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Project
                </Button>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
                {loading && projects.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center text-muted-foreground">
                            <p>Loading projects...</p>
                        </CardContent>
                    </Card>
                ) : projects.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center text-muted-foreground">
                            <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg mb-2">No projects added yet.</p>
                            <p className="text-sm">Click &quot;Add Project&quot; to showcase your work.</p>
                        </CardContent>
                    </Card>
                ) : (
                    projects.map((proj) => (
                        <Card key={proj._id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row justify-between items-start">
                                    <div className="flex-1 mb-4 md:mb-0 md:pr-4">
                                        <h3 className="text-xl font-semibold text-foreground mb-2">
                                            {proj.title}
                                        </h3>
                                        {proj.description && (
                                            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                                                {proj.description}
                                            </p>
                                        )}
                                        {proj.technologies && proj.technologies.length > 0 && (
                                            <div className="mb-3">
                                                <p className="text-sm font-medium text-foreground mb-1">
                                                    Technologies:
                                                </p>
                                                <div className="flex flex-wrap gap-1">
                                                    {proj.technologies.map((tech, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {proj.link && (
                                            <a
                                                href={proj.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                                            >
                                                {getProjectIcon(proj.link)}
                                                View Project
                                            </a>
                                        )}
                                    </div>
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openModal(proj)}
                                            disabled={loading}
                                            className="flex items-center gap-1 flex-1 md:flex-none"
                                        >
                                            <Edit className="h-3 w-3" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(proj._id)}
                                            disabled={loading}
                                            className="flex items-center gap-1 flex-1 md:flex-none"
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

            {/* Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingProject?._id ? "Edit Project" : "Add New Project"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Project Title *</Label>
                            <Input
                                id="title"
                                name="title"
                                value={editingProject?.title || ""}
                                onChange={handleChange}
                                autoFocus
                                placeholder="My Awesome Project"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={editingProject?.description || ""}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Describe what this project does, the problem it solves, and key features..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="link">Project Link (optional)</Label>
                            <Input
                                id="link"
                                name="link"
                                value={editingProject?.link || ""}
                                onChange={handleChange}
                                placeholder="https://github.com/username/project or https://myproject.com"
                            />
                            <p className="text-xs text-muted-foreground">
                                Add a GitHub repository link or live demo URL
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2">
                        <Button variant="outline" onClick={closeModal} disabled={loading}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={loading}>
                            {loading ? 'Saving...' : (editingProject?._id ? "Update Project" : "Add Project")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}