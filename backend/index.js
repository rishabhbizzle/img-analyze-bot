require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { multerUpload } = require('./utilities/multer');
const { analyzeImage } = require('./services/services');
const ImageAnalysis = require('./models/ImageAnalysis');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', async (req, res) => {
    res.send('Server is Up Sensei..!!');
});

app.post('/api/analyze', multerUpload(["jpeg", "png", "jpg"]).single('image'), async (req, res) => {
    try {
        const { text } = req.body;
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Please upload an image' });
        }
        const imagePath = req.file.path;
        const analysis = await analyzeImage(text, imagePath);
        res.json({ success: true, analysis });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'An error occurred during image analysis' });
    }
});

app.get('/api/chats', async (req, res) => {
    try {
        let chats = await ImageAnalysis.find();
        res.json({ success: true, chats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'An error occurred while fetching chats' });
    }
});


app.delete('/api/cleanChats', async (req, res) => {
    try {
        await ImageAnalysis.deleteMany();
        res.json({ success: true, message: 'All chats have been deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'An error occurred while deleting chats' });
    }
});