"use client"
import React from 'react'
import { FormikProps } from 'formik'

import Button from '@/ui/button'
import TextInput from '@/ui/text-input'

import { SendHorizonal, DiamondPlus } from 'lucide-react'

import { UserFormType } from '@/types/user/form'
import Select from '@/ui/select'

type Props = {
    useUserFormik: FormikProps<UserFormType>
    isEdit?: boolean;
    onResetToAdd: () => void;
    roles: { label: string; value: string }[]
    branches: { label: string; value: string }[]
}

const Add: React.FC<Props> = ({ useUserFormik, isEdit = false, onResetToAdd, roles,branches }) => {

    return (
        <div className='py-3 w-full h-full flex flex-col gap-4 bg-surface'>
            <div className="flex gap-2 px-3 items-center">
                <div className="rounded-lg bg-primary/10 text-primary flex items-center justify-center aspect-square w-6 h-6 ">
                    {/* <div className="rounded-lg bg-primary/10 text-primary dark:text-white flex items-center justify-center aspect-square w-6 h-6 "> */}
                    <DiamondPlus width={18} />
                </div>
                <h2 className='text-base font-medium'>
                    {isEdit ? 'Edit User ' : 'Add User '}
                </h2>
            </div>
            <form className='flex flex-col gap-4 px-3' onSubmit={useUserFormik.handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ">
                    {/* <Select
                        label="User Type"
                        name="type"
                        placeholder="Select User Type"
                        options={userTypes}
                        formik={useUserFormik}
                        variant="bordered"
                        radius="sm"
                        labelPlacement="outside"
                        size="sm"
                    /> */}

                    <Select
                        label="Role"
                        name="role"
                        placeholder="Select Role"
                        options={roles}
                        formik={useUserFormik}
                    />

                    <TextInput
                        label="Full Name"
                        name="name"
                        placeholder="Enter full name"
                        value={useUserFormik.values.name}
                        onChange={useUserFormik.handleChange}
                        error={!!useUserFormik.errors.name && !!useUserFormik.touched.name}
                        errorMessage={
                            typeof useUserFormik.errors.name === "string"
                                ? useUserFormik.errors.name
                                : ""
                        }
                    />

                    <TextInput
                        label="Email"
                        name="email"
                        placeholder="Enter email"
                        value={useUserFormik.values.email}
                        onChange={useUserFormik.handleChange}
                        error={!!useUserFormik.errors.email && !!useUserFormik.touched.email}
                        errorMessage={
                            typeof useUserFormik.errors.email === "string"
                                ? useUserFormik.errors.email
                                : ""
                        }
                    />
                    <Select
                        label="Branch"
                        name="branchId"
                        placeholder="Select Branch"
                        options={branches}
                        formik={useUserFormik}
                    />

                    {/* <TextInput
                        label="Mobile No."
                        name="mobileNumber"
                        placeholder="Enter mobile number"
                        value={useUserFormik.values.mobileNumber}
                        onChange={useUserFormik.handleChange}
                        error={
                            !!useUserFormik.errors.mobileNumber &&
                            !!useUserFormik.touched.mobileNumber
                        }
                        errorMessage={
                            typeof useUserFormik.errors.mobileNumber === "string"
                                ? useUserFormik.errors.mobileNumber
                                : ""
                        }
                    /> */}

                    {!isEdit && (
                        <TextInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            value={useUserFormik.values.password}
                            onChange={useUserFormik.handleChange}
                            error={
                                !!useUserFormik.errors.password &&
                                !!useUserFormik.touched.password
                            }
                            errorMessage={
                                typeof useUserFormik.errors.password === "string"
                                    ? useUserFormik.errors.password
                                    : ""
                            }
                        />
                    )}
                </div>
                <div className="flex gap-4">
                    <Button type='submit' className='w-24 rounded-lg'>{isEdit ? 'Update' : 'Submit'}</Button>
                    {isEdit && <Button type='button' className='w-24 bg-grey-200 text-black dark:bg-content1 dark:text-white border border-default-200 ' size='sm' onClick={onResetToAdd}>Cancel</Button>}
                </div>
            </form>
        </div>
    )
}

export default Add