import express from "express"
import bodyParser from "body-parser"

const app = express();
const port = process.env.PORT || 3000;
let id = 1;
// array to store the posts (the posts will be added as object)
let posts = [];

//Date cause why not
const today = new Date();
const day = today.getDate();
const month = today.getMonth()+1;
const year = today.getFullYear();

const formattedDate = `${day}/${month}/${year}`

//configuring express and bodyparser
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Route to render home page
app.get("/",(req,res)=>{
    res.render("home.ejs" );
});

//Route to render create page
app.get("/create",(req,res)=>{
  res.render("create.ejs")
});

//Route to render posts page
app.get("/posts", (req,res)=>{
    res.render("posts.ejs" , {posts: posts})
});

//handling the data sent from front end
app.post("/create",(req,res)=>{
    const post = {
        id: id++,
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        date: formattedDate
    };
    console.log(post);
    posts.push(post);
    res.redirect("/posts");
});


app.listen(port,()=>{
    console.log(`Server is now runnning on port ${port}`);
})
