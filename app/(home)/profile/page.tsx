import { Suspense } from 'react'
import ProfilePage from './profile'
import Loading from '@/app/loading'
const page = async () => {
    return (
        <main>
            {/* Any content wrapped in a <Suspense> boundary will be streamed */}
            <Suspense fallback={< Loading />}>
                <ProfilePage />
            </Suspense>
        </main>
    )
}

export default page
