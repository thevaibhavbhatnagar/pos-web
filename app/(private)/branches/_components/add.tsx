"use client"
import React from 'react'
import { FormikProps } from 'formik'

import Button from '@/ui/button'
import Select from '@/ui/select'
import TextInput from '@/ui/text-input'

import {DiamondPlus, SendHorizonal} from 'lucide-react'

import { BranchFormType } from '@/types/branch/form'


type Props = {
    useBranchFormik: FormikProps<BranchFormType>
    isEdit?: boolean;
    onResetToAdd: () => void;
}

const Add: React.FC<Props> = ({ useBranchFormik, isEdit = false, onResetToAdd }) => {

    return (
        <div className='py-3 rounded-lg w-full h-full flex flex-col gap-4 bg-surface'>
            <div className="flex gap-2 px-3 items-center">
                <div className="rounded-lg bg-primary/10 text-primary flex items-center justify-center aspect-square w-6 h-6 ">
                    <DiamondPlus width={18} />
                </div>
                <h2 className='text-base font-medium'>
                    {isEdit ? 'Edit Branch ' : 'Add Branch '}
                </h2>
            </div>
            <form className='flex flex-col gap-4 px-3' onSubmit={useBranchFormik.handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ">                  

                    <TextInput
                        label="Branch Name"
                        name="name"
                        placeholder="Enter branch name"
                        value={useBranchFormik.values.name}
                        onChange={useBranchFormik.handleChange}
                        error={
                            !!useBranchFormik.errors.name &&
                            !!useBranchFormik.touched.name
                        }
                        errorMessage={
                            typeof useBranchFormik.errors.name === "string"
                                ? useBranchFormik.errors.name
                                : ""
                        }
                    />

                </div>
                <div className="flex gap-4">
                    <Button type='submit' className='w-24 rounded-lg'>{isEdit ? 'Update' : 'Submit'}</Button>
                    {isEdit && <Button type='button' className='w-24 rounded-lg bg-field-background text-field-foreground' size='sm' onClick={onResetToAdd}>Cancel</Button>}
                </div>
            </form>
        </div>
    )
}

export default Add