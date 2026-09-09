import express from "express"
import cors from "cors"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path"

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()



//middleware
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin: "http://localhost:5173"
    }
        
    ));
}



app.use(express.json()); //this middleware will parse JSON bodies
app.use(rateLimiter);



app.use("/api/notes",notesRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*",(req,res) =>{
    res.semdFile(path.join(__dirname,"../frontend","dist","index.html"))
})
}

connectDB().then(() => {
    app.listen(PORT, ()=> {
    console.log("Server Started on PORT:",PORT);
});
});
