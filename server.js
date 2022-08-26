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

app.get("/upload_pic", function(req, res){
    res.render("index");
})

app.post('/upload_pic', upload.single('pic'), function(req, res, next){
    console.log(req.file);
    if(req.file){   //file uploaded
        var original_name = req.file.originalname.substring(0, req.file.originalname.lastIndexOf(".")); //get the string between starting index and the file extension
        var file_extension = req.file.originalname.substring(req.file.originalname.lastIndexOf(".")) +"/" + req.file.mimetype.split("/")[1]; 
        var file_type = req.file.mimetype.split("/")[0];
        var file_size = Math.round((req.file.size / 1024) * 100) / 100; //rounding to 2 decimal places
        if(file_size > 1024){
            file_size = Math.round((file_size / 1024) * 100) / 100;   //MegaByte
            file_size = file_size +"MB";
        }
        else{
            file_size = file_size +"KB";
        }
        console.log(file_type);
        console.log(file_extension);
        console.log(original_name);
        console.log(file_size);
        res.render('index',{original_name: original_name, file_type: file_type, file_size: file_size, file_extension: file_extension});
    }
    else{   //file not uploaded
        res.redirect('/');
    }

});


app.listen(3000);