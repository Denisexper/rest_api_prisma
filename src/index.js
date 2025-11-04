import express from "express"
import morgan from "morgan"
import cors from "cors"
import categoryRoutes from "./routes/category.routes.js"
import productRoutes from "./routes/product.routes.js"

const app = express()

app.use(cors())

app.use(express.json())

app.use(morgan("dev"))

app.listen(4000, () => console.log("server up"))

app.use("/api/category", categoryRoutes)
app.use("/api/product", productRoutes)

