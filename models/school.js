const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
})

const SchoolSchema = new Schema({
    name: {
        type: String,
        required: [true , 'Name field is required']
    },
    address: {
        type: String
    },
    yearFound: {
        type: Number,
        default: '2000'
    },
    phoneNo: {
        type: String
    },
    status: {
        type: String,
        default: 'Secondary School'
    },
    geometry: GeoSchema
    
});


const School = mongoose.model('school', SchoolSchema);

module.exports = School;