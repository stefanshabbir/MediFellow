"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConfirmPage() {
    const router = useRouter()
    const [message, setMessage] = useState("Verifying your invitation...")
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const supabase = createClient()

        // Check if we have a session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                // User is authenticated, redirect to set password
                router.replace('/set-password')
            } else {
                // Listen for auth state change (in case it's processing the hash)
                const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
                    if (event === 'SIGNED_IN' || session) {
                        router.replace('/set-password')
                    } else if (event === 'SIGNED_OUT') {
                        // If we are still here after a timeout, show error
                        setTimeout(() => {
                            setError("Could not verify invitation. Please try clicking the link again.")
                        }, 3000)
                    }
                })

                return () => subscription.unsubscribe()
            }
        })
    }, [router])

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-muted px-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-destructive">Verification Failed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{error}</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted px-4">
            <Card className="w-full max-w-md">
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                        <p className="text-muted-foreground">{message}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
