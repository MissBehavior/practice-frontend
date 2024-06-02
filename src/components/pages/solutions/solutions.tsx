import { Link } from 'react-router-dom'
import classNamees from './solutions.module.css'
import { useAuth } from '@/services/auth-service'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function Solutions() {
    const handleClick = () => {
        console.log('clicked')
    }
    const { user } = useAuth()
    return (
        <>
            <div className={classNamees.container}>
                {Array(3)
                    .fill(0)
                    .map((_, index) => (
                        <Link to={`/solutions/` + index} key={index}>
                            <div className="mt-16 mb-12 min-h-64 bg-gray-100 flex justify-center items-center ">
                                <div className="p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-300 text-center items-center justify-center">
                                    <img
                                        className="w-64 object-cover rounded-t-md hover:scale-110 rounded transition-all duration-300 ease-in-out"
                                        src="/solutions/colibri-image-126.png"
                                        alt=""
                                    />
                                    <div className="mt-4">
                                        <h1 className="text-2xl font-bold text-gray-700">
                                            test
                                        </h1>
                                        <p className="text-base mt-2 text-cyan-600">
                                            test
                                        </p>
                                        <p className="text-sm mt-2 text-gray-700 max-w-64">
                                            test
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                {user.isAdmin && (
                    <div
                        className="mt-16 mb-12 min-h-64 bg-gray-100 flex justify-center items-center select-none"
                        onClick={handleClick}
                    >
                        <div className="p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-300 text-center items-center justify-center cursor-pointer">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="mt-4">
                                        Add new solution
                                        <h1 className="text-2xl font-bold text-gray-700">
                                            ✏
                                        </h1>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>New Category</DialogTitle>
                                        <DialogDescription>
                                            Add image, title and description
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="file"
                                                className="text-right"
                                            >
                                                Image
                                            </Label>
                                            <Input
                                                id="file"
                                                className="col-span-3"
                                                type="file"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="title"
                                                className="text-right"
                                            >
                                                Title
                                            </Label>
                                            <Input
                                                id="title"
                                                placeholder="Solution title"
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="description"
                                                className="text-right"
                                            >
                                                Description
                                            </Label>
                                            <Input
                                                id="description"
                                                placeholder="Solution description"
                                                className="col-span-3"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Submit</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                )}
            </div>

            {/* <Link to={`/solutions/` + 1} key={1}>
                <div className="mt-16 mb-12 min-h-64 bg-gray-100 flex justify-center items-center">
                    <div
                        className={`p-6 bg-white rounded-xl shadow-xl hover:border-2 hover:border-solid hover:border-pink-600 hover:shadow-2xl hover:scale-105 transition-all transform duration-500 text-center items-center justify-center`}
                    >
                        <img
                            className="w-64 object-cover rounded-t-md"
                            src="/solutions/colibri-image-126.png"
                            alt=""
                        />
                        <div className="mt-4">
                            <h1 className="text-2xl font-bold text-gray-700">
                                test
                            </h1>
                            <p className="text-base mt-2 text-cyan-600">test</p>
                            <p className="text-sm mt-2 text-gray-700 max-w-64">
                                test
                            </p>
                        </div>
                    </div>
                </div>
            </Link> */}
        </>
    )
}
