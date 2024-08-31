'use client'
const Title = ({ title }: { title: string }) => {
    return <div className='title w-full h-[50px] flex items-center justify-center'>
        <div className='cursor-pointer font-tech-shark text-white font-bold text-[25px]'>{title}</div>
    </div>
}
export default Title