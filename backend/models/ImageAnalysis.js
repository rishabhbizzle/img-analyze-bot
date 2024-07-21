const mongoose = require('mongoose');

const imageAnalysisSchema = new mongoose.Schema({
  originalText: String,
  imageText: String,
  imageContent: String,
  analysisByAi: String,
  createdAt: {
      type: Date,
      default: Date.now,
  },
});

module.exports = mongoose.model('ImageAnalysis', imageAnalysisSchema);