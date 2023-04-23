const express = require("express")
const app = express()

const db = require("./database")
const knex = require("./knex")

app.use(express.static("public", { type: 'text/css' }))
app.set("view engine", "ejs")


function doQuery (queryStr){
    return new Promise((resolve, reject) => {
        db.query(queryStr, (err, data) => {
            if(err) reject(err)
            else resolve(data)
        })
    })
}

app.get("/", async (req,res) => {
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

app.get("/signin", (req, res) => {
    res.render("signin")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.listen(3000, () => {
    console.log("listening on 3000")
})