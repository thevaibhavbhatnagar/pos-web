"use client"
import React, { useEffect } from 'react'
import { FormikProps } from 'formik'

import Button from '@/ui/button'
import TextInput from '@/ui/text-input'

import { DiamondPlus } from 'lucide-react'

import { ProductFormType } from '@/types/product/form'
import Select from '@/ui/select'
import MultiSelect from '@/ui/multi-select'
import FileDragUpload from '@/ui/file-drag-upload'
import axiosInstance from '@/utils/axiosInstance'
import apiEndpoints from '@/utils/endpoints'

type Props = {
    formik: FormikProps<ProductFormType>
    isEdit?: boolean;
    onResetToAdd: () => void;
    statuses: { label: string; value: string }[];
    categories: { label: string; value: string }[];
    addons: { label: string; value: string }[];
}

const Add: React.FC<Props> = ({ formik, isEdit = false, onResetToAdd, statuses, categories, addons }) => {

    const [uploading, setUploading] = React.useState(false);
    const [preview, setPreview] = React.useState("");

    useEffect(() => {
        setPreview(formik.values.image || "");
    }, [formik.values.image]);

    const uploadImage = async (file: File) => {

        try {
            setUploading(true);

            // local preview
            setPreview(URL.createObjectURL(file));

            const formData = new FormData();

            formData.append("file", file);

            const response = await axiosInstance.post(apiEndpoints.product.upload, formData);

            return response.data;
        } catch (error) {
            console.error(error);
            alert("Image upload failed");
        } finally {
            setUploading(false);
        }
    };
    return (
        <div className='py-3 w-full h-full flex flex-col gap-4 bg-surface md:col-span-1'>
            <div className="flex gap-2 px-3 items-center">
                <div className="rounded-lg bg-primary/10 text-primary flex items-center justify-center aspect-square w-6 h-6 ">
                    {/* <div className="rounded-lg bg-primary/10 text-primary dark:text-white flex items-center justify-center aspect-square w-6 h-6 "> */}
                    <DiamondPlus width={18} />
                </div>
                <h2 className='text-base font-medium'>
                    {isEdit ? 'Edit Product ' : 'Add Product '}
                </h2>
            </div>
            <form className='flex flex-col gap-4 px-3' onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 gap-4 ">

                    <TextInput
                        label="Name"
                        name="name"
                        placeholder="Enter Name"
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
                        label="Enter Price"
                        name="price"
                        placeholder="Enter Price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={!!formik.errors.price && !!formik.touched.price}
                        errorMessage={
                            typeof formik.errors.name === "string"
                                ? formik.errors.name
                                : ""
                        }
                    />
                    <Select
                        label="Select Category"
                        name="categoryId"
                        placeholder="Select Category"
                        options={categories}
                        formik={formik}
                    />

                    <MultiSelect
                        label="Select Addons"
                        name="addonIds"
                        placeholder="Select Addons"
                        options={addons}
                        formik={formik}
                        required={false}
                    />

                    <Select
                        label="Status"
                        name="isActive"
                        placeholder="Select Status"
                        options={statuses}
                        formik={formik}
                    />

                    <Select
                        label="Kot Required"
                        name="isKotRequired"
                        placeholder="Select Kot Required"
                        options={statuses}
                        formik={formik}
                    />

                    {/* 
                    <FileDragUpload
                        label="Image"
                        onFileSelect={(file) => {
                            formik.setFieldValue("image", file);
                        }}
                    /> */}

                    {/* Upload */}

                    <FileDragUpload
                        label="Image"
                        onFileSelect={async (file) => {

                            const uploaded =
                                await uploadImage(file);

                            if (!uploaded) return;

                            // cloudinary image url
                            formik.setFieldValue(
                                "image",
                                uploaded.url
                            );

                            // cloudinary public id
                            formik.setFieldValue(
                                "imagePublicId",
                                uploaded.public_id
                            );

                            // preview
                            setPreview(uploaded.url);
                        }}
                    />

                    {/* Preview */}

                    {preview && (
                        <img
                            src={preview}
                            alt="preview"
                            className="
                                w-32
                                h-32
                                rounded-xl
                                object-cover
                                border
                            "
                        />
                    )}


                </div>
                <div className="flex gap-4">

                    <Button
                        type="submit"
                        disabled={uploading}
                        className="w-24 rounded-lg"
                    >
                        {uploading
                            ? "Uploading..."
                            : isEdit
                                ? "Update"
                                : "Submit"}
                    </Button>

                    {isEdit && <Button type='button' className='w-24 rounded-lg' size='sm' onClick={onResetToAdd}>Cancel</Button>}
                </div>
            </form>
        </div>
    )
}

export default Add