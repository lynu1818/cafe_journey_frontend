'use client'
import {CookiesProvider} from "next-client-cookies/server";
import {Header} from "@/components/Header";
import {useEffect, useState} from "react";
import {
    Marker,
} from "@react-google-maps/api";
import {
    GoogleMap,
    useLoadScript
} from "@react-google-maps/api";
import {jwtDecode} from "jwt-decode";
import {useCookies} from "next-client-cookies";
import {useRouter} from "next/navigation";


const mapStyles = {
    width: '100%',
    height: '50%'
};


function FavoriteCafeList({favoriteCafes}) {
    return (
        <CookiesProvider>
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                {/*<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">*/}
                {/*    <button*/}
                {/*        type="button"*/}
                {/*        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
                {/*    >*/}
                {/*        Add user*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                    名稱
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    地址
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    加入時間
                                </th>
                                {/*<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">*/}
                                {/*    Role*/}
                                {/*</th>*/}
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {favoriteCafes.map((cafe) => (
                                <tr key={cafe.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        <a href={`/cafe/${cafe.id}`}>
                                            {cafe.name}
                                        </a>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{cafe.address}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{cafe.formatted_created_at}</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <a href="#" className="text-amber-600 hover:text-amber-900">
                                            刪除
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </CookiesProvider>
    )
}


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



const Map = ({favoriteCafes}) => {

    // laod script for google map
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading....</div>;

    // static lat and lng
    const center = {lat: 24.7961217, lng: 120.9966699};

    return (
        <CookiesProvider>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
            }}
        >

            {/* map component  */}
            <GoogleMap
                zoom={12}
                center={center}
                mapContainerClassName="map"
                mapContainerStyle={{width: "80%", height: "300px", margin: "auto"}}
            >
                {/* marker component */}
                {favoriteCafes.map(cafe => (
                    <Marker
                        key={cafe.id} // Use a unique identifier for each cafe
                        position={{lat: cafe.lat, lng: cafe.lng}}
                        icon={{
                            url: "https://cdn-icons-png.flaticon.com/128/2589/2589175.png",
                            scaledSize: new window.google.maps.Size(50, 50) // Adjust size as needed
                        }}
                    />
                ))}
            </GoogleMap>
        </div>
        </CookiesProvider>
    );
};


export default function FavoritePage() {
    const [favoriteCafes, setFavoriteCafes] = useState([]);

    const router = useRouter();
    const cookies = useCookies();
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

    function fetchUserFavorites() {
        const userId = user.id;
        fetch(`http://localhost:3001/api/1.0/user/favorite?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }

        }).then((response) => response.json())
            .then((data) => {
                console.log("fetch fav cafes data", data);
                setFavoriteCafes(data);
            }).catch((err) => {
            console.log("Error fetching cafes: ", err);
        });

    }

    useEffect(() => {
        fetchUserFavorites();
    }, []);


    return (
        <>
            <CookiesProvider>
                <Header/>
                <Map favoriteCafes={favoriteCafes}/>
                <FavoriteCafeList favoriteCafes={favoriteCafes}/>
            </CookiesProvider>
        </>
    )
}
