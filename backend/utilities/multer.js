const multer = require('multer');
const os = require('os');

const multerFilter =
  (acceptedMimetypes = ['jpg', 'jpeg', 'png']) =>
  (req, file, cb) => {
    for (let acceptedMimetype of acceptedMimetypes) {
      if (file.mimetype.includes(acceptedMimetype)) {
        cb(null, true);
        return;
      }
    }
    cb(new Error('Please upload a valid file'));
  };

const multerUpload = (acceptedMimetypes) => {
  return multer({
    dest: os.tmpdir(),
    fileFilter: multerFilter(acceptedMimetypes),
  });
};


module.exports = { multerUpload};
