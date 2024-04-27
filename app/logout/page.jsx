'use client'
import React, { useEffect } from 'react'
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

const LogoutPage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            await signOut();
            sessionStorage.removeItem("hasRunOnce");
        };
        //if session is present then logout
        if (session) {
            logout();
        } else {
            //else navigate to auth page
            router.push('/auth');
        }
    }, [session, router]);

    return (
        <div className='h-[88vh] w-screen text-center text-xl font-semibold text-active-orange flex items-center justify-center'>
            Logging out your account...
        </div>
    );
};

export default LogoutPage;
