import React from 'react'
import InputForm from './InputForm'
import EnquirySchema from '@models/schema/EnquirySchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from './Button';
const formInputFields = (commonProps) => [
    {
        label: "Phone Number",
        elementType: "input",
        type: "number",
        name: "phone",
        ...commonProps,
    },
    {
        label: "Other Email",
        elementType: "input",
        type: "text",
        name: "email",
        ...commonProps,
    },
    {
        label: "Description",
        elementType: "textarea",
        name: "description",
        ...commonProps,
    },
]
const EnquiryForm = ({listing_id, session}) => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
        trigger,
        getValues,
        clearErrors,
        setValue,
    } = useForm({
        resolver: zodResolver(EnquirySchema),
    });
    const commonProps = { control, errors, register, setValue, getValues };
    const submitEnquiry = async (data) =>{
        try {
            const result = await fetch('/api/enquiry/new',{
                method: 'POST',
                body: JSON.stringify({...data, creator: session?.user?.id, property_listing: listing_id}),
            })
            console.log(await result.json())
        } catch (error) {
            console.error(error)
        }
    }
    if(!session?.user){
        return <div className='w-full h-full text-xl font-bold flex justify-center items-center text-red-500'>Please Login to make an Enquiry!</div>
    }
    return (
        <form 
        className='w-full flex flex-col'
        onSubmit={handleSubmit(submitEnquiry)}
        >
            <InputForm inputFeilds={formInputFields(commonProps)} />
            <Button 
            className={'uppercase tracking-wide mx-4 my-1 md:mx-6 lg:mx-8'}
            type = 'submit'
            >Submit</Button>
        </form>
    )
}

export default EnquiryForm