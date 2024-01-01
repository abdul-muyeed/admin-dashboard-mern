import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import Product from "./models/product.js";
import ProductStat from "./models/productStat.js";
import User from "./models/user.js";
import Transaction from "./models/transaction.js";
import  {dataProduct, dataProductStat, dataUser, dataTransaction} from "./data/index.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGOOSE_URI).then(() =>{
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    // Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat)
    // User.insertMany(dataUser) 
    //  Transaction.insertMany(dataTransaction)
  })
  .catch((error) => console.log('error',error.message));
