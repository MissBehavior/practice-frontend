// import { Button } from '@/components/ui/button'
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from '@/components/ui/dialog'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { useAuth, useAxios } from '@/services/auth-service'
// import axios from 'axios'
// import React from 'react'
// import { useTranslation } from 'react-i18next'
// import { IoMdAddCircleOutline } from 'react-icons/io'

// interface GalleryDetailAddProps {
//     fetchData: () => void
// }
// function GalleryDetailAdd({ fetchData }: GalleryDetailAddProps) {
//     const { userToken } = useAuth()
//     const api = useAxios()
//     const [image, setImage] = React.useState<File | null>(null)
//     const [open, setOpen] = React.useState(false)
//     const { t } = useTranslation()

//     const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//         console.log('Image selected')
//         console.log(e.target.files?.[0])
//         const file = e.target.files?.[0]
//         if (file) {
//             setImage(file)
//         } else {
//             setImage(null)
//         }
//     }

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault()
//         console.log('HANDLE SUBMIT')
//         console.log(image)
//         if (!image) {
//             alert('Please select an image to upload.')
//             return
//         }

//         const formData = new FormData()
//         formData.append('image', image)
//         try {
//             const response = await api.post('/gallery/api/upload/', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     Authorization: `Bearer ${userToken!.accessToken}`,
//                 },
//             })
//             console.log(response.data)
//         } catch (error) {
//             console.error('Error uploading image:', error)
//         }
//         setOpen(false)
//         fetchData()
//     }
//     return (
//         <div className="mt-16 mb-12 min-h-64 bg-gray-100 dark:bg-background flex justify-center items-center select-none">
//             <div className="">
//                 <Dialog open={open} onOpenChange={setOpen}>
//                     <DialogTrigger asChild>
//                         <div className="p-6 bg-white dark:bg-slate-400 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-300 text-center items-center justify-center cursor-pointer">
//                             {t('newSolution')}
//                             <h1 className="text-2xl font-bold text-gray-700 flex center justify-center">
//                                 <IoMdAddCircleOutline />
//                             </h1>
//                         </div>
//                     </DialogTrigger>
//                     <DialogContent className="sm:max-w-[425px]">
//                         <DialogHeader>
//                             <DialogTitle>{t('Galgallerylery')}</DialogTitle>
//                             <DialogDescription></DialogDescription>
//                         </DialogHeader>
//                         <form
//                             className="grid gap-4 py-4"
//                             // onSubmit={handleSubmit}
//                         >
//                             <div className="grid grid-cols-4 items-center gap-4">
//                                 <Label htmlFor="file" className="text-right">
//                                     {t('image')}
//                                 </Label>
//                                 <Input
//                                     id="file"
//                                     className="col-span-3"
//                                     type="file"
//                                     onChange={handleImage}
//                                 />
//                             </div>
//                         </form>
//                         <DialogFooter>
//                             <Button /*onClick={handleSubmit}*/ type="submit">
//                                 {t('submit')}
//                             </Button>
//                         </DialogFooter>
//                     </DialogContent>
//                 </Dialog>
//             </div>
//         </div>
//     )
// }

// export default GalleryDetailAdd
