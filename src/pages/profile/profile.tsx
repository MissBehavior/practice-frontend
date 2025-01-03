import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useAuth, useAxios } from '@/services/auth-service'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdModeEdit } from 'react-icons/md'
import Select, { MultiValue } from 'react-select'
import { languages as languagesMap } from './languages'
import clsx from 'clsx'

export type LanguageCode = string
export type Language = {
    name: string
    nativeName: string
}

interface userProfile {
    id: string
    name: string
    email: string
    telefon: string
    languages: LanguageCode[]
    profileImgUrl: string
    profileImgPath: string
    likedPosts: string[]
}

type Option = { value: string; label: string }

const languageOptions: Option[] = Object.entries(languagesMap).map(
    ([code, lang]) => ({
        value: code,
        label: `${lang.name} (${lang.nativeName})`,
    })
)

function Profile() {
    const { userToken, user, setUser } = useAuth()
    const api = useAxios()
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [open, setOpen] = useState(false)
    const { t } = useTranslation()
    const [userProfile, setUserProfile] = useState<userProfile>()
    const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>(
        []
    )

    const [isDirty, setIsDirty] = useState(false)

    const fetchUserData = async () => {
        try {
            const response = await api.get(`/user/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${userToken!.accessToken}`,
                },
            })
            const userData: userProfile = response.data
            setUserProfile(userData)
            const mappedOptions = userData.languages
                .map((langCode: LanguageCode) => {
                    const lang = languagesMap[langCode]
                    if (lang) {
                        return {
                            value: langCode,
                            label: `${lang.name} (${lang.nativeName})`,
                        }
                    }
                    return null
                })
                .filter((opt: any): opt is Option => opt !== null)
            setSelectedOptions(mappedOptions)
        } catch (error) {
            console.error('Error fetching user data:', error)
            alert('Failed to fetch user data')
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    const handleProfileChange = (field: keyof userProfile, value: string) => {
        setUserProfile((prev) => (prev ? { ...prev, [field]: value } : prev))
        setIsDirty(true)
    }

    const handleSelectChange = (opts: MultiValue<Option>) => {
        setSelectedOptions(opts)
        setIsDirty(true)
    }

    const handleSaveChanges = async () => {
        if (!userProfile) return

        // Extract the language codes from selectedOptions
        const updatedLanguages = selectedOptions.map((opt) => opt.value)

        const updatedUser: userProfile = {
            ...userProfile,
            languages: updatedLanguages,
        }

        try {
            const response = await api.patch(`/user/${user.id}`, updatedUser, {
                headers: {
                    Authorization: `Bearer ${userToken!.accessToken}`,
                },
            })
            setUserProfile(updatedUser)
            setIsDirty(false)
        } catch (error) {
            console.error('Error updating profile:', error)
            alert('Failed to update profile')
        }
    }

    const handleCancelChanges = () => {
        if (!userProfile) return

        // Reset languages
        const mappedOptions = userProfile.languages
            .map((langCode) => {
                const lang = languagesMap[langCode]
                if (lang) {
                    return {
                        value: langCode,
                        label: `${lang.name} (${lang.nativeName})`,
                    }
                }
                return null
            })
            .filter((opt): opt is Option => opt !== null)
        setSelectedOptions(mappedOptions)
        setIsDirty(false)
    }

    const closeMenu = () => setOpen(false)
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
        closeMenu()
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
            setUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))
            // Also update userProfile if present
            setUserProfile((prev) =>
                prev
                    ? {
                          ...prev,
                          profileImgUrl: updatedUser.profileImgUrl,
                          profileImgPath: updatedUser.profileImgPath,
                      }
                    : prev
            )
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
            const updatedUser = {
                ...user,
                profileImgUrl: '',
                profileImgPath: '',
            }
            setUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))
            // Update userProfile
            setUserProfile((prev) =>
                prev ? { ...prev, profileImgUrl: '', profileImgPath: '' } : prev
            )
            closeMenu()
        } catch (error) {
            console.error('Error deleting file:', error)
            alert('Failed to delete file')
        }
    }

    return (
        <div className="min-h-screen bg-slate-300 dark:bg-[#101010] p-8">
            <div className="bg-white dark:bg-[#191919] rounded-lg shadow-xl pb-8">
                <div className="w-full h-[250px] rounded-tl-lg rounded-tr-lg bg-gradient-to-tr from-green-500 from-20% via-green-600 via-40% to-blue-600 dark:bg-gradient-to-tr dark:from-violet-900 dark:from-20% dark:via-cyan-700 dark:via-40% dark:to-pink-700"></div>
                <div className="flex flex-col items-center -mt-20 profileIMG">
                    <DropdownMenu open={open} onOpenChange={setOpen}>
                        <DropdownMenuTrigger asChild>
                            <div className="hover:brightness-110 cursor-pointer">
                                {userProfile?.profileImgUrl === '' ? (
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
                                        src={userProfile?.profileImgUrl}
                                        alt="profile"
                                        className="w-36 h-36 -left-1 bg-gray-300 rounded-full border-4 border-white dark:border-slate-500 p-2"
                                    />
                                )}
                                <div className=" relative top-[-20px] ml-auto p-1 bg-slate-200 dark:bg-slate-600 rounded-full w-12 flex items-center align-middle self-center flex-col">
                                    <MdModeEdit />
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="center"
                            className="flex flex-col gap-2"
                        >
                            <Button onClick={uploadProfileImage}>
                                {t('upload_image')}
                            </Button>
                            <Button onClick={deleteProfileImage}>
                                {t('delete_image')}
                            </Button>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex items-center space-x-2 mt-2 dark:">
                        <p className="text-2xl text-gray-500 dark:text-gray-300">
                            {userProfile?.name}
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
                    <div className="flex-1 bg-white rounded-lg shadow-xl p-8 dark:bg-[#191919] text-gray-500 dark:text-gray-300">
                        <h4 className="text-xl text-gray-500 dark:text-gray-300 font-bold">
                            {t('profile_info')}
                        </h4>
                        <ul className="mt-2 ">
                            <li className="flex border-y py-2">
                                <span className="font-bold w-24 dark:text-gray-200">
                                    {t('name')}
                                </span>
                                <input
                                    type="text"
                                    value={userProfile?.name || ''}
                                    onChange={(e) =>
                                        handleProfileChange(
                                            'name',
                                            e.target.value
                                        )
                                    }
                                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200 dark:bg-[#191919] dark:text-gray-200 dark:border-gray-600"
                                    placeholder="Enter your full name"
                                />
                            </li>
                            <li className="flex border-b py-2">
                                <span className="font-bold w-24 dark:text-gray-200">
                                    {t('phone')}
                                </span>
                                <input
                                    type="text"
                                    value={userProfile?.telefon || ''}
                                    onChange={(e) =>
                                        handleProfileChange(
                                            'telefon',
                                            e.target.value
                                        )
                                    }
                                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200 dark:bg-[#191919] dark:text-gray-200 dark:border-gray-600"
                                    placeholder="Enter your mobile number"
                                />
                            </li>
                            <li className="flex border-b py-2">
                                <span className="font-bold w-24 dark:text-gray-200">
                                    {t('email')}
                                </span>
                                <Input
                                    onChange={(e) =>
                                        handleProfileChange(
                                            'email',
                                            e.target.value
                                        )
                                    }
                                    disabled
                                    type="email"
                                    placeholder="Enter your email"
                                    value={userProfile?.email || ''}
                                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200 dark:bg-[#191919] dark:text-gray-200 dark:border-gray-600"
                                />
                            </li>
                            <li className="flex border-b py-2">
                                <span className="font-bold w-24 ">
                                    {t('languages')}
                                </span>
                                <Select
                                    isMulti
                                    options={languageOptions}
                                    value={selectedOptions}
                                    className="flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200 dark:bg-[#101010] dark:text-gray-200 dark:border-gray-600"
                                    placeholder="Enter languages spoken"
                                    classNames={{
                                        control: ({ isFocused }) =>
                                            clsx(
                                                'border rounded-md flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#191919] dark:text-gray-200 dark:border-gray-600',
                                                isFocused
                                                    ? 'border-primary-500'
                                                    : 'border-gray-300'
                                            ),
                                        option: ({ isFocused, isSelected }) =>
                                            clsx(
                                                'text-gray-900 dark:text-gray-900',
                                                isFocused
                                                    ? 'bg-primary-100'
                                                    : '',
                                                isSelected
                                                    ? 'bg-primary-500'
                                                    : ''
                                            ),
                                    }}
                                    onChange={handleSelectChange}
                                />
                            </li>
                        </ul>
                        {isDirty && (
                            <div className="mt-4 flex space-x-4">
                                <button
                                    onClick={handleSaveChanges}
                                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                >
                                    {t('save_changes')}
                                </button>
                                <button
                                    onClick={handleCancelChanges}
                                    className="p-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                                >
                                    {t('cancel')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
