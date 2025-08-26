import React, { FC } from 'react'

interface Props {
    children: React.ReactNode;
    label:string
}



const Fieldset:FC<Props> = ({children,label}) => {
  return (
    <fieldset>
        <label htmlFor="title" className='block text-sm mb-1'>
            {label} <span className='text-red-500'>*</span>
        </label>
        {children}
    </fieldset>
  )
}

export default Fieldset