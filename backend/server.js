require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createWorker } = require('tesseract.js');
const ImageAnalysis = require('./models/ImageAnalysis');
const { multerUpload } = require('./utilities/multer');
const { bedrock } = require('@ai-sdk/amazon-bedrock');
const { generateText } = require('ai');
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
    res.send('Server is Up Captain !!!!!');
});

app.post('/api/analyze', multerUpload(["jpeg", "png", "jpg"]).single('image'), async (req, res) => {
    try {
        const { text } = req.body;
        const imagePath = req.file.path;
        const worker = await createWorker('eng');
        const { data: { text: imageText } } = await worker.recognize(imagePath);
        await worker.terminate();
        const prompt = `Based on the image, the following text was extracted: "${imageText}". User input: "${text}". Please analyze image content and if user input is present provide a response to that if not then just analyze the image content.
        `;
        const { text: analyzeText } = await generateText({
            model: bedrock('mistral.mistral-7b-instruct-v0:2'),
            prompt: prompt,
        });
        const analysis = new ImageAnalysis({
            originalText: text,
            imageText: imageText,
            analysisByAi: analyzeText,
        });

        await analysis.save();

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