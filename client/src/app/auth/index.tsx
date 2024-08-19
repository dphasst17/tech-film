'use client'
import React, { use, useState } from 'react'
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { login, register } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { save } from '@/utils/cookie';
import { StateContext } from '@/contexts/state';

const AuthIndex = () => {
    const { register: regissi, handleSubmit: handlesi } = useForm()
    const { register: regisu, handleSubmit: handlesu } = useForm()
    const { setIsLog, setRole } = use(StateContext)
    const [selected, setSelected] = useState<string>("sign-in");
    const router = useRouter()
    const onSubmit = (data: { [key: string]: string }) => {
        console.log(data)
        if (selected === "sign-up" && data.password !== data.confirm) {
            toast.error("Confirm password does not match with password")
            return
        }
        (selected === "sign-in" ? login(data) : register(data))
            .then(res => {
                if (res.status === 403 || res.status === 404 || res.status === 500) {
                    toast.error(res.message)
                    return
                }
                if (res.status === 200) {
                    toast.success("Sign in successfully")
                    save('filmlogs', 'true', res.data.expired_refresh)
                    save('atk', res.data.access, res.data.expired_access)
                    save('rtk', res.data.refresh, res.data.expired_refresh)
                    save('role', res.data.role, res.data.expired_refresh)
                    setRole(res.data.role)
                    setIsLog(true)
                    router.push("/")
                    return
                }
                res.status === 201 && (toast.success("Sign up successfully"), setSelected("sign-in"))

            })
    }
    return <div className='relative w-full h-[92vh]'>
        <div className='absolute w-full h-full bg-zinc-800 bg-opacity-50 z-0'>
        </div>
        <div className='w-full h-full flex items-center justify-center z-10'>
            <div className="flex flex-col justify-center items-center w-full h-full ">
                <Card className="max-w-full w-auto min-w-[340px] h-auto min-h-[400px] max-h-[700px] flex !items-center bg-zinc-800 text-white">
                    <CardBody className="overflow-hidden !justify-evenly bg-zinc-800">
                        <Tabs
                            fullWidth
                            size="md"
                            aria-label="Tabs form"
                            selectedKey={selected}
                            onSelectionChange={(key) => setSelected(key as string)}
                            classNames={{ tabList: 'bg-zinc-700 text-white', tab: 'bg-zinc-700', tabContent: "text-white" }}
                            color="primary"
                        >
                            <Tab key="sign-in" title="Sign in">
                                <form className="grid grids-cols-1 gap-4">
                                    <Input className="caret-zinc-950" {...regissi('username', { required: true })} isRequired label="Username" placeholder="Enter your username" type="email" />
                                    <Input className="caret-zinc-950" {...regissi('password', { required: true })}
                                        isRequired
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                    />
                                    <p className="text-center text-small">
                                        Need to create an account?{" "}
                                        <Link className='cursor-pointer' size="sm" onPress={() => setSelected("sign-up")}>
                                            Sign up
                                        </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                        <Button onClick={handlesi(onSubmit)} fullWidth color="primary">
                                            Sign in
                                        </Button>
                                    </div>
                                </form>
                            </Tab>
                            <Tab key="sign-up" title="Sign up">
                                <form className="grid grid-cols-1 gap-4">
                                    <Input className="caret-zinc-950" {...regisu('username', { required: true })} isRequired label="Username" placeholder="Enter your username" type="text" />
                                    <Input className="caret-zinc-950" {...regisu('name', { required: true })} isRequired label="Name" placeholder="Enter your name" type="text" />
                                    <Input className="caret-zinc-950" {...regisu('email', { required: true })} isRequired label="Email" placeholder="Enter your email" type="email" />
                                    <Input className="caret-zinc-950" {...regisu('password', { required: true })}
                                        isRequired
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                    />
                                    <Input className="caret-zinc-950" {...regisu('confirm')}
                                        isRequired
                                        label="Confirm Password"
                                        placeholder="Confirm your password"
                                        type="password"
                                    />
                                    <p className="text-center text-small">
                                        Already have an account?{" "}
                                        <Link className='cursor-pointer' size="sm" onPress={() => setSelected("sign-in")}>
                                            Sign in
                                        </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                        <Button onClick={handlesu(onSubmit)} fullWidth color="primary">
                                            Sign up
                                        </Button>
                                    </div>
                                </form>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </div>
    </div>
}

export default AuthIndex