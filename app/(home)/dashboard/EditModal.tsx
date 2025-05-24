import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type EditModalProps = {
    section: string;
    mode: "edit" | "add";
    existingData?: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        linkedin: string;
        portfolio: string;
    };
    onSave: (section: string, form: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        linkedin: string;
        portfolio: string;
    }) => void;
    onClose: () => void;
};

export const EditModal: React.FC<EditModalProps> = ({ section, mode, existingData, onSave, onClose }) => {
    const [form, setForm] = useState({
        fullName: "", email: "", phone: "",
        location: "", linkedin: "", portfolio: ""
    })

    useEffect(() => {
        if (mode === "edit" && existingData) {
            setForm(existingData)
        }
    }, [existingData, mode])



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = () => {
        onSave(section, form)
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{mode === "edit" ? "Edit" : "Add"} {section === "personalInfo" && "Personal Info"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-3">
                    <div>
                        <Label>Full Name</Label>
                        <Input name="fullName" value={form.fullName} onChange={handleChange} />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input name="email" value={form.email} onChange={handleChange} />
                    </div>
                    <div>
                        <Label>Phone</Label>
                        <Input name="phone" value={form.phone} onChange={handleChange} />
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input name="location" value={form.location} onChange={handleChange} />
                    </div>
                    <div>
                        <Label>LinkedIn</Label>
                        <Input name="linkedin" value={form.linkedin} onChange={handleChange} />
                    </div>
                    <div>
                        <Label>Portfolio / GitHub</Label>
                        <Input name="portfolio" value={form.portfolio} onChange={handleChange} />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>{mode === "edit" ? "Update" : "Save"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
