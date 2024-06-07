const mongoose = require('mongoose');

const estateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    propertyType: String,
    subPropertyType: String,
    contractType: String,
    area: Number,
    bedrooms: Number,
    bathrooms: Number, 
    masterBedrooms: Number,
    kitchens: Number,
    floorNumber: Number, 
    constructionYear: Date,
    price: Number,  
    description: String,
    mainPropertyFeature: String,
    city: String,
    address: String,  
    mainImage: String,
    mapEmbed: String
}, { timestamps: true });
 
const Estate = mongoose.model('Estate', estateSchema);
 
module.exports = Estate;