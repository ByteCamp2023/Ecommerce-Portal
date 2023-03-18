import express from 'express'
import asyncHandler from 'express-async-handler'
import generateToken from './../utils/genarateToken.js'
import Supplier from './../models/supplierModel.js';
import nodeGeocoder from 'node-geocoder'

// @desc    Create supplier product
// @rout    POST /api/supplier/
// @access  private
const createSupplierProduct = asyncHandler(async (req, res) => {

    const {
        name,
        email,
        address,
        image,
        description,
        cropSelection
    } = req.body

    if (name & address === '') {
        res.status(400)
        throw new Error('No Products Items')
    } else {
        let options = {
            provider: 'openstreetmap'
        };

        let geoCoder = nodeGeocoder(options);

        const getCordinates = geoCoder.geocode(address).then(
            response => {
                return response[0]
            }).catch((err) => {
                console.log(err);
            });

        const getLatLong = async () => {
            const latAndLong = await getCordinates

            const supplier = await Supplier.create({
                user: req.user._id,
                name,
                email,
                address,
                longitude: latAndLong.longitude,
                latitude: latAndLong.latitude,
                image,
                description,
                cropSelection
            })
            const createdSupplierProduct = await supplier.save()

            res.status(201).json(createdSupplierProduct)
        }

        getLatLong()
    }
})

// @desc    Get logged in user products
// @route   GET /api/supplier/myproducts
// @access  Private
const getMyProducts = asyncHandler(async (req, res) => {
    const products = await Supplier.find({ user: req.user._id })
    res.json(products)
})

// @desc    Get all orders
// @route   GET /api/supplier
// @access  Private/Admin
const getProducts = asyncHandler(async (req, res) => {
    const products = await Supplier.find({}).populate('user', 'id name')
    res.json(products)
})

// @desc    Fetch product by id
// @rout    GET /seeds/:id
// @access  public
const getFarmerProductById = asyncHandler(async (req, res) => {
    const product = await Supplier.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product not Found')
    }
})

// @desc    Update Product Review
// @rout    POST /supplierproducts/:id/review
// @access  private/ Admin
const createFarmerProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Supplier.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)

        product.isReviwed = true

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()

        res.status(201).json({ message: 'Review added' })

    } else {
        res.status(401)
        throw new Error('Product not found')
    }
})

// @desc    update product reviewed
// @rout    PUT /supplierproducts/:id/review
// @access  Private/Admin
const updateProductReviewed = asyncHandler(async (req, res) => {
    const product = await Supplier.findById(req.params.id)

    if (product) {
        product.isAdmin = req.body.isAdmin

        const updatedProduct = await product.save()

        res.json({
            _id: updatedProduct._id,
            isAdmin: updatedProduct.isAdmin,
        })
    } else {
        res.status(401)
        throw new Error('Product not found!!')
    }
})

export {
    createSupplierProduct,
    getMyProducts,
    getProducts,
    getFarmerProductById,
    createFarmerProductReview,
    updateProductReviewed
}