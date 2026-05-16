"use client";

import React from 'react'

type Props = {
    children: React.ReactNode
}

const AuthCard = ({ children }: Props) => {
    return (
        <div className='w-full'>
            {children}
        </div>
    )
}

export default AuthCard