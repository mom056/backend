const router = require('express').Router();
const Estate = require('../models/Estate');
const multer = require('multer');
const path = require('path');

// Multer disk storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Multer file filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// POST endpoint لإضافة عقار جديد
router.post('/', upload.single('mainImage'), async (req, res) => {
    const userId = req.body.userID;
    const {
        propertyType,
        subPropertyType,
        contractType,
        area,
        bedrooms,
        bathrooms,
        masterBedrooms,
        kitchens,
        floorNumber,
        constructionYear,
        price,
        description,
        mainPropertyFeature,
        city,
        address,
        mapEmbed
    } = req.body;

    const mainImageFilePath = req.file.path;

    try {
        const estate = new Estate({
            user: userId,
            propertyType,
            subPropertyType,
            contractType,
            area,
            bedrooms,
            bathrooms,
            masterBedrooms,
            kitchens,
            floorNumber,
            constructionYear,
            price,
            description,
            mainPropertyFeature,
            city,
            address,
            mapEmbed,
            mainImage: mainImageFilePath
        });

        const createdEstate = await estate.save();
        res.status(201).json(createdEstate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add estate' });
    }
});

// GET endpoint لاسترداد كافة العقارات
router.get('/', async (req, res) => {
    try {
        const estates = await Estate.find().sort({ createdAt: -1 });
        res.status(200).json(estates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch estates' });
    }
});

// GET endpoint لاسترداد عقار بواسطة الهوية
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const estate = await Estate.findById(id).populate('user');
        if (!estate) {
            return res.status(404).json({ message: 'Estate not found' });
        }
        res.status(200).json(estate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch estate' });
    }
});

// GET endpoint لاسترداد كافة العقارات الخاصة بمستخدم معين
router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const estates = await Estate.find({ user: userId });
        res.status(200).json(estates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch user estates' });
    }
});

// PATCH endpoint لتحديث عقار محدد بواسطة الهوية
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const {
        propertyType,
        subPropertyType,
        contractType,
        area,
        bedrooms,
        bathrooms,
        masterBedrooms,
        kitchens,
        floorNumber,
        constructionYear,
        price,
        description,
        mainPropertyFeature,
        city,
        address,
        mainImage
    } = req.body;

    try {
        const updatedEstate = await Estate.findByIdAndUpdate(
            id,
            {
                propertyType,
                subPropertyType,
                contractType,
                area,
                bedrooms,
                bathrooms,
                masterBedrooms,
                kitchens,
                floorNumber,
                constructionYear,
                price,
                description,
                mainPropertyFeature,
                city,
                address,
                mainImage
            },
            { new: true }
        );
        res.status(200).json(updatedEstate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update estate' });
    }
});

// DELETE endpoint لحذف عقار محدد بواسطة الهوية
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedEstate = await Estate.findByIdAndDelete(id);
        res.status(200).json(deletedEstate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete estate' });
    }
});

module.exports = router;
