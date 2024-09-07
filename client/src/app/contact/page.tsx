'use client'
import { Button, Input, Textarea } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

const Contact = () => {
    return (
        <div className="w-full">
            <section className="bg-muted py-12 md:py-20 text-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Get in Touch</h2>
                            <p className="text-muted-foreground">
                                Have a question or need assistance? Fill out the form and we&#39;ll get back to you as soon as possible.
                            </p>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Input label="Name" id="name" placeholder="Enter your name" />
                                    </div>
                                    <div>
                                        <Input label="Email" id="email" type="email" placeholder="Enter your email" />
                                    </div>
                                </div>
                                <div>
                                    <Textarea id="message" placeholder="Enter your message" rows={5} />
                                </div>
                                <Button className="w-full sm:w-auto">
                                    Submit
                                </Button>
                            </form>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Contact Us</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold">Phone</h3>
                                    <p className="text-muted-foreground">+1 (555) 555-5555</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Email</h3>
                                    <p className="text-muted-foreground">info@acme.com</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Address</h3>
                                    <p className="text-muted-foreground">
                                        123 Main Street
                                        <br />
                                        Anytown, USA 12345
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-muted py-12 md:py-20 text-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">About Our Company</h2>
                            <p className="mt-4 text-muted-foreground">
                                Tech Film is a leading provider of high-quality film-related products for both professional and amateur
                                photographers. Our mission is to provide our customers with the best possible experience and to help
                                them capture their most precious moments.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Our Products</h2>
                            <ul className="mt-4 space-y-2 text-muted-foreground">
                                <li>
                                    <Link href="#" className="hover:underline" prefetch={false}>
                                        35mm Film
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:underline" prefetch={false}>
                                        120 Film
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:underline" prefetch={false}>
                                        Instant Film
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:underline" prefetch={false}>
                                        Darkroom Supplies
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:underline" prefetch={false}>
                                        Camera Accessories
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact