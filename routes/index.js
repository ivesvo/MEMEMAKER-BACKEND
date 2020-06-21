var express = require('express');
var router = express.Router();
const upload = require('../utils/upload')
const fs = require('fs')
const { loadOriginal, saveOriginals } = require('../utils/data')
var jimp = require('jimp');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post("/upload", (req, res, next) => {

  upload(req, res, function (err) {
    if (err) {
      return res.render("index", { error: err.message })}
    if (!req.file){
      return res.render("index", { error: "you need to upload a file" })
    }
    console.log(req.file)
    const originals = loadOriginal()
    const found = originals.find(item => item.size === req.file.size && item.originalname === req.file.originalname)
    if(found){
      fs.unlinkSync(req.file.path)
      
    }else{
      originals.push({ filename: req.file.filename, originalname:req.file.originalname, size: req.file.size })
      // jimp.read("",(err,)=>{
      //   profile
         
      // })
      
    }

    saveOriginals(originals)
    res.render("original", {images: originals, path: "images/originals", message: "succesfully uploaded"})


  })

})
module.exports = router;
