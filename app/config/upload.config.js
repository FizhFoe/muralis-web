const multer = require("multer")
const path = require("path")
const fs = require("fs")

const uploadDir = path.join(__dirname, '../../frontend/public/uploads/categorias')

if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) =>
        cb(null, uploadDir)
    ,
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const nomeUnico = `${Date.now()}${ext}`
        cb(null, nomeUnico)
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 8 * 1024 * 1024 }, //8 MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Apenas imagens'))
        }
        cb(null, true)
    }
});

module.exports = upload