'use client'

import {useRouter} from "next/navigation";
import {useContext, useState} from "react";
import {AuthContext} from "@/components/contexts";


export default function SignUp() {
    const router = useRouter()
    const {setUser} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', e.target.name.value)
        formData.append('email', e.target.email.value)
        formData.append('password', e.target.password.value)
        formData.append('picture', e.target.picture.files[0])
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }



        fetch("http://localhost:3001/api/1.0/user/signup", {
            method: "POST",
            body: formData,
        }).then(res => res.json()).then(data => {
            // localStorage.setItem("token", data.access_token)
            console.log("response data: ", data)
            router.replace("/")
        }).catch(err => {
            console.error(err)
            alert("註冊失敗")
        })
    };


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="flex justify-center items-center lg:flex-1">
                        <a href="#" className="flex items-center -m-1.5 p-1.5">
                            <img className="h-14 w-auto" src="https://cdn-icons-png.flaticon.com/512/1079/1079115.png" alt="" />
                        </a>
                    </div>
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up for an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-6" action="" onSubmit={handleSubmit} method="POST">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                   htmlFor="picture">上傳大頭貼</label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                id="picture" name="picture" type="file">
                            </input>
                            {/*<div className="flex items-center justify-between">*/}
                            {/*    <div className="flex items-center">*/}
                            {/*        <input*/}
                            {/*            id="remember-me"*/}
                            {/*            name="remember-me"*/}
                            {/*            type="checkbox"*/}
                            {/*            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
                            {/*        />*/}
                            {/*        <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">*/}
                            {/*            Remember me*/}
                            {/*        </label>*/}
                            {/*    </div>*/}

                            {/*    <div className="text-sm leading-6">*/}
                            {/*        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                            {/*            Forgot password?*/}
                            {/*        </a>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-amber-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>

                        {/*<div>*/}
                        {/*    <div className="relative mt-10">*/}
                        {/*        <div className="absolute inset-0 flex items-center" aria-hidden="true">*/}
                        {/*            <div className="w-full border-t border-gray-200"/>*/}
                        {/*        </div>*/}
                        {/*        <div className="relative flex justify-center text-sm font-medium leading-6">*/}
                        {/*            <span className="bg-white px-6 text-gray-900">Or continue with</span>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}

                        {/*    <div className="mt-6 grid grid-cols-2 gap-4">*/}
                        {/*        <a*/}
                        {/*            href="http://localhost:3001/users/google"*/}
                        {/*            className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"*/}
                        {/*        >*/}
                        {/*            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">*/}
                        {/*                <path*/}
                        {/*                    d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>*/}
                        {/*            </svg>*/}
                        {/*            <span className="text-sm font-semibold leading-6">Google</span>*/}
                        {/*        </a>*/}

                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>

                    {/*<p className="mt-10 text-center text-sm text-gray-500">*/}
                    {/*    Not a member?{' '}*/}
                    {/*    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">*/}
                    {/*        Start a 14 day free trial*/}
                    {/*    </a>*/}
                    {/*</p>*/}
                </div>
            </div>
        </>
    )
}