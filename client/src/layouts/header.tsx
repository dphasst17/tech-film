'use client'
import { FilmIcon, MenuIcon } from "@/components/icon/icon"
import { Button, Navbar, NavbarContent } from "@nextui-org/react"
import { usePathname, useRouter } from "next/navigation"
interface NavArr {
    name: string
    url: string
}
const Header = () => {
    const router = useRouter()
    const pathname = usePathname()

    const handleNavigate = (url: string) => {
        router.push(url)
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
    return (
        <header className="sticky top-0 z-50 w-full h-[7vh] flex items-center justify-between px-4 py-3 shadow-sm sm:px-6 lg:px-8 bg-zinc-800">
            <div onClick={() => handleNavigate('/')} className="flex items-center gap-2">
                <FilmIcon className="h-8 w-8 text-primary" />
                <span className="text-white text-2xl font-semibold">TECH-FILM</span>
            </div>
            <nav className="hidden md:flex">
                <div className=" grid grid-cols-4 gap-2 bg-transparent">
                    {
                        arrNav.map((item: NavArr, index) =>
                            <div key={index}>
                                <Button className={`group text-white inline-flex h-max w-max items-center justify-center rounded-md 
                                ${pathname === item.url ? 'bg-white text-zinc-950' : 'bg-transparent'} hover:bg-white px-4 py-2 text-lg font-medium transition-all hover:text-zinc-950`}
                                    onClick={() => handleNavigate(item.url)}>{item.name}</Button>
                            </div>)
                    }
                </div>
            </nav>
            <Button radius="sm" size="md"
                className="h-full bg-zinc-900 text-white">Watch Trailer
            </Button>
        </header>
    )
}

export default Header
