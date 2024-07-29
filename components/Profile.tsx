import Image from 'next/image';

const Profile = () => {
  return (
    <>
      <div className='grid grid-cols-5 gap-4 md:grid-cols-6'>
        <div className='relative flex items-center justify-center col-span-2 overflow-hidden rounded-lg text-9xl aspect-square bg-gray-100/10'>
          <Image
            src='https://github.com/user-attachments/assets/931e0c50-2825-429d-902a-af0c198a4138'
            alt='profile'
            fill
            objectPosition='center'
            objectFit='cover'
            className='transform'
          />
        </div>
      </div>
      <h1 className='mt-10 text-2xl font-bold'>
        안녕하세요 프론트엔드 개발자 김도연입니다.
      </h1>
      <p></p>
    </>
  );
};

export default Profile;
