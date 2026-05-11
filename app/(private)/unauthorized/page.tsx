import React from 'react'

type Props = {}

// Force dynamic rendering (disables Next.js static optimization)
export const dynamic = "force-dynamic";


const page = (props: Props) => {
  return (
    <div>unauthorized</div>
  )
}

export default page