const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const { Event } = require('../models');



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }
    cb(null, true);
  }
});


router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { name, description, startDate, endDate, totalGuests } = req.body;
    const imageUrls = req.files ? req.files.map(file => file.filename) : [];

    const event = await Event.create({
      name,
      description,
      images: imageUrls,
      startDate,
      endDate,
      totalGuests: totalGuests || null
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'startDate',
      order = 'ASC',
      search,
      startDate,
      endDate
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    if (startDate) {
      where.startDate = { [Op.gte]: new Date(startDate) };
    }

    if (endDate) {
      where.endDate = { [Op.lte]: new Date(endDate) };
    }

    const { count, rows: events } = await Event.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [[sortBy, order]]
    });

    res.json({
      events,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalEvents: count
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put('/:id', upload.array('images', 5), async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const { name, description, startDate, endDate, totalGuests } = req.body;
    const currentImages = event.images || [];
    const newImages = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    await event.update({
      name,
      description,
      startDate,
      endDate,
      totalGuests: totalGuests || null,
      images: [...currentImages, ...newImages]
    });

    res.json(await event.reload());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }


    if (event.images && Array.isArray(event.images)) {
      event.images.forEach(image => {
        const filePath = path.join(__dirname, '../../uploads', image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    await event.destroy();
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
