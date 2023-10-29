import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import CustomMap from '../../components/CustomMap';
import { GET_MARKER_API } from '../../utils/constants';

function CreateMarker() {
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            fetch(GET_MARKER_API, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }).then(res => res.json()).then(res => setData(res));
        })()
    }, [])
    return (
        <>
            <Navbar />
            <CustomMap canMark={true} data={data} />
        </>
    )
}

export default CreateMarker