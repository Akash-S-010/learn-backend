const express = require("express");
const dotenv = require("dotenv").config();
const app = express()
const port = process.env.PORT || 5000;
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorhandler");
const connectDB = require("./config/dbConnections");

connectDB()
app.use(express.json())
app.use(errorHandler)


app.use("/api/contacts", contactRoutes)
app.use("/api/users", userRoutes)




app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})