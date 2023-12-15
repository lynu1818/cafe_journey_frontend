/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import {Fragment, useEffect, useState} from 'react'
import {
    FaceFrownIcon,
    FaceSmileIcon,
    FireIcon,
    HandThumbUpIcon,
    HeartIcon,
    PaperClipIcon, StarIcon,
    XMarkIcon,
} from '@heroicons/react/20/solid'
import {Listbox, Transition} from '@headlessui/react'
import {jwtDecode} from "jwt-decode";
import {useCookies} from "next-client-cookies";
import {useRouter} from "next/navigation";

const moods = [
    {name: 'Excited', value: '1', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500'},
    {name: 'Loved', value: '2', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400'},
    {name: 'Happy', value: '3', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400'},
    {name: 'Sad', value: '4', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400'},
    {name: 'Thumbsy', value: '5', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500'},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ReviewForm({userId, cafeId}) {
    const router = useRouter();
    console.log("Review form cafeId", cafeId)
    const cookies = useCookies();
    const [selected, setSelected] = useState(moods[4])
    const [content, setContent] = useState('')
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = cookies.get('access_token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    function handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target
        console.log("post review form", form)
        const body = JSON.stringify({
            content: form.content.value,
            star: selected.value,
            userId: user.id,
            cafeId: cafeId
        })

        fetch('http://localhost:3001/api/1.0/review/create', {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(data => {
                console.log("post review form data", data)
                setSelected(moods[4])
                setContent('')
            }).catch(err => {
            console.error(err)
        })

    }

    return (
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
                <img
                    className="inline-block h-10 w-10 rounded-full"
                    src={userId === 0 ? "https://cdn-icons-png.flaticon.com/128/1144/1144760.png" : user?.picture}
                    alt=""
                />
            </div>
            <div className="min-w-0 flex-1">
                <form onSubmit={handleFormSubmit} className="relative">
                    <div
                        className="pt-2 pl-3 pr-3 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                        <label htmlFor="content" className="sr-only">
                            Add your comment
                        </label>
                        <textarea
                            rows={3}
                            name="content"
                            id="content"
                            className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Add your comment..."
                            defaultValue={''}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        {/* Spacer element to match the height of the toolbar */}
                        <div className="py-2" aria-hidden="true">
                            {/* Matches height of button in toolbar (1px border + 36px content height) */}
                            <div className="py-px">
                                <div className="h-9"/>
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                        <div className="flex items-center space-x-5">
                            <div className="flex items-center">
                                {/*<button*/}
                                {/*    type="button"*/}
                                {/*    className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"*/}
                                {/*>*/}
                                {/*    <PaperClipIcon className="h-5 w-5" aria-hidden="true"/>*/}
                                {/*    <span className="sr-only">Attach a file</span>*/}
                                {/*</button>*/}
                            </div>
                            <div className="flex items-center">
                                <Listbox value={selected} onChange={setSelected}>
                                    {({open}) => (
                                        <>
                                            <Listbox.Label className="sr-only">Your mood</Listbox.Label>
                                            <div className="relative">
                                                <Listbox.Button
                                                    className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                          <span className="flex items-center justify-center ml-8">
                            {selected.value === '5' ? (
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                rating < selected.value ? 'text-yellow-400' : 'text-gray-300',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <span>
                                    <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <StarIcon
                                        key={rating}
                                        className={classNames(
                                            rating < selected.value ? 'text-yellow-400' : 'text-gray-300',
                                            'h-5 w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                                <span className="sr-only">{selected.name}</span>
                              </span>
                            )}
                          </span>
                                                </Listbox.Button>

                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options
                                                        className="absolute z-10 -ml-6 mt-1 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                                                        {moods.map((rating) => (
                                                            <Listbox.Option
                                                                key={rating.value}
                                                                className={({active}) =>
                                                                    classNames(
                                                                        active ? 'bg-gray-100' : 'bg-white',
                                                                        'relative cursor-default select-none px-3 py-2'
                                                                    )
                                                                }
                                                                value={rating}
                                                            >
                                                                <div className="flex items-center">

                                                                    <div className="flex items-center">
                                                                        {[0, 1, 2, 3, 4].map((i) => (
                                                                            <StarIcon
                                                                                key={i}
                                                                                className={classNames(
                                                                                    i < rating.value ? 'text-yellow-400' : 'text-gray-300',
                                                                                    'h-5 w-5 flex-shrink-0'
                                                                                )}
                                                                                aria-hidden="true"
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </>
                                    )}
                                </Listbox>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            {
                                userId ? (
                                    <button
                                        type="submit"
                                        className="inline-flex items-center rounded-md bg-amber-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                    >
                                        張貼
                                    </button>
                                ) : (
                                    <button
                                        className="inline-flex items-center rounded-md bg-amber-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                        onClick={() => router.replace('/login')} // Replace '/login' with your login page route
                                    >
                                        登入以張貼
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
