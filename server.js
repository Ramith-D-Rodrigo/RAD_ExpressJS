const express = require('express');
const multer = require('multer');
const app = express();

var storage = multer.memoryStorage();
const upload = multer({storage: storage});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("index");
});

app.post('/upload_pic', upload.single('pic'), function(req, res, next){
    console.log(req.file);
    var original_name = req.file.originalname.split(".")[0];
    var file_type = req.file.mimetype.split("/")[1];
    var file_size = Math.ceil(req.file.size / 1024) + "KB";
    res.send('/',{original_name, file_type, file_size});
    console.log(file_type);
    console.log(original_name);
    console.log(file_size);
});

app.listen(3030);