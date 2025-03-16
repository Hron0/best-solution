'use client'
import {  } from "@/lib/data/auth"
import { Button } from '@/components/ui/button';
import {signOut} from "next-auth/react";
import {useUpdatedSession} from "@/lib/hooks/useUpdateSession";

const Page = () => {
  const {session, status} = useUpdatedSession()

  return (
    <div className="flex flex-col gap-4 absolute top-1/3">
        <h1 className='white text-3xl'>
            {session?.user.email}
            <br />
            {session?.user.role}
        </h1>
          <Button variant="secondary" onClick={() => signOut()}>Sign Out</Button>
    </div>
  )
}

export default Page