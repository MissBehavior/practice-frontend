// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { useAuth, useAxios } from '@/services/auth-service'
// import React, { useEffect } from 'react'
// import MyEditor from '@/components/editor'
// import { SolutionsData } from '@/types'
// import { useTranslation } from 'react-i18next'
// interface SolutionsEditDetailProps {
//     data: SolutionsData | undefined
//     handleSubmit: (e: React.FormEvent) => Promise<void>
//     titleCard: string
//     contentMain: string
//     setTitleCard: (title: string) => void
//     setContentMain: (content: string) => void
//     handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void
// }

// function SolutionsEditDetail({
//     data,
//     handleSubmit,
//     titleCard,
//     contentMain,
//     setContentMain,
//     setTitleCard,
//     handleImage,
// }: SolutionsEditDetailProps) {
//     const { userToken } = useAuth()
//     const api = useAxios()
//     const { t } = useTranslation()
//     useEffect(() => {
//         setTitleCard(data ? data.titleCard : titleCard)
//     }, [])
//     return (
//         <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
//             <div
//                 className={
//                     'flex flex-wrap justify-center gap-4 items-start bg-white dark:bg-background'
//                 }
//             >
//                 <div
//                     className={`p-6 gap-5 bg-white dark:bg-slate-700 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-300 text-center items-center justify-center`}
//                 >
//                     <img
//                         className="w-64 object-cover rounded-t-md hover:scale-110 rounded transition-all duration-300 ease-in-out mx-auto"
//                         src={data!.contentMainImg}
//                         alt=""
//                     />
//                     <div className="my-4">
//                         <h1 className="text-2xl font-bold text-gray-700">
//                             {data ? data.titleCard : titleCard}
//                         </h1>
//                         <Input
//                             id="title"
//                             className="col-span-3 mb-6"
//                             type="text"
//                             value={titleCard}
//                             onChange={(e) => setTitleCard(e.target.value)}
//                         />
//                         <Input
//                             id="file"
//                             className="col-span-3 mb-6"
//                             type="file"
//                             onChange={handleImage}
//                         />

//                         <MyEditor
//                             valueEn={contentMain}
//                             setValueEn={setContentMain}
//                         />
//                     </div>
//                     <Button
//                         onClick={handleSubmit}
//                         type="submit"
//                         className="w-full"
//                     >
//                         {t('submit')}
//                     </Button>
//                 </div>
//             </div>
//         </form>
//     )
// }

// export default SolutionsEditDetail
