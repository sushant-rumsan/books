import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nit*Rogen.123",
    database: "test"
})

app.use(express.json())
app.use(cors())

app.get("/books", (req, res) => {
    const q = "SELECT * FROM BOOKS";
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.get("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "SELECT * FROM BOOKS WHERE id= ?";
    db.query(q, bookId ,(err, data) => {
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `descr`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.descr,
        req.body.price,
        req.body.cover
    ]
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q1 = "DELETE FROM books WHERE id = ?";

    db.query(q1, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Deleted successfully");
    })

})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q1 = "UPDATE books SET `title`=?, `descr`=?, `price`=?, `cover`=? WHERE id = ?";

    const values=[
        req.body.title,
        req.body.descr,
        req.body.price,
        req.body.cover
    ]
    db.query(q1, [...values, bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Updated successfully");
    })

})

app.listen(8800, () => {
    console.log("Connected to backend2")
})