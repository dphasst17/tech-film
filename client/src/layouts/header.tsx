'use client'
import { FilmIcon } from "@/components/icon/icon"
import { StateContext } from "@/contexts/state"
import { accountStore } from "@/store/account"
import { remove } from "@/utils/cookie"
import { Button, Input } from "@nextui-org/react"
import { usePathname, useRouter } from "next/navigation"
import { use, useState } from "react"
interface NavArr {
    name: string
    url: string
}
const Header = () => {
    const router = useRouter()
    const pathname = usePathname()
    const { role, isLog, setRole, setIsLog } = use(StateContext)
    const { users } = accountStore()
    const [searchValue, setSearchValue] = useState<string>('')
    const handleNavigate = (url: string) => {
        router.push(url)
    }
    const handelAuth = () => {
        if (!isLog) {
            handleNavigate('/auth')
            return
        }
        else {
            remove('filmlogs')
            remove('atk')
            remove('rtk')
            remove('role')
            setIsLog(false)
            setRole(null)
            handleNavigate('/auth')
        }
    }
    const arrNav = [
        {
            name: 'Home',
            url: '/'
        },
        {
            name: 'Film',
            url: '/film'
        },
        {
            name: 'About',
            url: '/about'
        },
        {
            name: 'Contact',
            url: '/contact'
        }
    ]
    const adminNav = [
        {
            name: 'Admin',
            url: '/admin'
        }
    ]
    return (
        <header className="sticky top-0 z-50 w-full h-[7vh] flex items-center justify-between px-4 py-3 shadow-sm sm:px-6 lg:px-8 bg-zinc-800">
            <div onClick={() => handleNavigate('/')} className="flex items-center gap-2">
                <FilmIcon className="h-8 w-8 text-primary" />
                <span className="text-white text-2xl font-semibold">TECH-FILM</span>
            </div>
            <nav className="hidden md:flex">
                <div className={`grid ${role === 2 ? 'grid-cols-4' : 'grid-cols-5'} gap-2 bg-transparent`}>
                    {
                        arrNav.map((item: NavArr, index) =>
                            <div key={index}>
                                <Button className={`group text-white inline-flex h-max w-max items-center justify-center rounded-md 
                                ${pathname === item.url ? 'bg-white text-zinc-950' : 'bg-transparent'} hover:bg-white px-4 py-2 text-lg font-medium transition-all hover:text-zinc-950`}
                                    onClick={() => handleNavigate(item.url)}>{item.name}</Button>
                            </div>)
                    }
                    {
                        role !== 2 && adminNav.map((item: NavArr, index) =>
                            <div key={index}>
                                <Button className={`group text-white inline-flex h-max w-max items-center justify-center rounded-md 
                                ${pathname === item.url ? 'bg-white text-zinc-950' : 'bg-transparent'} hover:bg-white px-4 py-2 text-lg font-medium transition-all hover:text-zinc-950`}
                                    onClick={() => handleNavigate(item.url)}>{item.name}</Button>
                            </div>)
                    }
                </div>
            </nav>
            <nav className="h-full flex items-center ">
                <Input placeholder="Search" endContent={<div onClick={() => searchValue !== "" && router.push(`/film/search/${searchValue}`)}
                    className="cursor-pointer text-white bg-blue-500 px-2 rounded-md" >
                    Search
                </div>}
                    className="text-white"
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => { e.code === "Enter" && searchValue !== "" && router.push(`/film/search/${searchValue}`) }}
                    variant="bordered" color="default" size="sm" />
            </nav>
            <nav className="w-[250px] h-full grid grid-cols-2 gap-4">
                {isLog && users && <Button variant="bordered" color="default" radius="sm" onClick={() => role === 2 && router.push('/account')} className="h-full text-white">Hello {users && users[0]?.name}</Button>}
                <Button color={isLog ? 'primary' : 'danger'} onClick={handelAuth} radius="sm" size="md"
                    className="h-full text-white">{isLog ? 'Logout' : 'Login'}
                </Button>
            </nav>
        </header >
    )
}

export default Header
