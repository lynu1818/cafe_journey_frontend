'use client'
import { CookiesProvider } from 'next-client-cookies/server'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { ClockIcon } from '@heroicons/react/20/solid'
import { Menu } from '@headlessui/react'
const mapStyles = {
  width: '100%',
  height: '50%',
}
import { Header } from '@/components/Header'
// import GoogleMap from "@/components/GoogleMap";

// const GoogleMap = () => {

//     return (
//         The <Map></Map> need the following props
//         initialCenter={} will be the center on the Map
//         <Map
//             google={window.google}
//             zoom={17}
//             style={mapStyles}
//             initialCenter={
//                 {
//                     lat: 19.020145856138136,
//                     lng: -98.24006775697993
//                 }
//             }
//         >
//             {/*//The Maker Component have a prop positio={}*/}
//             {/*//in which you decide the position of it*/}
//             <Marker
//                 position={
//                     {
//                         lat: 19.020145856138136,
//                         lng: -98.24006775697993
//                     }
//                 }
//             />
//         </Map>
//     )}

// GoogleApiWrapper({
//     apiKey: "AIzaSyDavR0jMSo5C4urskDvTDDmemhR8pKILOM"
// })(GoogleMap);

export default function Example() {
  return (
    <div className="bg-white">
      {/*<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">*/}
      {/*    <div className="max-w-xl">*/}
      {/*        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>*/}
      {/*        <p className="mt-2 text-sm text-gray-500">*/}
      {/*            Check the status of recent orders, manage returns, and download invoices.*/}
      {/*        </p>*/}
      {/*    </div>*/}

      {/*    <div className="mt-16">*/}
      {/*        <h2 className="sr-only">Recent orders</h2>*/}

      {/*        <div className="space-y-20">*/}
      {/*            {orders.map((order) => (*/}
      {/*                <div key={order.number}>*/}
      {/*                    <h3 className="sr-only">*/}
      {/*                        Order placed on <time dateTime={order.datetime}>{order.date}</time>*/}
      {/*                    </h3>*/}

      {/*                    <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">*/}
      {/*                        <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">*/}
      {/*                            <div className="flex justify-between sm:block">*/}
      {/*                                <dt className="font-medium text-gray-900">Date placed</dt>*/}
      {/*                                <dd className="sm:mt-1">*/}
      {/*                                    <time dateTime={order.datetime}>{order.date}</time>*/}
      {/*                                </dd>*/}
      {/*                            </div>*/}
      {/*                            <div className="flex justify-between pt-6 sm:block sm:pt-0">*/}
      {/*                                <dt className="font-medium text-gray-900">Order number</dt>*/}
      {/*                                <dd className="sm:mt-1">{order.number}</dd>*/}
      {/*                            </div>*/}
      {/*                            <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">*/}
      {/*                                <dt>Total amount</dt>*/}
      {/*                                <dd className="sm:mt-1">{order.total}</dd>*/}
      {/*                            </div>*/}
      {/*                        </dl>*/}
      {/*                        <a*/}
      {/*                            href={order.invoiceHref}*/}
      {/*                            className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"*/}
      {/*                        >*/}
      {/*                            View Invoice*/}
      {/*                            <span className="sr-only">for order {order.number}</span>*/}
      {/*                        </a>*/}
      {/*                    </div>*/}

      {/*                    <table className="mt-4 w-full text-gray-500 sm:mt-6">*/}
      {/*                        <caption className="sr-only">Products</caption>*/}
      {/*                        <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">*/}
      {/*                        <tr>*/}
      {/*                            <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">*/}
      {/*                                Product*/}
      {/*                            </th>*/}
      {/*                            <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">*/}
      {/*                                Price*/}
      {/*                            </th>*/}
      {/*                            <th scope="col" className="hidden py-3 pr-8 font-normal sm:table-cell">*/}
      {/*                                Status*/}
      {/*                            </th>*/}
      {/*                            <th scope="col" className="w-0 py-3 text-right font-normal">*/}
      {/*                                Info*/}
      {/*                            </th>*/}
      {/*                        </tr>*/}
      {/*                        </thead>*/}
      {/*                        <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">*/}
      {/*                        {order.products.map((product) => (*/}
      {/*                            <tr key={product.id}>*/}
      {/*                                <td className="py-6 pr-8">*/}
      {/*                                    <div className="flex items-center">*/}
      {/*                                        <img*/}
      {/*                                            src={product.imageSrc}*/}
      {/*                                            alt={product.imageAlt}*/}
      {/*                                            className="mr-6 h-16 w-16 rounded object-cover object-center"*/}
      {/*                                        />*/}
      {/*                                        <div>*/}
      {/*                                            <div className="font-medium text-gray-900">{product.name}</div>*/}
      {/*                                            <div className="mt-1 sm:hidden">{product.price}</div>*/}
      {/*                                        </div>*/}
      {/*                                    </div>*/}
      {/*                                </td>*/}
      {/*                                <td className="hidden py-6 pr-8 sm:table-cell">{product.price}</td>*/}
      {/*                                <td className="hidden py-6 pr-8 sm:table-cell">{product.status}</td>*/}
      {/*                                <td className="whitespace-nowrap py-6 text-right font-medium">*/}
      {/*                                    <a href={product.href} className="text-indigo-600">*/}
      {/*                                        View<span className="hidden lg:inline"> Product</span>*/}
      {/*                                        <span className="sr-only">, {product.name}</span>*/}
      {/*                                    </a>*/}
      {/*                                </td>*/}
      {/*                            </tr>*/}
      {/*                        ))}*/}
      {/*                        </tbody>*/}
      {/*                    </table>*/}
      {/*                </div>*/}
      {/*            ))}*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</div>*/}
      <Calendar />
    </div>
  )
}

const days = [
  { date: '2021-12-27', events: [] },
  { date: '2021-12-28', events: [] },
  { date: '2021-12-29', events: [] },
  { date: '2021-12-30', events: [] },
  { date: '2021-12-31', events: [] },
  { date: '2022-01-01', isCurrentMonth: true, events: [] },
  { date: '2022-01-02', isCurrentMonth: true, events: [] },
  {
    date: '2022-01-03',
    isCurrentMonth: true,
    events: [
      {
        id: 1,
        name: 'Design review',
        time: '10AM',
        datetime: '2022-01-03T10:00',
        href: '#',
      },
      {
        id: 2,
        name: 'Sales meeting',
        time: '2PM',
        datetime: '2022-01-03T14:00',
        href: '#',
      },
    ],
  },
  { date: '2022-01-04', isCurrentMonth: true, events: [] },
  { date: '2022-01-05', isCurrentMonth: true, events: [] },
  { date: '2022-01-06', isCurrentMonth: true, events: [] },
  {
    date: '2022-01-07',
    isCurrentMonth: true,
    events: [
      {
        id: 3,
        name: 'Date night',
        time: '6PM',
        datetime: '2022-01-08T18:00',
        href: '#',
      },
    ],
  },
  { date: '2022-01-08', isCurrentMonth: true, events: [] },
  { date: '2022-01-09', isCurrentMonth: true, events: [] },
  { date: '2022-01-10', isCurrentMonth: true, events: [] },
  { date: '2022-01-11', isCurrentMonth: true, events: [] },
  {
    date: '2022-01-12',
    isCurrentMonth: true,
    isToday: true,
    events: [
      {
        id: 6,
        name: "Sam's birthday party",
        time: '2PM',
        datetime: '2022-01-25T14:00',
        href: '#',
      },
    ],
  },
  { date: '2022-01-13', isCurrentMonth: true, events: [] },
  { date: '2022-01-14', isCurrentMonth: true, events: [] },
  { date: '2022-01-15', isCurrentMonth: true, events: [] },
  { date: '2022-01-16', isCurrentMonth: true, events: [] },
  { date: '2022-01-17', isCurrentMonth: true, events: [] },
  { date: '2022-01-18', isCurrentMonth: true, events: [] },
  { date: '2022-01-19', isCurrentMonth: true, events: [] },
  { date: '2022-01-20', isCurrentMonth: true, events: [] },
  { date: '2022-01-21', isCurrentMonth: true, events: [] },
  {
    date: '2022-01-22',
    isCurrentMonth: true,
    isSelected: true,
    events: [
      {
        id: 4,
        name: 'Maple syrup museum',
        time: '3PM',
        datetime: '2022-01-22T15:00',
        href: '#',
      },
      {
        id: 5,
        name: 'Hockey game',
        time: '7PM',
        datetime: '2022-01-22T19:00',
        href: '#',
      },
    ],
  },
  { date: '2022-01-23', isCurrentMonth: true, events: [] },
  { date: '2022-01-24', isCurrentMonth: true, events: [] },
  { date: '2022-01-25', isCurrentMonth: true, events: [] },
  { date: '2022-01-26', isCurrentMonth: true, events: [] },
  { date: '2022-01-27', isCurrentMonth: true, events: [] },
  { date: '2022-01-28', isCurrentMonth: true, events: [] },
  { date: '2022-01-29', isCurrentMonth: true, events: [] },
  { date: '2022-01-30', isCurrentMonth: true, events: [] },
  { date: '2022-01-31', isCurrentMonth: true, events: [] },
  { date: '2022-02-01', events: [] },
  { date: '2022-02-02', events: [] },
  { date: '2022-02-03', events: [] },
  {
    date: '2022-02-04',
    events: [
      {
        id: 7,
        name: 'Cinema with friends',
        time: '9PM',
        datetime: '2022-02-04T21:00',
        href: '#',
      },
    ],
  },
  { date: '2022-02-05', events: [] },
  { date: '2022-02-06', events: [] },
]
const selectedDay = days.find((day) => day.isSelected)

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

import { GoogleMap, useLoadScript } from '@react-google-maps/api'

const Map = () => {
  // laod script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })

  if (!isLoaded) return <div>Loading....</div>

  // static lat and lng
  const center = { lat: 24.7961217, lng: 120.9966699 }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      {/* map component  */}
      <GoogleMap
        zoom={12}
        center={center}
        mapContainerClassName="map"
        mapContainerStyle={{ width: '80%', height: '300px', margin: 'auto' }}
      ></GoogleMap>
    </div>
  )
}

function Calendar() {
  return (
    <>
      <Header />
      {/*<GoogleMap/>*/}
      <Map />
      <div className="lg:flex lg:h-full lg:flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            <time dateTime="2022-01">January 2022</time>
          </h1>
          <div className="flex items-center">
            <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
              <button
                type="button"
                className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
              >
                Today
              </button>
              <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
              <button
                type="button"
                className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden md:ml-4 md:flex md:items-center">
              <Menu as="div" className="relative">
                <Menu.Button
                  type="button"
                  className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Month view
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            Day view
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            Week view
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            Month view
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            Year view
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <div className="ml-6 h-6 w-px bg-gray-300" />
              <button
                type="button"
                className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add event
              </button>
            </div>
            <Menu as="div" className="relative ml-6 md:hidden">
              <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open menu</span>
                <EllipsisHorizontalIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm',
                          )}
                        >
                          Create event
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm',
                          )}
                        >
                          Go to today
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm',
                          )}
                        >
                          Day view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm',
                          )}
                        >
                          Week view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm',
                          )}
                        >
                          Month view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm',
                          )}
                        >
                          Year view
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </header>
        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
          <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
            <div className="bg-white py-2">
              M<span className="sr-only sm:not-sr-only">on</span>
            </div>
            <div className="bg-white py-2">
              T<span className="sr-only sm:not-sr-only">ue</span>
            </div>
            <div className="bg-white py-2">
              W<span className="sr-only sm:not-sr-only">ed</span>
            </div>
            <div className="bg-white py-2">
              T<span className="sr-only sm:not-sr-only">hu</span>
            </div>
            <div className="bg-white py-2">
              F<span className="sr-only sm:not-sr-only">ri</span>
            </div>
            <div className="bg-white py-2">
              S<span className="sr-only sm:not-sr-only">at</span>
            </div>
            <div className="bg-white py-2">
              S<span className="sr-only sm:not-sr-only">un</span>
            </div>
          </div>
          <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
            <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
              {days.map((day) => (
                <div
                  key={day.date}
                  className={classNames(
                    day.isCurrentMonth
                      ? 'bg-white'
                      : 'bg-gray-50 text-gray-500',
                    'relative px-3 py-2',
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={
                      day.isToday
                        ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                        : undefined
                    }
                  >
                    {day.date.split('-').pop().replace(/^0/, '')}
                  </time>
                  {day.events.length > 0 && (
                    <ol className="mt-2">
                      {day.events.slice(0, 2).map((event) => (
                        <li key={event.id}>
                          <a href={event.href} className="group flex">
                            <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                              {event.name}
                            </p>
                            <time
                              dateTime={event.datetime}
                              className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                            >
                              {event.time}
                            </time>
                          </a>
                        </li>
                      ))}
                      {day.events.length > 2 && (
                        <li className="text-gray-500">
                          + {day.events.length - 2} more
                        </li>
                      )}
                    </ol>
                  )}
                </div>
              ))}
            </div>
            <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
              {days.map((day) => (
                <button
                  key={day.date}
                  type="button"
                  className={classNames(
                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                    (day.isSelected || day.isToday) && 'font-semibold',
                    day.isSelected && 'text-white',
                    !day.isSelected && day.isToday && 'text-indigo-600',
                    !day.isSelected &&
                      day.isCurrentMonth &&
                      !day.isToday &&
                      'text-gray-900',
                    !day.isSelected &&
                      !day.isCurrentMonth &&
                      !day.isToday &&
                      'text-gray-500',
                    'flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10',
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      day.isSelected &&
                        'flex h-6 w-6 items-center justify-center rounded-full',
                      day.isSelected && day.isToday && 'bg-indigo-600',
                      day.isSelected && !day.isToday && 'bg-gray-900',
                      'ml-auto',
                    )}
                  >
                    {day.date.split('-').pop().replace(/^0/, '')}
                  </time>
                  <span className="sr-only">{day.events.length} events</span>
                  {day.events.length > 0 && (
                    <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                      {day.events.map((event) => (
                        <span
                          key={event.id}
                          className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                        />
                      ))}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        {selectedDay?.events.length > 0 && (
          <div className="px-4 py-10 sm:px-6 lg:hidden">
            <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
              {selectedDay.events.map((event) => (
                <li
                  key={event.id}
                  className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
                >
                  <div className="flex-auto">
                    <p className="font-semibold text-gray-900">{event.name}</p>
                    <time
                      dateTime={event.datetime}
                      className="mt-2 flex items-center text-gray-700"
                    >
                      <ClockIcon
                        className="mr-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {event.time}
                    </time>
                  </div>
                  <a
                    href={event.href}
                    className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                  >
                    Edit<span className="sr-only">, {event.name}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </>
  )
}
