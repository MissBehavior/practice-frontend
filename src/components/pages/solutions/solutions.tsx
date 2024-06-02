import { Link } from 'react-router-dom'
import classNamees from './solutions.module.css'

export default function Solutions() {
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
            </div>
            <Link to={`/solutions/` + 1} key={1}>
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
            </Link>
        </>
    )
}
