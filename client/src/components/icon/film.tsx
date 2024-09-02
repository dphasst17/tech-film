'use client'
import React from 'react';
import type { SVGProps } from 'react';

export function FilmIcon(props: SVGProps<SVGSVGElement>) {
    return (<svg className='w-[70px] h-[70px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}><path fill="#3f51b5" d="M43 39V24h-4v15c0 5 4 9 9 9v-4c-2.8 0-5-2.2-5-5"></path><circle cx={24} cy={24} r={19} fill="#90a4ae"></circle><circle cx={24} cy={24} r={2} fill="#37474f"></circle><g fill="#253278"><circle cx={24} cy={14} r={5}></circle><circle cx={24} cy={34} r={5}></circle><circle cx={34} cy={24} r={5}></circle><circle cx={14} cy={24} r={5}></circle></g></svg>);
}


export function NewFilmIcon(props: SVGProps<SVGSVGElement>) {
    return (<svg className='w-[70px] h-[70px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="#3abb72" d="M3 20q-.825 0-1.412-.587T1 18V6q0-.825.588-1.412T3 4h18q.825 0 1.413.588T23 6v12q0 .825-.587 1.413T21 20zm0-2h18V6H3zm.5-3h1.25v-3.5L7.3 15h1.2V9H7.25v3.5L4.75 9H3.5zm6 0h4v-1.25H11v-1.1h2.5V11.4H11v-1.15h2.5V9h-4zm6 0h4q.425 0 .713-.288T20.5 14V9h-1.25v4.5h-1.1V10H16.9v3.5h-1.15V9H14.5v5q0 .425.288.713T15.5 15M3 18V6z"></path></svg>);
}


export function FilmDetail(props: SVGProps<SVGSVGElement>) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}><g fill="none" strokeLinejoin="round" strokeWidth={4}><rect width={36} height={36} x={6} y={6} fill="#2f88ff" stroke="#000" rx={3}></rect><rect width={8} height={8} x={13} y={13} fill="#43ccf8" stroke="#fff"></rect><path stroke="#fff" strokeLinecap="round" d="M27 13L35 13"></path><path stroke="#fff" strokeLinecap="round" d="M27 20L35 20"></path><path stroke="#fff" strokeLinecap="round" d="M13 28L35 28"></path><path stroke="#fff" strokeLinecap="round" d="M13 35H35"></path></g></svg>);
}

export function FilmEdit(props: SVGProps<SVGSVGElement>) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}><g fill="none" stroke="#000" strokeLinejoin="round" strokeWidth={4}><path strokeLinecap="round" d="M42 26V40C42 41.1046 41.1046 42 40 42H8C6.89543 42 6 41.1046 6 40V8C6 6.89543 6.89543 6 8 6L22 6"></path><path fill="#2f88ff" d="M14 26.7199V34H21.3172L42 13.3081L34.6951 6L14 26.7199Z"></path></g></svg>);
}