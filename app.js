const express = require("express")
const app = express()

const db = require("./database")
const knex = require("./knex")

const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const mongodbURI = "mongodb+srv://sam:sam123@nodeexpressproject.eotjdr9.mongodb.net/node-auth";
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true,})
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("error from db is :", err))
;

const {checkUser} = require("./auth/middleware")
const authRoutes = require("./routes/authRoutes")

// ENDPOINTS 
app.use(express.json())
app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(cookieParser());
app.use(express.urlencoded({extended : false}))

app.get("/", checkUser, async (req,res) => {
    let where = {}
    if(req.query.city != null && req.query.city != ""){
        where.city = req.query.city
    }
    if(req.query.rating != null && req.query.rating){
        where.rating = req.query.rating
    }

    const hotels = await knex.select("*").from("hotels").where(where)
    const uniqueCities = await knex.select("city").distinct().from("hotels")
    const cities = uniqueCities.map(hotel => {
            return hotel.city
    }) 

    res.render("index", {hotels : hotels, searchValues : req.query, cities: cities})
})

app.use(authRoutes)

app.listen(3000, () => {
    console.log("listening on 3000")
})