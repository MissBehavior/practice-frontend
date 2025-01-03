const UserCard = ({
    count,
    date,
    type,
}: {
    count: number
    date: string
    type: string
}) => {
    return (
        <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px] dark:bg-[#191919] bg-[#f2f2f2]">
            <div className="flex justify-between items-center">
                <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
                    {date}
                </span>
            </div>
            <h1 className="text-2xl font-semibold my-4">{count}</h1>
            <h2 className="capitalize text-sm font-medium text-gray-500">
                {type}
            </h2>
        </div>
    )
}

export default UserCard
