const { createWorker } = require('tesseract.js');
const { bedrock } = require('@ai-sdk/amazon-bedrock');
const { generateText } = require('ai');
const ImageAnalysis = require('../models/ImageAnalysis');

const analyzeImage = async (text, imagePath) => {
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

    await analysis.save()
    return analysis
}


module.exports = {
    analyzeImage
}
