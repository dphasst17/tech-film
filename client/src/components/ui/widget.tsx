'use client'
import { useState, useEffect } from 'react';
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
const Widget = () => {
    const [isLock, setIsLock] = useState<boolean>(false)
    const [hour, setHour] = useState('');
    const [min, setMin] = useState('');
    const [sec, setSec] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const today = new Date();
            displayClock(today);
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);
    function displayClock(today: any) {
        let hour = padZeros(today.getHours());
        let minutes = padZeros(today.getMinutes());
        let seconds = padZeros(today.getSeconds());
        if (today.getHours() >= 12) {
            seconds
        } else {
            seconds
        }

        setHour(hour);
        setMin(minutes);
        setSec(seconds);
    }
    function padZeros(num: any) {
        if (num < 10) {
            num = '0' + num;
        }
        return num;
    }

    return (
        <div className={`fixed ${isLock ? 'w-screen h-screen bottom-0 left-0' : 'w-[10vw] h-[50px] bottom-2 px-2'} min-w-[250px] transition-all mx-auto flex flex-wrap justify-start items-center z-50`}>
            <div className={`${isLock ? 'w-full' : 'w-[250px] bg-opacity-90 px-1'} h-full bg-zinc-950 rounded-md flex items-center justify-center  transition-all`}>
                <div className={`clock ${isLock ? 'w-3/5 xl:text-[50px] 2xl:text-[70px]' : 'w-[230px]'} text-[15px] md:text-[20px] flex justify-evenly font-tech-shark font-medium tex-white`}>
                    <div className="time inline-block w-30 text-white font-semibold">
                        {hour}
                    </div>
                    <div className="colon text-white font-semibold">:</div>
                    <div className="time inline-block w-30 text-white font-semibold">
                        {min}
                    </div>
                    <div className="colon text-white font-semibold">:</div>
                    <div className="time inline-block w-[40px] text-white font-semibold">
                        {sec}
                    </div>
                </div>
                <div className={`flex justify-center items-center h-full ${isLock ? 'w-[100px]  xl:text-[50px] 2xl:text-[60px]' : 'w-[20px] text-[20px]'} text-white`} onClick={() => setIsLock(!isLock)}>
                    {isLock ? <FaLock /> : <FaUnlock />}
                </div>
            </div>
        </div>
    );
};

export default Widget;