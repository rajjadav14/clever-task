import Navbar from "../../components/Navbar";
import CustomMap from "../../components/CustomMap";
import { useEffect } from "react";
import { GET_MARKER_API } from "../../utils/constants";
import { useState } from "react";

function DashBoard() {
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
        <div className="">
            <Navbar />
            <CustomMap canMark={false} data={data} />
            {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Table View</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Map View</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-stab">.reS..</div>
            </div> */}

        </div>
    )
}

export default DashBoard