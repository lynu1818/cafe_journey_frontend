'use client'
import React, { useEffect, useState, Fragment } from 'react'
import {ArrowLongLeftIcon, ArrowLongRightIcon, StarIcon} from '@heroicons/react/20/solid'
import { Tab } from '@headlessui/react'
import { usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import ReviewForm from "@/components/ReviewForm";
import ReviewArea from "@/components/ReviewArea";
import { Header } from "@/components/Header";
import { getCookie } from "cookies-next";
import { useCookies } from 'next-client-cookies';
import {useRouter} from "next/navigation";

const product = {
    name: 'Application UI Icon Pack',
    version: { name: '1.0', date: 'June 5, 2021', datetime: '2021-06-05' },
    price: '$220',
    description:
        'The Application UI Icon Pack comes with over 200 icons in 3 styles: outline, filled, and branded. This playful icon pack is tailored for complex application user interfaces with a friendly and legible look.',
    highlights: [
        '200+ SVG icons in 3 unique styles',
        'Compatible with Figma, Sketch, and Adobe XD',
        'Drawn on 24 x 24 pixel grid',
    ],
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-product-01.jpg',
    imageAlt: 'Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles.',
}
// const reviews = {
//     average: 4,
//     totalCount: 1624,
//     featured: [
//         {
//             id: 1,
//             rating: 5,
//             content: `
//         <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
//       `,
//             date: 'July 16, 2021',
//             datetime: '2021-07-16',
//             author: 'Emily Selman',
//             avatarSrc:
//                 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
//         },
//         {
//             id: 2,
//             rating: 5,
//             content: `
//         <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
//       `,
//             date: 'July 12, 2021',
//             datetime: '2021-07-12',
//             author: 'Hector Gibbons',
//             avatarSrc:
//                 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
//         },
//         // More reviews...
//     ],
// }
const faqs = [
    {
        question: 'What format are these icons?',
        answer:
            'The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.',
    },
    {
        question: 'Can I use the icons at different sizes?',
        answer:
            "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance.",
    },
    // More FAQs...
]
const license = {
    href: '#',
    summary:
        'For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.',
    content: `
    <h4>Overview</h4>
    
    <p>For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.</p>
    
    <ul role="list">
    <li>You\'re allowed to use the icons in unlimited projects.</li>
    <li>Attribution is not required to use the icons.</li>
    </ul>
    
    <h4>What you can do with it</h4>
    
    <ul role="list">
    <li>Use them freely in your personal and professional work.</li>
    <li>Make them your own. Change the colors to suit your project or brand.</li>
    </ul>
    
    <h4>What you can\'t do with it</h4>
    
    <ul role="list">
    <li>Don\'t be greedy. Selling or distributing these icons in their original or modified state is prohibited.</li>
    <li>Don\'t be evil. These icons cannot be used on websites or applications that promote illegal or immoral beliefs or activities.</li>
    </ul>
  `,
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export default function CafePage({params}) {
    const router = useRouter();
    const cookies = useCookies();
    const pathname = usePathname();
    const cafeId = pathname.split("/")[2];
    const token = cookies.get('access_token');
    let user = null;

    if (typeof token === 'string' && token.trim() !== '') {
        try {
            user = jwtDecode(token);
        } catch (error) {
            console.error("Token 解碼失敗:", error);
        }
    }
    console.log("user: ", user);
    const [cafe, setCafe] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [reviews, setReviews] = useState([]);
    const [average, setAverage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        if (cafeId) {
            fetchCafeDetails(cafeId).then(data => {
                setCafe(data);
            });
        }
    }, [cafeId]);

    useEffect(() => {
        fetchReviews(cafeId);
    }, [cafeId])

    function Pagination({totalPages, currentPage, onPageChange}) {
        return (
            <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
                <div className="-mt-px flex w-0 flex-1">
                    <a
                        href="#"
                        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                        className={`inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${currentPage <= 1 ? 'cursor-not-allowed text-gray-300' : ''}`}
                    >
                        <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                        Previous
                    </a>
                </div>
                <div className="hidden md:-mt-px md:flex">
                    {[...Array(totalPages)].map((_, i) => (
                        <a
                            key={i + 1}
                            href="#"
                            onClick={() => onPageChange(i + 1)}
                            className={`inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium ${currentPage === i + 1 ? 'text-indigo-600 border-indigo-500' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                        >
                            {i + 1}
                        </a>
                    ))}
                </div>
                <div className="-mt-px flex w-0 flex-1 justify-end">
                    <a
                        href="#"
                        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                        className={`inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${currentPage >= totalPages ? 'cursor-not-allowed text-gray-300' : ''}`}
                    >
                        Next
                        <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </a>
                </div>
            </nav>
        )
    }

    if (!cafe) {
        return <div className="flex items-center justify-center h-screen">
            {/*<button disabled type="button"*/}
            {/*        className="text-white bg-amber-800 hover:bg-amber-900 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800 inline-flex items-center">*/}
            {/*    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin"*/}
            {/*         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
            {/*        <path*/}
            {/*            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"*/}
            {/*            fill="#E5E7EB"/>*/}
            {/*        <path*/}
            {/*            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"*/}
            {/*            fill="currentColor"/>*/}
            {/*    </svg>*/}
            {/*    Loading...*/}
            {/*</button>*/}
        </div>;

    }

    function fetchCafeDetails(cafeId) {
        return fetch(`http://localhost:3001/api/1.0/cafe/detail/${cafeId}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("set [cafeId] data", data);
                return data;
            }).catch((err) => {
                console.log(err);
            });
    }

    function fetchReviews(cafeId) {
        fetch(`http://localhost:3001/api/1.0/review/list?cafeId=${cafeId}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("set reviews data", data.reviews);
                console.log("set total pages data", data.total_pages);
                console.log("set current page data", data.current_page);
                setReviews(data.reviews)
                setTotalPages(data.total_pages)
                setCurrentPage(data.current_page)
                setAverage(data.average)
                setTotalCount(data.total_count)
            }).catch((err) => {
                console.log(err);
            });
    }

    function handleGoToLogin() {
        router.replace('/login');
    }
    function handleAddToFavorites() {
        const userId = user.id;
        const body = JSON.stringify({cafeId, userId});
        fetch(`http://localhost:3001/api/1.0/cafe/addfav`, {
            method: 'POST',
            body,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("add to fav: ", data);
            }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="bg-white">
            <Header />
            <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                {/* Cafe Header */}
                <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
                    {/* Cafe image */}
                    <div className="lg:col-span-4 lg:row-end-1">
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg bg-gray-100">
                            <img src={cafe.main_image} alt="" className="object-cover object-center w-full h-full" />
                        </div>
                    </div>
                    {/* Image gallery */}
                    {/*<Tab.Group as="div" className="flex flex-col-reverse">*/}
                    {/*    /!* Image selector *!/*/}
                    {/*    <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">*/}
                    {/*        <Tab.List className="grid grid-cols-4 gap-6">*/}
                    {/*            {product.images.map((image) => (*/}
                    {/*                <Tab*/}
                    {/*                    key={image.id}*/}
                    {/*                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"*/}
                    {/*                >*/}
                    {/*                    {({ selected }) => (*/}
                    {/*                        <>*/}
                    {/*                            <span className="sr-only">{image.name}</span>*/}
                    {/*                            <span className="absolute inset-0 overflow-hidden rounded-md">*/}
                    {/*        <img src={image.src} alt="" className="h-full w-full object-cover object-center" />*/}
                    {/*      </span>*/}
                    {/*                            <span*/}
                    {/*                                className={classNames(*/}
                    {/*                                    selected ? 'ring-indigo-500' : 'ring-transparent',*/}
                    {/*                                    'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'*/}
                    {/*                                )}*/}
                    {/*                                aria-hidden="true"*/}
                    {/*                            />*/}
                    {/*                        </>*/}
                    {/*                    )}*/}
                    {/*                </Tab>*/}
                    {/*            ))}*/}
                    {/*        </Tab.List>*/}
                    {/*    </div>*/}

                    {/*    <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">*/}
                    {/*        {product.images.map((image) => (*/}
                    {/*            <Tab.Panel key={image.id}>*/}
                    {/*                <img*/}
                    {/*                    src={image.src}*/}
                    {/*                    alt={image.alt}*/}
                    {/*                    className="h-full w-full object-cover object-center sm:rounded-lg"*/}
                    {/*                />*/}
                    {/*            </Tab.Panel>*/}
                    {/*        ))}*/}
                    {/*    </Tab.Panels>*/}
                    {/*</Tab.Group>*/}

                    {/* Cafe details */}
                    <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                        <div className="flex flex-col-reverse">
                            <div className="mt-4">
                                <h2 className="sr-only">Reviews</h2>
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-700">
                                        {average}
                                        <span className="sr-only"> out of 5 stars</span>
                                    </p>
                                    <div className="ml-1 flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={classNames(
                                                    average > rating ? 'text-yellow-400' : 'text-gray-200',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                                        ·
                                    </div>
                                    <div className="ml-4 flex">
                                        <a href="/cafe/[cafeId]" className="text-sm font-medium text-amber-600 hover:text-amber-500">
                                            {(totalCount)?totalCount:0} 篇評論
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{cafe.name}</h1>
                                <div className="flex items-center"> {/* 使用 flex 佈局 */}
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/128/684/684809.png"
                                        alt=""
                                        className="mt-4 rounded-2xl bg-gray-50 w-4 h-4"
                                    />
                                    <p className="mt-5 ml-3 text-sm leading-6 text-gray-600">{cafe.address}</p>
                                </div>
                            </div>
                        </div>

                        <p className="mt-6 text-gray-500">{cafe.description}</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                            { user ? (
                                <button
                                    type="button"
                                    onClick={handleAddToFavorites}
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-amber-800 px-8 py-3 text-base font-medium text-white hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    加入最愛
                                </button>
                            ) : (
                                <button
                                type="button"
                                onClick={handleGoToLogin}
                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-amber-800 px-8 py-3 text-base font-medium text-white hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                登入以加入最愛
                                </button>
                            )
                            }
                            {/*<button*/}
                            {/*    type="button"*/}
                            {/*    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"*/}
                            {/*>*/}
                            {/*    Preview*/}
                            {/*</button>*/}
                        </div>

                        {/*<div className="mt-10 border-t border-gray-200 pt-10">*/}
                        {/*    <h3 className="text-sm font-medium text-gray-900">Highlights</h3>*/}
                        {/*    <div className="prose prose-sm mt-4 text-gray-500">*/}
                        {/*        <ul role="list">*/}
                        {/*            {product.highlights.map((highlight) => (*/}
                        {/*                <li key={highlight}>{highlight}</li>*/}
                        {/*            ))}*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className="mt-10 border-t border-gray-200 pt-10">*/}
                        {/*    <h3 className="text-sm font-medium text-gray-900">License</h3>*/}
                        {/*    <p className="mt-4 text-sm text-gray-500">*/}
                        {/*        {license.summary}{' '}*/}
                        {/*        <a href={license.href} className="font-medium text-indigo-600 hover:text-indigo-500">*/}
                        {/*            Read full license*/}
                        {/*        </a>*/}
                        {/*    </p>*/}
                        {/*</div>*/}

                        {/*<div className="mt-10 border-t border-gray-200 pt-10">*/}
                        {/*    <h3 className="text-sm font-medium text-gray-900">Share</h3>*/}
                        {/*    <ul role="list" className="mt-4 flex items-center space-x-6">*/}
                        {/*        <li>*/}
                        {/*            <a href="app/[cafeId]#" className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500">*/}
                        {/*                <span className="sr-only">Share on Facebook</span>*/}
                        {/*                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">*/}
                        {/*                    <path*/}
                        {/*                        fillRule="evenodd"*/}
                        {/*                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"*/}
                        {/*                        clipRule="evenodd"*/}
                        {/*                    />*/}
                        {/*                </svg>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li>*/}
                        {/*            <a href="app/[cafeId]#" className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500">*/}
                        {/*                <span className="sr-only">Share on Instagram</span>*/}
                        {/*                <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">*/}
                        {/*                    <path*/}
                        {/*                        fillRule="evenodd"*/}
                        {/*                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"*/}
                        {/*                        clipRule="evenodd"*/}
                        {/*                    />*/}
                        {/*                </svg>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li>*/}
                        {/*            <a href="app/[cafeId]#" className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500">*/}
                        {/*                <span className="sr-only">Share on Twitter</span>*/}
                        {/*                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">*/}
                        {/*                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />*/}
                        {/*                </svg>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                    </div>

                    <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
                        <Tab.Group as="div">
                            <div className="border-b border-gray-200">
                                <Tab.List className="-mb-px flex space-x-8">
                                    <Tab
                                        className={({ selected }) =>
                                            classNames(
                                                selected
                                                    ? 'border-amber-600 text-amber-600'
                                                    : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                                                'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                                            )
                                        }
                                    >
                                        評論
                                    </Tab>
                                    {/*<Tab*/}
                                    {/*    className={({ selected }) =>*/}
                                    {/*        classNames(*/}
                                    {/*            selected*/}
                                    {/*                ? 'border-indigo-600 text-indigo-600'*/}
                                    {/*                : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',*/}
                                    {/*            'whitespace-nowrap border-b-2 py-6 text-sm font-medium'*/}
                                    {/*        )*/}
                                    {/*    }*/}
                                    {/*>*/}
                                    {/*    FAQ*/}
                                    {/*</Tab>*/}
                                    {/*<Tab*/}
                                    {/*    className={({ selected }) =>*/}
                                    {/*        classNames(*/}
                                    {/*            selected*/}
                                    {/*                ? 'border-indigo-600 text-indigo-600'*/}
                                    {/*                : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',*/}
                                    {/*            'whitespace-nowrap border-b-2 py-6 text-sm font-medium'*/}
                                    {/*        )*/}
                                    {/*    }*/}
                                    {/*>*/}
                                    {/*    License*/}
                                    {/*</Tab>*/}
                                </Tab.List>
                            </div>
                            <Tab.Panels as={Fragment}>
                                <Tab.Panel className="-mb-10">
                                    <br/>
                                    <br/>
                                    <h3 className="sr-only">Customer Reviews</h3>
                                    {user ? (
                                        <ReviewForm userId={user.id} className="mt-4" cafeId={cafeId} />
                                    ) : (
                                        <ReviewForm userId={0} className="mt-4" cafeId={cafeId} />
                                    )}

                                    {reviews && reviews.map((review, reviewIdx) => (
                                        <div key={review.id} className="flex space-x-4 text-sm text-gray-500">
                                            <div className="flex-none py-10">
                                                <img src={review.picture} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                                            </div>
                                            <div className={classNames(reviewIdx === 0 ? '' : 'border-t border-gray-200', 'py-10')}>
                                                <h3 className="font-medium text-gray-900">{review.name}</h3>
                                                <p>
                                                    <time dateTime={review.datetime}>{review.formatted_created_at}</time>
                                                </p>

                                                <div className="mt-4 flex items-center">
                                                    {[0, 1, 2, 3, 4].map((rating) => (
                                                        <StarIcon
                                                            key={rating}
                                                            className={classNames(
                                                                review.star > rating ? 'text-yellow-400' : 'text-gray-300',
                                                                'h-5 w-5 flex-shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    ))}
                                                </div>
                                                <p className="sr-only">{review.star} out of 5 stars</p>

                                                <div
                                                    className="prose prose-sm mt-4 max-w-none text-gray-500"
                                                    dangerouslySetInnerHTML={{ __html: review.content }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </Tab.Panel>

                                <Tab.Panel className="text-sm text-gray-500">
                                    <h3 className="sr-only">Frequently Asked Questions</h3>

                                    <dl>
                                        {faqs.map((faq) => (
                                            <Fragment key={faq.question}>
                                                <dt className="mt-10 font-medium text-gray-900">{faq.question}</dt>
                                                <dd className="prose prose-sm mt-2 max-w-none text-gray-500">
                                                    <p>{faq.answer}</p>
                                                </dd>
                                            </Fragment>
                                        ))}
                                    </dl>
                                </Tab.Panel>

                                <Tab.Panel className="pt-10">
                                    <h3 className="sr-only">License</h3>

                                    <div
                                        className="prose prose-sm max-w-none text-gray-500"
                                        dangerouslySetInnerHTML={{ __html: license.content }}
                                    />
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
        </div>
    )
}
