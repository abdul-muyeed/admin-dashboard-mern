import express from 'express';
import Product from '../models/product.js';
import ProductStat from '../models/productStat.js';
import User from '../models/user.js';
import Transaction from '../models/transaction.js';
import  getCountryIso3  from 'country-iso-2-to-3';


const  router = express.Router();

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const productsWithStats = await Promise.all(
            products.map(async (product) => {
                const stats = await ProductStat.find({ productId: product._id });
                return { ...product._doc, stats };
            })
        );
        res.status(200).json(productsWithStats);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({role: "user"}).select('-password')
        res.status(200).json(customers);
    } catch (error) {
        // console.log(error)
        res.status(404).json({ message: error.message });
    }
}

export const getTransactions = async (req, res) => {
    try {
        const {page=1, pageSize=20, sort=null, search=''} = req.query
        const generateSort =() =>{
            const sortParsed = JSON.parse(sort)
            const sortFormatted = {
                [sortParsed.field]: sortParsed.sort === 'asc' ? 1 : -1
            
            }
            return sortFormatted
        }
        const sortFormatted = Boolean(sort) ? generateSort() : {}
        const transactions = await Transaction.find({
            $or: [
                { userId: { $regex: new RegExp(search, 'i') } },
                { cost: { $regex: new RegExp(search, 'i') } },
            ],
        }).sort(sortFormatted).limit(Number(pageSize)).skip(Number(page))
        const total = await Transaction.countDocuments({
            $or: [
                { userId: { $regex: new RegExp(search, 'i') } },
                { cost: { $regex: new RegExp(search, 'i') } },
            ],
        })
        res.status(200).json({transactions, total});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getGeography = async (req, res) => {
    try {
        const users = await User.find();
        const mappedLocations = users.reduce((acc, {country}) => {
            const countryISO3 = getCountryIso3(country);
            if (!acc[countryISO3]) {
                acc[countryISO3] = 1;
            } else {
                acc[countryISO3] += 1;
            }
            return acc;
        }, {});
        const locations = Object.entries(mappedLocations).map(([country, count]) => ({
            id: country,
            value: count,
        }));
        res.status(200).json(locations);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;