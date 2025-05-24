"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
    Loader2,
    Plus,
    Edit,
    Trash2,
    ExternalLink,
    Award,
    Calendar,
    Building,
    AlertCircle,
    RefreshCw
} from "lucide-react";
import {
    addCertification,
    getCertifications,
    updateCertification,
    deleteCertification
} from "@/actions/user";
import { toast } from "sonner";

// Type definitions
interface Certification {
    _id: string;
    name: string;
    institution: string;
    dateCompleted: string;
    credentialUrl?: string;
}

interface CertificationFormData {
    name: string;
    institution: string;
    dateCompleted: string;
    credentialUrl: string;
}

interface FormErrors {
    name?: string;
    institution?: string;
    dateCompleted?: string;
    credentialUrl?: string;
}

interface ErrorState {
    hasError: boolean;
    message: string;
    canRetry: boolean;
}

// API Response types
interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
}

interface CertificationInput {
    name: string;
    institution: string;
    dateCompleted: string;
    credentialUrl?: string;
}

// Type guards
const isCertificationArray = (data: unknown): data is Certification[] => {
    return Array.isArray(data) && data.every((item): item is Certification =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as Certification)._id === 'string' &&
        typeof (item as Certification).name === 'string' &&
        typeof (item as Certification).institution === 'string' &&
        typeof (item as Certification).dateCompleted === 'string'
    );
};

const isApiResponse = (response: unknown): response is ApiResponse => {
    return typeof response === 'object' &&
        response !== null &&
        typeof (response as ApiResponse).success === 'boolean';
};

// Constants
const initialFormData: CertificationFormData = {
    name: "",
    institution: "",
    dateCompleted: "",
    credentialUrl: ""
};

const initialErrorState: ErrorState = {
    hasError: false,
    message: "",
    canRetry: false
};

export default function CertificationsPage() {
    // State definitions with explicit types
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [editingCert, setEditingCert] = useState<Certification | null>(null);
    const [formData, setFormData] = useState<CertificationFormData>(initialFormData);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [saving, setSaving] = useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [certToDelete, setCertToDelete] = useState<Certification | null>(null);
    const [deleting, setDeleting] = useState<boolean>(false);
    const [errorState, setErrorState] = useState<ErrorState>(initialErrorState);
    const [retryCount, setRetryCount] = useState<number>(0);

    // Maximum retry attempts for failed operations
    const MAX_RETRIES: number = 3;

    // Load certifications on component mount
    useEffect(() => {
        loadCertifications();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleError = (error: unknown, operation: string, canRetry: boolean = false): string => {
        console.error(`Error in ${operation}:`, error);

        let errorMessage = `Failed to ${operation}`;

        if (error instanceof Error) {
            // Check for specific error types
            if (error.message.includes('network') || error.message.includes('fetch')) {
                errorMessage = `Network error while trying to ${operation}. Please check your connection.`;
            } else if (error.message.includes('unauthorized') || error.message.includes('401')) {
                errorMessage = `Authentication failed. Please log in again.`;
            } else if (error.message.includes('forbidden') || error.message.includes('403')) {
                errorMessage = `You don't have permission to ${operation}.`;
            } else if (error.message.includes('validation')) {
                errorMessage = `Validation error: ${error.message}`;
            } else if (error.message) {
                errorMessage = error.message;
            }
        }

        setErrorState({
            hasError: true,
            message: errorMessage,
            canRetry
        });

        return errorMessage;
    };

    const clearError = (): void => {
        setErrorState(initialErrorState);
    };

    const loadCertifications = async (isRetry: boolean = false): Promise<void> => {
        try {
            if (!isRetry) {
                setLoading(true);
                clearError();
            }

            const result = await getCertifications();

            if (isApiResponse(result) && result.success && isCertificationArray(result.data)) {
                setCertifications(result.data);
                setRetryCount(0); // Reset retry count on success
            } else {
                const errorMsg = (isApiResponse(result) && result.error) || "Failed to load certifications";
                throw new Error(errorMsg);
            }
        } catch (error) {
            const errorMessage = handleError(error, "load certifications", true);

            if (!isRetry) {
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    const validateForm = (): boolean => {
        const errors: FormErrors = {};
        let isValid = true;

        // Required field validation
        if (!formData.name.trim()) {
            errors.name = "Certification name is required";
            isValid = false;
        } else if (formData.name.trim().length < 2) {
            errors.name = "Certification name must be at least 2 characters";
            isValid = false;
        } else if (formData.name.trim().length > 100) {
            errors.name = "Certification name must be less than 100 characters";
            isValid = false;
        }

        if (!formData.institution.trim()) {
            errors.institution = "Issuing organization is required";
            isValid = false;
        } else if (formData.institution.trim().length < 2) {
            errors.institution = "Organization name must be at least 2 characters";
            isValid = false;
        } else if (formData.institution.trim().length > 100) {
            errors.institution = "Organization name must be less than 100 characters";
            isValid = false;
        }

        if (!formData.dateCompleted) {
            errors.dateCompleted = "Completion date is required";
            isValid = false;
        } else {
            const selectedDate = new Date(formData.dateCompleted);
            const today = new Date();
            const minDate = new Date('1950-01-01');

            if (selectedDate > today) {
                errors.dateCompleted = "Completion date cannot be in the future";
                isValid = false;
            } else if (selectedDate < minDate) {
                errors.dateCompleted = "Please enter a valid completion date";
                isValid = false;
            }
        }

        // Optional URL validation
        if (formData.credentialUrl.trim() && !isValidUrl(formData.credentialUrl.trim())) {
            errors.credentialUrl = "Please enter a valid URL";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const isValidUrl = (string: string): boolean => {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch {
            return false;
        }
    };

    const openModal = (cert?: Certification): void => {
        try {
            if (cert) {
                setEditingCert(cert);
                setFormData({
                    name: cert.name || "",
                    institution: cert.institution || "",
                    dateCompleted: cert.dateCompleted ? cert.dateCompleted.split('T')[0] : '',
                    credentialUrl: cert.credentialUrl || '',
                });
            } else {
                setEditingCert(null);
                setFormData(initialFormData);
            }
            setFormErrors({});
            clearError();
            setModalOpen(true);
        } catch (error) {
            console.error("Error opening modal:", error);
            toast.error("Failed to open the modal. Please try again.");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        try {
            const { name, value } = e.target;

            // Clear specific field error when user starts typing
            if (formErrors[name as keyof FormErrors]) {
                setFormErrors(prev => ({
                    ...prev,
                    [name]: undefined
                }));
            }

            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        } catch (error) {
            console.error("Error handling input change:", error);
        }
    };

    const handleSave = async (): Promise<void> => {
        if (saving) return; // Prevent double submission

        try {
            setSaving(true);
            clearError();

            // Validate form
            if (!validateForm()) {
                toast.error("Please fix the errors in the form before saving.");
                return;
            }

            // Prepare data
            const dataToSave: CertificationInput = {
                name: formData.name.trim(),
                institution: formData.institution.trim(),
                dateCompleted: formData.dateCompleted,
                credentialUrl: formData.credentialUrl.trim() || undefined
            };

            let result: unknown;
            const operation = editingCert ? "update certification" : "add certification";

            if (editingCert) {
                if (!editingCert._id) {
                    throw new Error("Invalid certification ID");
                }
                result = await updateCertification(editingCert._id, dataToSave);
            } else {
                result = await addCertification(dataToSave);
            }

            if (isApiResponse(result) && result.success) {
                toast.success(`Certification ${editingCert ? "updated" : "added"} successfully`);
                setModalOpen(false);
                setFormData(initialFormData);
                setFormErrors({});
                setEditingCert(null);
                await loadCertifications();
            } else {
                const errorMsg = (isApiResponse(result) && result.error) || `Failed to ${operation}`;
                throw new Error(errorMsg);
            }
        } catch (error) {
            const errorMessage = handleError(error, editingCert ? "update certification" : "add certification");
            toast.error(errorMessage);
        } finally {
            setSaving(false);
        }
    };

    const openDeleteDialog = (cert: Certification): void => {
        try {
            if (!cert || !cert._id) {
                throw new Error("Invalid certification selected");
            }
            setCertToDelete(cert);
            setDeleteDialogOpen(true);
            clearError();
        } catch (error) {
            console.error("Error opening delete dialog:", error);
            toast.error("Failed to open the delete dialog. Please try again.");
        }
    };

    const handleDelete = async (): Promise<void> => {
        if (!certToDelete?._id || deleting) return;

        try {
            setDeleting(true);
            clearError();

            const result = await deleteCertification(certToDelete._id);

            if (isApiResponse(result) && result.success) {
                toast.success("Certification deleted successfully");
                setCertifications(prev =>
                    prev.filter(cert => cert._id !== certToDelete._id)
                );
            } else {
                const errorMsg = (isApiResponse(result) && result.error) || "Failed to delete certification";
                throw new Error(errorMsg);
            }
        } catch (error) {
            const errorMessage = handleError(error, "delete certification");
            toast.error(errorMessage, {
                description: errorMessage,
            });
        } finally {
            setDeleting(false);
            setDeleteDialogOpen(false);
            setCertToDelete(null);
        }
    };

    const handleRetry = async (): Promise<void> => {
        if (retryCount >= MAX_RETRIES) {
            toast.error("Maximum retry attempts reached. Please try again later.");
            return;
        }

        setRetryCount(prev => prev + 1);
        await loadCertifications(true);
    };

    const formatDate = (dateString: string): string => {
        try {
            if (!dateString) return "Date not available";

            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return "Invalid date";
            }

            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Date not available";
        }
    };

    const handleModalClose = (): void => {
        setModalOpen(false);
        setFormErrors({});
    };

    const handleCredentialClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string): void => {
        if (!isValidUrl(url)) {
            e.preventDefault();
            toast.error("Invalid URL format for credential link");
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading certifications...</span>
            </div>
        );
    }

    // Error state
    if (errorState.hasError && certifications.length === 0) {
        return (
            <div className="space-y-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="flex items-center justify-between">
                        <span>{errorState.message}</span>
                        {errorState.canRetry && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleRetry}
                                disabled={retryCount >= MAX_RETRIES}
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Retry ({retryCount}/{MAX_RETRIES})
                            </Button>
                        )}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Certifications</h1>
                    <p className="text-muted-foreground">
                        Manage your professional certifications and credentials
                    </p>
                </div>
                <Button onClick={() => openModal()} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Certification
                </Button>
            </div>

            {/* Error Alert (if any) */}
            {errorState.hasError && certifications.length > 0 && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="flex items-center justify-between">
                        <span>{errorState.message}</span>
                        {errorState.canRetry && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleRetry}
                                disabled={retryCount >= MAX_RETRIES}
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Retry
                            </Button>
                        )}
                    </AlertDescription>
                </Alert>
            )}

            {/* Certifications List */}
            {certifications.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Award className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No certifications yet</h3>
                        <p className="text-muted-foreground text-center mb-4">
                            Start building your professional profile by adding your certifications
                        </p>
                        <Button onClick={() => openModal()}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Your First Certification
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {certifications.map((cert) => (
                        <Card key={cert._id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <Award className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{cert.name || "Unnamed Certification"}</CardTitle>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                <Building className="h-4 w-4" />
                                                {cert.institution || "Unknown Organization"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openModal(cert)}
                                        >
                                            <Edit className="h-4 w-4" />
                                            <span className="sr-only">Edit</span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openDeleteDialog(cert)}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        Completed: {formatDate(cert.dateCompleted)}
                                    </div>
                                    {cert.credentialUrl && (
                                        <a
                                            href={cert.credentialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                                            onClick={(e) => handleCredentialClick(e, cert.credentialUrl || "")}
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            View Credential
                                        </a>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            {editingCert ? "Edit Certification" : "Add New Certification"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">
                                Certification Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="e.g., AWS Certified Solutions Architect"
                                autoFocus
                                className={formErrors.name ? "border-destructive" : ""}
                            />
                            {formErrors.name && (
                                <p className="text-sm text-destructive">{formErrors.name}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="institution">
                                Issuing Organization <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="institution"
                                name="institution"
                                value={formData.institution}
                                onChange={handleInputChange}
                                placeholder="e.g., Amazon Web Services"
                                className={formErrors.institution ? "border-destructive" : ""}
                            />
                            {formErrors.institution && (
                                <p className="text-sm text-destructive">{formErrors.institution}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="dateCompleted">
                                Date Completed <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="dateCompleted"
                                name="dateCompleted"
                                type="date"
                                value={formData.dateCompleted}
                                onChange={handleInputChange}
                                max={new Date().toISOString().split('T')[0]}
                                className={formErrors.dateCompleted ? "border-destructive" : ""}
                            />
                            {formErrors.dateCompleted && (
                                <p className="text-sm text-destructive">{formErrors.dateCompleted}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="credentialUrl">
                                Credential URL (optional)
                            </Label>
                            <Input
                                id="credentialUrl"
                                name="credentialUrl"
                                type="url"
                                value={formData.credentialUrl}
                                onChange={handleInputChange}
                                placeholder="https://example.com/verify/certificate"
                                className={formErrors.credentialUrl ? "border-destructive" : ""}
                            />
                            {formErrors.credentialUrl && (
                                <p className="text-sm text-destructive">{formErrors.credentialUrl}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={handleModalClose}
                            disabled={saving}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={saving}>
                            {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            {editingCert ? "Update" : "Save"} Certification
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Certification</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete &quot;{certToDelete?.name || 'this certification'}&quot;?
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={deleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {deleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}