import Image from 'next/image'

const Profile = () => {
  return (
    <div className="grid grid-cols-5 gap-4 p-4 md:grid-cols-6">
      <div className="relative flex items-center justify-center col-span-2 rounded-lg text-9xl aspect-square bg-gray-100/10">
        <Image src="/astronaut.png" alt="astronaut" fill className="transform scale-90" />
      </div>
      <div className="col-span-3 md:col-span-4">
        <h1 className="text-2xl font-bold">안녕하세요 💫</h1>
      </div>
    </div>
  )
}

export default Profile
