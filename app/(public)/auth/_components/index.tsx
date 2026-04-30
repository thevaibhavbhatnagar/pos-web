import React from 'react'
// import { ThemeToggle } from './theme'

type Props = {
    children: React.ReactNode
}

const AuthCard = ({ children }: Props) => {
    return (
        <div className='w-full max-w-md mx-auto bg-surface py-10 rounded-lg border border-default/60 shadow-lg dark:shadow-2xl dark:shadow-black/80 backdrop-blur-sm'>
            {/* <div className="flex justify-end">
                <ThemeToggle />
            </div> */}
            {children}
        </div>
    )
}

export default AuthCard