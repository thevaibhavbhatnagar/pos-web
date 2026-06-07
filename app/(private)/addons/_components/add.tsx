"use client"
import React from 'react'
import { FormikProps } from 'formik'

import Button from '@/ui/button'
import TextInput from '@/ui/text-input'

import { DiamondPlus } from 'lucide-react'

import { AddonFormType } from '@/types/addon/form'
import Select from '@/ui/select'

type Props = {
    formik: FormikProps<AddonFormType>
    isEdit?: boolean;
    onResetToAdd: () => void;
    statuses: { label: string; value: string }[]
}

const Add: React.FC<Props> = ({ formik, isEdit = false, onResetToAdd, statuses }) => {
    return (
        <div className='py-3 w-full h-full flex flex-col gap-4 bg-surface md:col-span-1'>
            <div className="flex gap-2 px-3 items-center">
                <div className="rounded-lg bg-primary/10 text-primary flex items-center justify-center aspect-square w-6 h-6 ">
                    <DiamondPlus width={18} />
                </div>
                <h2 className='text-base font-medium'>
                    {isEdit ? 'Edit Addon ' : 'Add Addon '}
                </h2>
            </div>
            <form className='flex flex-col gap-4 px-3' onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 gap-4 ">
                    <TextInput
                        label="Addon Name"
                        name="name"
                        placeholder="Enter addon name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={!!formik.errors.name && !!formik.touched.name}
                        errorMessage={
                            typeof formik.errors.name === "string"
                                ? formik.errors.name
                                : ""
                        }
                    />

                    <TextInput
                        label="Price"
                        name="price"
                        placeholder="Enter price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={!!formik.errors.price && !!formik.touched.price}
                        errorMessage={
                            typeof formik.errors.price === "string"
                                ? formik.errors.price
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
                    {isEdit && <Button type='button' className='w-24 rounded-lg' size='sm' onClick={onResetToAdd}>Cancel</Button>}
                </div>
            </form>
        </div>
    )
}

export default Add
