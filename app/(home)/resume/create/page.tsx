import { Suspense } from 'react'
import ResumeForm from './ResumeForm'

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResumeForm />
        </Suspense>
    )
}
