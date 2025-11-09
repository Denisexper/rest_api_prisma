import express from "express"
import morgan from "morgan"
import cors from "cors"
import responseTime from "response-time"
import categoryRoutes from "./routes/category.routes.js"
import productRoutes from "./routes/product.routes.js"
import userRoutes from "./routes/users.routes.js"

const app = express()

app.use(cors())

app.use(express.json())

app.use(responseTime())

app.use(morgan("dev"))

app.listen(4000, () => console.log("server up"))

app.use("/api/category", categoryRoutes)
app.use("/api/product", productRoutes)
app.use("/api/users", userRoutes)
