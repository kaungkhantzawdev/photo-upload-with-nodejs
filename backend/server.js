import express from 'express';
import cors from 'cors';
import multer from 'multer';


// declare app
const app = express();
app.use(cors())

app.get('/', (req, res) => {
    res.json({ msg: 'I am testing'})
})

//file
app.post('/upload', (req, res, next) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './uploads')
        },
        filename: function (req, file, cb) {
          const temp_file_arr = file.originalname.split('.')
          const temp_filename = temp_file_arr[0]
          const temp_file_extension = temp_file_arr[1]
    
          const uniqueSuffix = Date.now() + '.' + temp_file_extension
          cb(null, file.fieldname + '-' + uniqueSuffix)
        }
      })
    
      const upload = multer({ storage: storage }).single('photo') 
      upload(req, res, function (err){
        if(err){
            res.json({msg: 'error uploading', err: err})
        }else{
            res.json({msg: 'success uploading'})
        }
      })
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})