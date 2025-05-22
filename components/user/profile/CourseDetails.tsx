"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const CourseDetails = () => {
    const [courses, setCourses] = useState([
        {
            title: "",
            link: "",
            issuer: "",
            license: "",
            issueDate: "",
            expirationDate: "",
            additionalInfo: "",
        },
    ])

    const handleChange = (index: number, field: string, value: string) => {
        const updated = [...courses]
        updated[index][field as keyof typeof updated[0]] = value
        setCourses(updated)
    }

    const addCourse = () => {
        setCourses([
            ...courses,
            {
                title: "",
                link: "",
                issuer: "",
                license: "",
                issueDate: "",
                expirationDate: "",
                additionalInfo: "",
            },
        ])
    }

    const removeCourse = (index: number) => {
        setCourses(courses.filter((_, i) => i !== index))
    }

    const handleSave = () => {
        console.log("Courses:", courses)
        // You can integrate with API or state here
    }

    return (
        <div className="space-y-8 p-0 md:p-6 w-full">
            {courses.map((course, index) => (
                <div
                    key={index}
                    className="border p-4 rounded-md shadow-sm space-y-4 "
                >
                    <div>
                        <Label className="mb-2">Course Title</Label>
                        <Input
                            placeholder="e.g. Advanced React"
                            value={course.title}
                            onChange={(e) => handleChange(index, "title", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Course Link</Label>
                        <Input
                            placeholder="https://course-link.com"
                            value={course.link}
                            onChange={(e) => handleChange(index, "link", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Issuer</Label>
                        <Input
                            placeholder="e.g. Coursera"
                            value={course.issuer}
                            onChange={(e) => handleChange(index, "issuer", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">License</Label>
                        <Input
                            placeholder="e.g. ABC-123456"
                            value={course.license}
                            onChange={(e) => handleChange(index, "license", e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-2">Issue Date</Label>
                            <Input
                                type="date"
                                value={course.issueDate}
                                onChange={(e) => handleChange(index, "issueDate", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label className="mb-2">Expiration Date</Label>
                            <Input
                                type="date"
                                value={course.expirationDate}
                                onChange={(e) =>
                                    handleChange(index, "expirationDate", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="mb-2">Additional Info</Label>
                        <Textarea
                            placeholder="e.g. Covered advanced concepts and hands-on projects"
                            value={course.additionalInfo}
                            onChange={(e) =>
                                handleChange(index, "additionalInfo", e.target.value)
                            }
                        />
                    </div>

                    <Button
                        variant="destructive"
                        onClick={() => removeCourse(index)}
                        disabled={courses.length === 1}
                    >
                        Remove
                    </Button>
                </div >
            ))}

            <div className="flex gap-4">
                <Button onClick={addCourse} variant="outline">
                    + Add Course
                </Button>
                <Button onClick={handleSave}>Save Courses</Button>
            </div>
        </div >
    )
}

export default CourseDetails
