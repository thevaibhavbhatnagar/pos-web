import React from 'react'

type Props = {
    children: React.ReactNode
}

const AuthCard = ({ children }: Props) => {
    return (
        <div className='w-full bg-white dark:bg-zinc-900/80 backdrop-blur-xl p-8 sm:p-10 rounded-[1.5rem] border border-slate-200 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgb(234,179,8,0.1)] transition-shadow duration-500 animate-in fade-in zoom-in-95'>
            {children}
        </div>
    )
}

export default AuthCard