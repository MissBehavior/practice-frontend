import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth, useAxios } from '@/services/auth-service'
import React, { useState } from 'react'
import { MdModeEdit } from 'react-icons/md'

function Profile() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const { userToken, user, setUser } = useAuth()
    const api = useAxios()

    const uploadProfileImage = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = async (e: any) => {
            const file = e.target.files[0]
            if (!file) return

            // Validate if file is an image
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file.')
                return
            }

            setSelectedFile(file)
            await handleFileUpload(file)
        }
        input.click()
    }

    const handleFileUpload = async (file: File) => {
        const formData = new FormData()
        formData.append('image', file)
        formData.append('userId', user.id)
        try {
            const response = await api.post('/user/uploadprofile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userToken!.accessToken}`,
                },
            })
            const updatedUser = {
                ...user,
                profileImgUrl: response.data.savedUser.profileImgUrl,
                profileImgPath: response.data.savedUser.profileImgUrl,
            }
            setUser(updatedUser) // Update the user state in AuthProvider
            localStorage.setItem('user', JSON.stringify(updatedUser)) // Sync with localStorage
        } catch (error) {
            console.error('Error uploading file:', error)
            alert('Failed to upload file')
        }
    }

    const deleteProfileImage = async () => {
        try {
            const response = await api.delete(
                `/user/deleteprofile/${user.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken!.accessToken}`,
                    },
                }
            )
            console.log(response)
            const updatedUser = {
                ...user,
                profileImgUrl: '',
                profileImgPath: '',
            }
            setUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))
        } catch (error) {
            console.error('Error deleting file:', error)
            alert('Failed to delete file')
        }
    }
    return (
        <>
            <div className="h-full bg-gray-200 dark:bg-slate-600 p-8">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl pb-8">
                    <div className="w-full h-[250px] rounded-tl-lg rounded-tr-lg bg-gradient-to-tr from-green-500 from-20% via-green-600 via-40% to-blue-600 dark:bg-gradient-to-tr dark:from-violet-900 dark:from-20% dark:via-cyan-700 dark:via-40% dark:to-pink-700"></div>
                    <div className="flex flex-col items-center -mt-20 profileIMG">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="hover:brightness-110 cursor-pointer">
                                    {user.profileImgUrl === '' ? (
                                        <svg
                                            className="w-36 h-36 text-gray-400 -left-1 bg-gray-300 rounded-full border-4 border-white dark:border-slate-500 p-2"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    ) : (
                                        <img
                                            src={user.profileImgUrl}
                                            alt="profile"
                                            className="w-36 h-36 -left-1 bg-gray-300 rounded-full border-4 border-white dark:border-slate-500 p-2"
                                        />
                                    )}
                                    <div className=" relative top-[-20px] ml-auto p-1 bg-slate-600 rounded-full w-12 flex items-center align-middle self-center flex-col">
                                        <MdModeEdit />
                                    </div>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="center"
                                className="flex flex-col gap-2"
                            >
                                <Button onClick={() => uploadProfileImage()}>
                                    Upload new Image
                                </Button>
                                <Button onClick={() => deleteProfileImage()}>
                                    Remove Image
                                </Button>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="flex items-center space-x-2 mt-2 dark:">
                            <p className="text-2xl text-gray-500 dark:text-gray-300">
                                {user.name}
                            </p>
                            <span
                                className="bg-blue-500 rounded-full p-1"
                                title="Verified"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-gray-100 h-2.5 w-2.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="4"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4 justify-center">
                    <div className="w-full flex flex-col 2xl:w-1/2 ">
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8 dark:bg-slate-800 text-gray-500 dark:text-gray-300">
                            <h4 className="text-xl text-gray-500 dark:text-gray-300 font-bold">
                                Personal Info
                            </h4>
                            <ul className="mt-2 ">
                                <li className="flex border-y py-2">
                                    <span className="font-bold w-24 dark:text-gray-200">
                                        Full name:
                                    </span>
                                    <span className="">{user.name}</span>
                                </li>

                                {/* <li className="flex border-b py-2">
                                    <span className="font-bold w-24 dark:text-gray-200">
                                        Joined:
                                    </span>
                                    <span className="">
                                        {new Date(user.createdAt).toDateString()}
                                    </span>
                                </li> */}
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24 dark:text-gray-200">
                                        Mobile:
                                    </span>
                                    <span className="">(123) 123-1234</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24 dark:text-gray-200">
                                        Email:
                                    </span>
                                    <span className="">{user.email}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24 ">
                                        Languages:
                                    </span>
                                    <span className="">English, Spanish</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
