"use client"
import React from 'react'
import { FormikProps } from 'formik'

import Button from '@/ui/button'
import TextInput from '@/ui/text-input'

import { DiamondPlus } from 'lucide-react'

import { CategoryFormType } from '@/types/category/form'
import Select from '@/ui/select'

type Props = {
    formik: FormikProps<CategoryFormType>
    isEdit?: boolean;
    onResetToAdd: () => void;
    statuses: { label: string; value: string }[]
}

const Add: React.FC<Props> = ({ formik, isEdit = false, onResetToAdd, statuses }) => {

    return (
        <div className='py-3 w-full h-full flex flex-col gap-4 bg-surface md:col-span-1'>
            <div className="flex gap-2 px-3 items-center">
                <div className="rounded-lg bg-primary/10 text-primary flex items-center justify-center aspect-square w-6 h-6 ">
                    {/* <div className="rounded-lg bg-primary/10 text-primary dark:text-white flex items-center justify-center aspect-square w-6 h-6 "> */}
                    <DiamondPlus width={18} />
                </div>
                <h2 className='text-base font-medium'>
                    {isEdit ? 'Edit Category ' : 'Add Category '}
                </h2>
            </div>
            <form className='flex flex-col gap-4 px-3' onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 gap-4 ">

                    <TextInput
                        label="Category Name"
                        name="name"
                        placeholder="Enter category name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={!!formik.errors.name && !!formik.touched.name}
                        errorMessage={
                            typeof formik.errors.name === "string"
                                ? formik.errors.name
                                : ""
                        }
                    />

                    <Select
                        label="Status"
                        name="isActive"
                        placeholder="Select status"
                        options={statuses}
                        formik={formik}
                    />


                </div>
                <div className="flex gap-4">
                    <Button type='submit' className='w-24 rounded-lg'>{isEdit ? 'Update' : 'Submit'}</Button>
                    {isEdit && <Button type='button' className='w-24 rounded-lg bg-field-background text-field-foreground ' size='sm' onClick={onResetToAdd}>Cancel</Button>}
                </div>
            </form>
        </div>
    )
}

export default Add