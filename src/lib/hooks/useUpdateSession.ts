'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react"

export function useUpdatedSession() {
    const { data: session, status, update } = useSession()

    useEffect(() => {
        const updateSession = async () => {
            await update()
        }

        // Update session on mount and when route changes
        void updateSession()
    }, [])

    return { session, status }
}

