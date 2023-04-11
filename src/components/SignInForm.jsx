import React, { useState } from 'react'
import mainApi from '../api/mainApi'
import "../styles/form.css"
import { useFormik } from 'formik'


const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    orgName: "",
    gstNumber: "",
    mobNumber: "",
    address: "",
    email: "",
    password: ""
}


const validate = (values) => {

    let errors = {}

    if (!values.firstName) {
        errors.firstName = "Required"
    }
    if (!values.lastName) {
        errors.lastName = "Required"
    }
    if (!values.orgName) {
        errors.orgName = "Required"
    }
    if (!values.address) {
        errors.address = "Required"
    }

    if (!values.gstNumber) {
        errors.gstNumber = "Required"
    }

    else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i.test(values.gstNumber)) {
        errors.gstNumber = "Invalid GST Number"
    }

    if (!values.email) {
        errors.email = "Required"
    }
    else if (!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email"
    }

    if (!values.mobNumber) {
        errors.mobNumber = "Required"
    } else if (!/^(\+\d{1,3}[- ]?)?\d{10}$/i.test(values.mobNumber)) {
        errors.mobNumber = "Invalid Number"
    }

    if (!values.password) {
        errors.password = "Required"
    }
    else if (!/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/i.test(values.password)) {
        errors.password = "Weak password"
    }
    return errors
}



const SignInForm = () => {
    const [mainError, setMainError] = useState("")
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            setLoading(true)
            setMainError("")
            try {
                const response = await mainApi.post("/signup", values)

                alert("Created Successfully!")
            } catch (error) {
                setMainError(error.response.data.error)
            }
            setLoading(false)
        },
        validate
    })

    return (
        <div className='signup-form-container'>
            <form onSubmit={formik.handleSubmit}>
                <div>

                    <div className='input-box'>
                        <label htmlFor="">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                        {formik.errors.firstName && <span className='error'>{formik.errors.firstName}</span>}
                    </div>
                    <div className='input-box'>
                        <label htmlFor="">Middle Name</label>
                        <input
                            type="text"
                            name="middleName"
                            onChange={formik.handleChange}
                            value={formik.values.middleName}
                        />
                    </div>
                    <div className='input-box'>
                        <label htmlFor="">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                        {formik.errors.lastName && <span className='error'>{formik.errors.lastName}</span>}
                    </div>

                </div>

                <div className='input-box'>
                    <label htmlFor="">Org. Name</label>
                    <input
                        type="text"
                        name="orgName"
                        onChange={formik.handleChange}
                        value={formik.values.orgName}
                    />
                    {formik.errors.orgName && <span className='error'>{formik.errors.orgName}</span>}
                </div>
                <div className='input-box'>
                    <label htmlFor="">GST Number</label>
                    <input
                        type="text"
                        name="gstNumber"
                        onChange={formik.handleChange}
                        value={formik.values.gstNumber}
                    />
                    {formik.errors.gstNumber && <span className='error'>{formik.errors.gstNumber}</span>}
                </div>
                <div className='input-box'>
                    <label htmlFor="">Mob. Number</label>
                    <input
                        type="text"
                        name="mobNumber"
                        onChange={formik.handleChange}
                        value={formik.values.mobNumber}
                    />
                    {formik.errors.mobNumber && <span className='error'>{formik.errors.mobNumber}</span>}
                </div>
                <div className='input-box'>
                    <label htmlFor="">Email</label>
                    <input
                        type="text"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email && <span className='error'>{formik.errors.email}</span>}
                </div>
                <div className='input-box'>
                    <label htmlFor="">Address</label>
                    <input
                        type="text"
                        name="address"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                    />
                    {formik.errors.address && <span className='error'>{formik.errors.address}</span>}
                </div>
                <div className='input-box'>
                    <label htmlFor="">Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password && <span className='error'>{formik.errors.password}</span>}
                </div>
                <div style={{ textAlign: "center" }}>
                    {mainError && <span className='error' >{mainError}</span>}
                    {
                        loading ?
                            <button class="btn btn-dark" type="button" disabled>
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Signup...
                            </button>
                            :
                            <button class="btn btn-dark" type="submit" >
                                Signup
                            </button>
                    }
                </div>
            </form>
        </div>
    )
}

export default SignInForm