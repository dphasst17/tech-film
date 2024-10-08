'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react"
const BreadcrumbItems = ({ props }: { props: { title: string[] } }) => {
    const router = useRouter()
    return <div className="Breadcrumbs relative w-[98%] h-[50px] mx-auto z-10">
        <Breadcrumbs key="solid" variant="solid">
            <BreadcrumbItem onClick={() => { router.push('/') }}>Home</BreadcrumbItem>
            <BreadcrumbItem onClick={() => { router.push('/film') }}>Film</BreadcrumbItem>
            <BreadcrumbItem>{props.title}</BreadcrumbItem>
        </Breadcrumbs>
    </div>
}

export default BreadcrumbItems