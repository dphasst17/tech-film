'use client'
const Title = ({ props }: { props: { value: string } }) => {
    return <div className='title w-full h-[50px] flex items-center justify-center'>
        <div className='cursor-pointer font-tech-shark text-white font-bold text-[25px]'>{props.value}</div>
    </div>
}
export default Title