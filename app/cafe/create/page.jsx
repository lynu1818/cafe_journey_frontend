'use client'

import React, {useState, useEffect, useRef} from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    Autocomplete,
} from "@react-google-maps/api";
import {Header} from '@/components/Header'
import {useRouter} from "next/navigation";

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
import {PhotoIcon, UserCircleIcon} from '@heroicons/react/24/solid'


const CreateCafePage = () => {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [searchLngLat, setSearchLngLat] = useState(null);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [currentLocation, setCurrentLocation] = useState(null);
    const autocompleteRef = useRef(null);
    const [tags, setTags] = useState([]);
    const [checkedTags, setCheckedTags] = useState({});
    const [coverPhoto, setCoverPhoto] = useState(null);
    const router = useRouter();

    function fetchCafeTags() {
        fetch('http://localhost:3001/api/1.0/tag/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        },)
            .then(res => res.json())
            .then(data => {
                console.log("fetch cafe tag: ", data);
                setTags(data); // Update this line based on your API response structure
                const initialCheckedState = {};
                data.forEach(tag => { // Update based on your API response structure
                    initialCheckedState[tag.name] = false;
                });
                setCheckedTags(initialCheckedState);
                console.log("fetch cafe tag: ", data)
            })
            .catch(err => console.log(err)
            )
    }

    useEffect(() => {
        fetchCafeTags()
    }, []);

    const handleCheckboxChange = (tagName) => {
        setCheckedTags(prevState => ({
            ...prevState,
            [tagName]: !prevState[tagName]
        }));
    };

    const handleGoToHomePage = () => {
        router.replace("/");
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const form = e.target;
        const body = JSON.stringify({
            name: form.name.value,
            address: form.address.value,
            description: form.description.value,
            main_image: coverPhoto,
            tags: Object.entries(checkedTags).filter(([tag, checked]) => checked).map(([tag]) => tag),
            city: selectedPlace.address_components[4].long_name,
            lat: selectedPlace.geometry.location.lat(),
            lng: selectedPlace.geometry.location.lng(),
            phone: selectedPlace.formatted_phone_number,
            opening_hours: selectedPlace.opening_hours.weekday_text.join(", "),
            place_id: selectedPlace.place_id,
        })


        fetch('http://localhost:3001/api/1.0/cafe/create', {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            }
        },)
            .then(res => res.json())
            .then(data => {
                console.log("create cafe: ", data)
            })
            .catch(err => console.log(err)
            )

    }


    // laod script for google map
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyDavR0jMSo5C4urskDvTDDmemhR8pKILOM",
        libraries: ["places"],
    });

    if (!isLoaded) return <div>
        {/*Loading....*/}
    </div>;

    // static lat and lng
    const center = {lat: 24.7961217, lng: 120.9966699};

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current.getPlace();
        setSelectedPlace(place);
        setSearchLngLat({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        });
        setCurrentLocation(null);

        // Update form fields
        setName(place.name); // Assuming place has a 'name' field
        setAddress(place.formatted_address);
        const url = place.photos[0].getUrl();
        setCoverPhoto(url); // Assuming you have a photo in your place object
        console.log("cover photo: ", url);
        console.log("Set location", place.geometry.location.lat(), place.geometry.location.lng());
        console.log("Set place", place);
    };


    // get current location
    const handleGetLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    setSelectedPlace(null);
                    setSearchLngLat(null);
                    setCurrentLocation({lat: latitude, lng: longitude});
                    console.log("Get Location", latitude, longitude);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    // // Update form fields when selectedPlace changes
    // useEffect(() => {
    //     setName(name);
    //     setAddress(address);
    // }, [name, address, description]);


    // on map load
    const onMapLoad = (map) => {
        const controlDiv = document.createElement("div");
        const controlUI = document.createElement("div");
        controlUI.innerHTML = "Get Location";
        controlUI.style.backgroundColor = "white";
        controlUI.style.color = "black";
        controlUI.style.border = "2px solid #ccc";
        controlUI.style.borderRadius = "3px";
        controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
        controlUI.style.cursor = "pointer";
        controlUI.style.marginBottom = "22px";
        controlUI.style.textAlign = "center";
        controlUI.style.width = "100%";
        controlUI.style.padding = "8px 0";
        controlUI.addEventListener("click", handleGetLocationClick);
        controlDiv.appendChild(controlUI);


        map.controls[window.google.maps.ControlPosition.LEFT_TOP].push(
            controlDiv
        );
    };

    return (
        <>
            <meta charSet="utf-8"/>
            <Header/>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                {/* search component  */}
                <Autocomplete
                    onLoad={(autocomplete) => {
                        console.log("Autocomplete loaded:", autocomplete);
                        autocompleteRef.current = autocomplete;
                    }}
                    onPlaceChanged={handlePlaceChanged}
                    options={{
                        fields: [
                            "address_components", "formatted_address", "geometry", "name", "editorial_summary",
                            "place_id", "url", "types", "business_status", "photos", "opening_hours", "formatted_phone_number"]
                    }}
                >
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="text"
                               className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Search for a location"
                        />
                    </div>
                    {/*<input type="text" placeholder="Search for a location"/>*/}
                </Autocomplete>

                {/* map component  */}
                <GoogleMap
                    zoom={currentLocation || selectedPlace ? 18 : 12}
                    center={currentLocation || searchLngLat || center}
                    mapContainerClassName="map"
                    mapContainerStyle={{width: "80%", height: "300px", margin: "auto"}}
                    onLoad={onMapLoad}
                    defaultOptions={{
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                >
                    {selectedPlace && <Marker position={searchLngLat}/>}
                    {currentLocation && <Marker position={currentLocation}/>}
                </GoogleMap>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className="space-y-12 ml-5 mr-5">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <div
                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete="name"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Address
                                </label>
                                <div className="mt-2">
                                    <div
                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            autoComplete="address"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            onChange={(e) => setAddress(e.target.value)}
                                            value={address}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                />
                                </div>
                            </div>


                            <div className="col-span-full">
                                <div className="col-span-full">
                                    <label htmlFor="cover-photo"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Cover photo
                                    </label>
                                    <div
                                        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        {coverPhoto ? (
                                            <img src={coverPhoto} alt="Cover" className="h-auto max-w-full rounded-lg"/>
                                        ) : (
                                            <div className="text-center">
                                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300"
                                                           aria-hidden="true"/>
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file"
                                                               className="sr-only"/>
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to
                                                    10MB</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className="border-b border-gray-900/10 pb-12">


                        <div className="mt-10 space-y-10">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Tags</legend>
                                <div className="mt-6 space-y-6">
                                    {tags.map(tag => (
                                        <div key={tag.name} className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input
                                                    id={tag.name}
                                                    name={tag.name}
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    checked={checkedTags[tag.name]}
                                                    onChange={() => handleCheckboxChange(tag.name)}
                                                />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label htmlFor={tag.name} className="font-medium text-gray-900">
                                                    {tag.name}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>


                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button onClick={handleGoToHomePage} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        取消
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-amber-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        新增
                    </button>
                </div>
            </form>

        </>
    );
};

export default CreateCafePage;
