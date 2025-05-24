import { Suspense } from 'react'
// import ProfilePage from './profile'
import Loading from '@/app/loading'
import ProfileTwo from './profiletwo'
const page = async () => {
    return (
        <main>
            {/* Any content wrapped in a <Suspense> boundary will be streamed */}
            <Suspense fallback={< Loading />}>
                {/* <ProfilePage /> */}
                <ProfileTwo />            </Suspense>
        </main>
    )
}

export default page
