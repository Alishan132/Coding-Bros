const express = require("express")
const app = express()

const db = require("./database")

app.use(express.static("public"))

app.get("/app", (req,res) => {
    db.query("USE coding_bros;")
    res.send("Hello World!")
})

app.listen(3000, () => {
    console.log("listening on 3000")
})