import express from 'express';
import cors from 'cors';
import multer from 'multer';


// declare app
const app = express();
app.use(cors())

app.get('/', (req, res) => {
    res.json({ msg: 'I am testing'})
})

//single file upload
// app.post('/upload', (req, res, next) => {
//     const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//           cb(null, './uploads')
//         },
//         filename: function (req, file, cb) {
//           const temp_file_arr = file.originalname.split('.')
//           const temp_filename = temp_file_arr[0]
//           const temp_file_extension = temp_file_arr[1]
    
//           const uniqueSuffix = Date.now() + '.' + temp_file_extension
//           cb(null, file.fieldname + '-' + uniqueSuffix)
//         }
//       })
    
//       const upload = multer({ storage: storage }).single('photo') 
//       upload(req, res, function (err){
//         if(err){
//             res.json({msg: 'error uploading', err: err})
//         }else{
//             res.json({msg: 'success uploading'})
//         }
//       })
// })

//multiple upload file


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/multiple')
    },
    filename: function (req, file, cb) {
      const temp_file_arr = file.originalname.split('.')
      const temp_filename = temp_file_arr[0]
      const temp_file_extension = temp_file_arr[1]

      const uniqueSuffix = Date.now() + '.' + temp_file_extension
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

//check file type
const fileFilter = (req, file, cb) => {

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
  
  }

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 
    },
    fileFilter: fileFilter
    }).fields([
    { name: 'gallery', maxCount: 2 }
  ])

app.post('/upload-multiple' , (req, res) => {
    console.log(req.files)
    upload(req, res, function (err){
    if(err){
        res.json({msg: 'error uploading', err: err})
    }else{
        res.json({msg: 'success uploading'})
    }
    })
    // res.json({msg: 'success uploading'})


})


app.listen(3000, () => {
    console.log('listening on port 3000');
})