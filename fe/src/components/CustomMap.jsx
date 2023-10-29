import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { ADD_MARKER_API } from "../utils/constants";

export default function CreateMarker({ canMark, data }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAERJz2sWtmRWviNpBdVWqRSb3qBpA-gpI',
        libraries: ["places"],
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map canMark={canMark} data={data} />;
}

function Map({ canMark, data }) {
    const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
    const [selected, setSelected] = useState([]);

    useEffect(() => console.log('selected', selected.length, selected), [selected])

    return (
        <div className="mapContainer">
            {
                canMark && <div className="places-container">
                    <PlacesAutocomplete setSelected={setSelected} />
                </div>
            }

            <GoogleMap
                zoom={10}
                center={center}
                mapContainerClassName="map-container"
            >
                {selected.length && selected.map((position) => {
                    return <Marker position={position} />
                })}
            </GoogleMap>
        </div>
    );
}

const PlacesAutocomplete = ({ setSelected }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setSelected(pre => [...pre, { lat, lng }]);
        const ap = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ address, latitude: lat, longitude: lng })
        }

        const result = await fetch(ADD_MARKER_API, ap).then(res => res.json());
        console.log(result)

    };

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                className="combobox-input"
                placeholder="Search an address"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
};
