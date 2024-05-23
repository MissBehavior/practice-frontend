import classNamees from "./people.module.css";
const mockdata = [
  {
    name: "Andrius",
    role: "Group's manager",
    text: "I have been working at Winbas almost since the first steps of the company. I am inspired by working with people – the experience and knowledge I have gained gives me the opportunity to help younger colleagues who have just started taking their first steps in an international company. In addition, it is a great opportunity to get to know the Scandinavian culture.",
    imgUrl: "/people/Andrius-1.png",
  },
  {
    name: "Marius",
    role: "Group's manager",
    text: "I have been working at Winbas almost since the first steps of the company. I am inspired by working with people – the experience and knowledge I have gained gives me the opportunity to help younger colleagues who have just started taking their first steps in an international company. In addition, it is a great opportunity to get to know the Scandinavian culture.",

    imgUrl: "/people/Marius-1.png",
  },
  {
    name: "Povilas",
    role: "Group's manager",
    text: "I have been working at Winbas almost since the first steps of the company. I am inspired by working with people – the experience and knowledge I have gained gives me the opportunity to help younger colleagues who have just started taking their first steps in an international company. In addition, it is a great opportunity to get to know the Scandinavian culture.",

    imgUrl: "/people/povilas-1.png",
  },
  {
    name: "Julia",
    role: "Group's manager",
    text: "I have been working at Winbas almost since the first steps of the company. I am inspired by working with people – the experience and knowledge I have gained gives me the opportunity to help younger colleagues who have just started taking their first steps in an international company. In addition, it is a great opportunity to get to know the Scandinavian culture.",

    imgUrl: "/people/IMG_9677-1.png",
  },
  {
    name: "Mingaudas",
    role: "Group's manager",
    text: "I have been working at Winbas almost since the first steps of the company. I am inspired by working with people – the experience and knowledge I have gained gives me the opportunity to help younger colleagues who have just started taking their first steps in an international company. In addition, it is a great opportunity to get to know the Scandinavian culture.",

    imgUrl: "/people/IMG_9748-1.png",
  },
];
export default function People() {
  return (
    <>
      <div className={classNamees.container}>
        {mockdata.map((person) => (
          <div className="mt-16 mb-12 min-h-64 bg-gray-100 flex justify-center items-center">
            <div className="w- p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500 text-center items-center justify-center">
              <img className="w-64 object-cover rounded-t-md" src={person.imgUrl} alt="" />
              <div className="mt-4">
                <h1 className="text-2xl font-bold text-gray-700">{person.name}</h1>
                <p className="text-base mt-2 text-cyan-600">{person.role}</p>
                <p className="text-sm mt-2 text-gray-700 max-w-64">{person.text}</p>
              </div>
            </div>
          </div>
        ))}
        <div className={classNamees.maindiv}>
          <div className="">
            <img className="" src="https://images.unsplash.com/photo-1509223197845-458d87318791" alt="" />
            <div className="">
              <h1 className={classNamees.textBold}>TestPerson</h1>
              <p className={classNamees.textRole}>Test Role</p>
              <p className={classNamees.text}>Test Text</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
