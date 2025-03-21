'use client'
import {useState, useEffect} from 'react'
import {useAuth} from "@/components/AuthProvider";
import {Dialog} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {jwtDecode} from "jwt-decode";
import {useRouter} from "next/navigation";
import {useCookies} from 'next-client-cookies';
import {CookiesProvider} from "next-client-cookies/server";

const navigation = [
    {name: 'Profile', href: '/profile'},
    {name: 'Favorites', href: '/favorite'},
    {name: 'History', href: '/history'},
    {name: 'Create Cafe', href: '/cafe/create'},
]


export function Header() {
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [user, setUser] = useState(null);
    const cookies = useCookies();
    const token = cookies.get('access_token');

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, [token]);


    function handleLogout(e) {
        e.preventDefault();
        cookies.remove('access_token');
        setUser(null);
        router.replace("/")
    }

    return (
            <header className="bg-white">
                <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
                     aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="/" className="flex items-center -m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img className="h-8 w-auto" src="https://cdn-icons-png.flaticon.com/512/1079/1079115.png"
                                 alt=""/>
                            <h2>Cafe Journey</h2>
                        </a>
                    </div>


                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href}
                               className="text-sm font-semibold leading-6 text-gray-900">
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div>
                        {user ? (
                            <div className="hidden lg:flex flex-1 items-center justify-end gap-x-6">
                                <button onClick={handleLogout}
                                        className="rounded-md bg-amber-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700">
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <div className="hidden lg:flex flex-1 items-center justify-end gap-x-6">
                                <a href="/login"
                                   className="rounded-md bg-amber-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700">
                                    Log in
                                </a>
                                <a
                                    href="/signup"
                                    className="rounded-md bg-amber-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
                                >
                                    Sign up
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                    </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-10"/>
                    <Dialog.Panel
                        className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center gap-x-6">
                            <a href="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <div className="flex lg:flex-1">
                                    <a href="/" className="flex items-center -m-1.5 p-1.5">
                                        <span className="sr-only">Your Company</span>
                                        <img className="h-8 w-auto"
                                             src="https://cdn-icons-png.flaticon.com/512/1079/1079115.png" alt=""/>
                                        <h2 className="whitespace-nowrap">Cafe Journey</h2>
                                    </a>
                                </div>
                            </a>
                            {/*<div className="flex flex-1 items-center justify-end gap-x-6">*/}
                            {/*  <a href="/login" className="rounded-md bg-amber-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700">*/}
                            {/*    Log in*/}
                            {/*  </a>*/}
                            {/*  <a*/}
                            {/*      href="/signup"*/}
                            {/*      className="rounded-md bg-amber-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"*/}
                            {/*  >*/}
                            {/*    Sign up*/}
                            {/*  </a>*/}
                            {/*</div>*/}
                            <div className="flex w-full lg:hidden justify-end">
                                <button
                                    type="button"
                                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                </button>
                            </div>


                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {user && navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">
                                    {
                                        user ? (
                                            <button
                                                onClick={handleLogout}
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                Log out
                                            </button>
                                        ) : (
                                            <div>
                                                <a
                                                    href="/login"
                                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                >
                                                    Log in
                                                </a>
                                                <a
                                                    href="/signup"
                                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                >
                                                    Sign up
                                                </a>
                                            </div>

                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
    )
}
