import React from 'react';
import type { SVGProps } from 'react';

export function DateIcon(props: SVGProps<SVGSVGElement>) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 50 50" {...props}><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path stroke="#306cfe" d="M15.708 39.583H8.333A2.083 2.083 0 0 1 6.25 37.5V10.417a2.083 2.083 0 0 1 2.083-2.084h33.334a2.083 2.083 0 0 1 2.083 2.084V37.5a2.083 2.083 0 0 1-2.083 2.083h-7.375"></path><path stroke="#306cfe" d="M6.25 18.75h37.5m-18.75 0a12.5 12.5 0 1 0 0 25a12.5 12.5 0 0 0 0-25"></path><path stroke="#344054" d="M20.833 31.25h8.334m4.166-25v6.25zm-16.666 0v6.25zM25 35.417v-8.334z"></path></g></svg>);
}