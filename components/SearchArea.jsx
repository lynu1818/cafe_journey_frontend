'use client'
import React, {Fragment, useState, useEffect} from 'react'
// import Filter from "@/components/Filter";
// import Pagination from "@/components/pagination";
import Link from "next/link";
import {ArrowLongLeftIcon, ArrowLongRightIcon, StarIcon} from "@heroicons/react/20/solid";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const sortOptions = [
    { value:'average_star', name: 'Best Rating', href: '#', current: false },
    { value:'created_at', name: 'Newest', href: '#', current: false },
]

const filters = {
    City: [
        { value: '新竹市', label: '新竹市', checked: false },
        { value: '臺北', label: '臺北', checked: false },
        { value: '新北', label: '新北', checked: false },
        { value: '高雄', label: '高雄', checked: false },
        { value: '臺中', label: '臺中', checked: false },
        // { value: '2xl', label: '2XL', checked: false },
    ],
    Tag: [
        { value: '插座', label: '插座', checked: false },
        { value: 'Wifi', label: 'Wifi', checked: false },
        { value: '不限時', label: '不限時', checked: false },
        { value: '寵物友善', label: '寵物友善', checked: false },
        { value: '輕食', label: '輕食', checked: false },
    ],
}

function SearchBar({onSearchSubmit, onSearchChange}) {
    return (
        <>
            <form action="" onSubmit={onSearchSubmit} method="GET">
                <label htmlFor="default-search"
                       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search"
                           id="keyword"
                           name="keyword"
                           autoComplete="keyword"
                           className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder=""
                           required
                           onChange={onSearchChange}
                    />
                    <button type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 rounded-md bg-amber-800 hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800">Search
                    </button>
                </div>
            </form>
        </>
    )
}

function Filter({ selectedFilters, toggleFilter, clearFilters, handleSortChange}) {
    const selectedCount = Object.values(selectedFilters).flat().filter(option => option.checked).length;

    return (
        <div className="bg-white">

            {/* Filters */}
            <Disclosure
                as="section"
                aria-labelledby="filter-heading"
                className="grid items-center border-b border-t border-gray-200"
            >
                <h2 id="filter-heading" className="sr-only">
                    Filters
                </h2>
                <div className="relative col-start-1 row-start-1 py-4">
                    <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
                        <div>
                            <Disclosure.Button className="group flex items-center font-medium text-gray-700">
                                <FunnelIcon
                                    className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                                {selectedCount} Filters
                            </Disclosure.Button>

                        </div>
                        <div className="pl-6">
                            <button
                                onClick={clearFilters}
                                type="button" className="text-gray-500">
                                Clear all
                            </button>
                        </div>
                    </div>
                </div>
                <Disclosure.Panel className="border-t border-gray-200 py-10">
                    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
                        <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                            <fieldset>
                                <legend className="block font-medium">City</legend>
                                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                                    {selectedFilters.City.map((option, optionIdx) => (
                                        <div key={option.value} className="flex items-center text-base sm:text-sm">
                                            <input
                                                id={`city-${optionIdx}`}
                                                name="city[]"
                                                defaultValue={option.value}
                                                type="checkbox"
                                                className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                checked={option.checked}
                                                onChange={() => toggleFilter('City', option.value)}
                                            />
                                            <label htmlFor={`city-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend className="block font-medium">Tag</legend>
                                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                                    {selectedFilters.Tag.map((option, optionIdx) => (
                                        <div key={option.value} className="flex items-center text-base sm:text-sm">
                                            <input
                                                id={`tag-${optionIdx}`}
                                                name="tag[]"
                                                defaultValue={option.value}
                                                type="checkbox"
                                                className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                defaultChecked={option.checked}
                                                onChange={() => toggleFilter('Tag', option.value)}
                                            />
                                            <label htmlFor={`tag-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </Disclosure.Panel>
                <div className="col-start-1 row-start-1 py-4">
                    <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
                        <Menu as="div" className="relative inline-block">
                            <div className="flex">
                                <Menu.Button
                                    className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Sort
                                    <ChevronDownIcon
                                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <Menu.Item key={option.value}>
                                                {({ active }) => (
                                                    <button
                                                        onClick={() => handleSortChange(option.value)}
                                                        className={classNames(
                                                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        {option.name}
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </Disclosure>
        </div>
    )
}


export default function ListArea() {
    const [cafes, setCafes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilters, setSelectedFilters] = useState(filters);
    const [currentSort, setCurrentSort] = useState(sortOptions[0].value);



    useEffect(() => {
        fetchCafes(searchTerm, selectedFilters, currentPage, currentSort);
    }, [searchTerm, selectedFilters, currentPage, currentSort]);


    // 處理排序選項更改
    const handleSortChange = (selectedSortOption) => {
        setCurrentSort(selectedSortOption);
        fetchCafes(searchTerm, selectedFilters, currentPage, selectedSortOption);
    };

    function fetchCafes(searchTerm = '', filters = selectedFilters, paging = 1, sort = currentSort) {
        const cityFilters = filters.City && filters.City.filter(c => c.checked).map(c => c.value) || [];
        const tagFilters = filters.Tag && filters.Tag.filter(t => t.checked).map(t => t.value) || [];

        fetch(`http://localhost:3001/api/1.0/cafe/list?keyword=${searchTerm}&city=${cityFilters.join(',')}&tag=${tagFilters.join(',')}&paging=${paging}&sort=${currentSort}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("set cafes data", data.cafes);
                console.log("set total pages data", data.total_pages);
                console.log("set current page data", data.current_page);
                setCafes(data.cafes)
                setTotalPages(data.total_pages)
                setCurrentPage(data.current_page)
            }).catch((err) => {
            console.log("Error fetching cafes: ", err);
        });
    }

    // Toggle filter option
    const toggleFilter = (category, value) => {
        const updatedFilters = { ...selectedFilters };
        updatedFilters[category] = updatedFilters[category].map(filter => {
            if (filter.value === value) {
                return { ...filter, checked: !filter.checked };
            }
            return filter;
        });
        setSelectedFilters(updatedFilters);
        fetchCafes(searchTerm, updatedFilters, currentPage, currentSort);
    };

    // Clear all filters
    const clearFilters = () => {
        const resetFilters = { ...filters }; // Reset to initial state
        setSelectedFilters(resetFilters);
        fetchCafes(searchTerm, resetFilters, currentPage, currentSort);
    };

    function handleSearchSubmit(e) {
        const keyword = e.target.keyword.value;
        setSearchTerm(keyword);
        setCurrentPage(1); // 重置到第一頁
        fetchCafes(keyword, 1);
    }

    function handleSearchChange(e) {
        e.preventDefault()
        const keyword = e.target.value;
        setSearchTerm(keyword);
        fetchCafes(keyword, 1);
    }

    function handlePageChange(newPage) {
        setCurrentPage(newPage);
        fetchCafes(searchTerm, newPage); // 使用當前的 searchTerm 進行請求
    }


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

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                    <SearchBar onSearchSubmit={handleSearchSubmit} onSearchChange={handleSearchChange}/>
                    <Filter
                        selectedFilters={selectedFilters}
                        toggleFilter={toggleFilter}
                        clearFilters={clearFilters}
                        handleSortChange={handleSortChange}
                    />
                    <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
                        {cafes.map((cafe) => (
                            <>
                                <article key={cafe.id} className="relative isolate flex flex-col gap-8 lg:flex-row">
                                    <div
                                        className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                                        <img
                                            src={cafe.main_image}
                                            alt=""
                                            className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                                        />
                                        <div
                                            className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"/>
                                    </div>
                                    <div>
                                        {cafe.tag_names && cafe.tag_names.split(',').map((tag, index) => (
                                            <span key={index}
                                                  class="ml-1 mr-3 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-gray-200 text-gray-700 border">{tag.trim()}
                                            </span>
                                        ))}
                                        <div className="group relative max-w-xl">
                                            <div className="flex items-center"> {/* 使用 flex 佈局 */}
                                                <h3 className="ml-3 mt-5 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                                    <a href={`/cafe/${cafe.id}`}>
                                                        <span className="absolute inset-0"/>
                                                        {cafe.name}
                                                    </a>
                                                </h3>
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/128/684/684809.png"
                                                    alt=""
                                                    className="mt-4 ml-5 rounded-2xl bg-gray-50 w-4 h-4"
                                                />
                                                <p className="mt-5 ml-3 text-sm leading-6 text-gray-600">{cafe.address}</p>
                                            </div>
                                            <div className="ml-3 mt-4 flex items-center">
                                                <p className="text-sm text-gray-700">
                                                    {cafe.average_star}
                                                    <span className="sr-only"> out of 5 stars</span>
                                                </p>
                                                <div className="ml-1 flex items-center">
                                                    {[0, 1, 2, 3, 4].map((rating) => (
                                                        <StarIcon
                                                            key={rating}
                                                            className={classNames(
                                                                cafe.average_star > rating ? 'text-yellow-400' : 'text-gray-200',
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
                                                        See all {cafe.total_reviews} reviews
                                                    </a>
                                                </div>
                                            </div>


                                            <p className="ml-3 mt-5 text-sm leading-6 text-gray-600">{cafe.description}</p>
                                        </div>
                                        <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                                            <div className="relative flex items-center gap-x-4">
                                                {/*<img src={post.author.imageUrl} alt=""*/}
                                                {/*     className="h-10 w-10 rounded-full bg-gray-50"/>*/}
                                                {/*<div className="text-sm leading-6">*/}
                                                {/*    <p className="font-semibold text-gray-900">*/}
                                                {/*        <a href={post.author.href}>*/}
                                                {/*            <span className="absolute inset-0"/>*/}
                                                {/*            {post.author.name}*/}
                                                {/*        </a>*/}
                                                {/*    </p>*/}
                                                {/*    <p className="text-gray-600">{post.author.role}</p>*/}
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-300"/>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="bg-white px-2 text-sm text-gray-500"></span>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>
        </div>
    )
}
