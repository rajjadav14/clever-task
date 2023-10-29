const Marker = require('../models/Marker');
const User = require('../models/User');


exports.addMarker = async (req, res, next) => {
    const { address, latitude, longitude } = req.body;
    console.log(address, latitude, longitude);
    console.log('in add marker');
    const exist = await Marker.findOne({ address });
    const userID = req.profile._id;
    if (exist) {
        console.log('record exists');
        if (req.profile.markers && req.profile.markers.length > 0) {
            const markers = req.profile.markers ? req.profile.markers : [];
            const newMarkers = [...new Set([...markers, exist._id.toString()])];
            console.log('new markers', newMarkers);
            await User.findOneAndUpdate({ _id: userID }, { markers: newMarkers });
            return res.status(200).json({ success: true, message: 'Record already exits' });
        }
        await User.findOneAndUpdate({ _id: userID }, { markers: [exist._id.toString()] });
        return res.status(200).json({ success: true, message: 'Record already exits' });
    }
    const record = new Marker({ address, latitude, longitude });
    await record.save()

    const markers = req.profile.markers ? req.profile.markers : [];
    const newMarkers = [...markers, record._id.toString()]
    console.log('newrecord', userID, record._id, newMarkers);
    User.findOneAndUpdate({ _id: userID }, { markers: newMarkers });

    return res.status(200).json({ success: true, message: 'marker added successfuly' })
};

exports.removeMarker = async (req, res, next) => {
    const id = req.query.id;
    await Marker.deleteOne({ _id: id });
    const userID = req.profile._id.toString();
    const markers = req.profile.markers.length > 0 ? req.profile.markers.map(ele => ele !== id) : [];
    User.findOneAndUpdate({ _id: userID }, { markers })
    return res.json({ success: true, message: 'Marker deleted successfully' }, { markers })
}


exports.getAllMarkers = async (req, res, next) => {
    const markerIds = req.profile.markers;
    console.log(req.profile, 'in get marker')
    const data = [];

    for (let i = 0; i < markerIds.length; i++) {
        const record = await Marker.findById(markerIds[i]);
        data.push(record);
    }

    return res.json({ success: true, data })
}