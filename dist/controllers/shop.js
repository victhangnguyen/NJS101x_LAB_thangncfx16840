"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckout = exports.getOrders = exports.postCartDeleteProduct = exports.postCart = exports.getCart = exports.getIndex = exports.getProduct = exports.getProducts = void 0;
//! Models
const product_1 = __importDefault(require("../models/product"));
const getProducts = (req, res, next) => {
    // Product.fetchAll((products: Array<Product>) => {
    //   res.render('shop/product-list', {
    //     prods: products,
    //     pageTitle: 'All Products',
    //     path: '/products',
    //   });
    // });
};
exports.getProducts = getProducts;
const getProduct = (req, res, next) => {
    // //! extract that Dynamic path segment
    // const prodId = req.params.productId;
    // Product.findById(prodId, (product: Product) => {
    //   res.render('shop/product-detail', {
    //     product: product,
    //     pageTitle: product.title,
    //     path: '/products',
    //   });
    // });
};
exports.getProduct = getProduct;
const getIndex = (req, res, next) => {
    product_1.default.fetchAll()
        .then(([rows, fieldPacket]) => {
        //! [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]]
        res.render('shop/index', {
            prods: rows,
            pageTitle: 'Shop',
            path: '/',
        });
        console.log(rows);
    })
        .catch((err) => console.log(err));
};
exports.getIndex = getIndex;
const getCart = (req, res, next) => {
    // Cart.getCart((cart) => {
    //   Product.fetchAll((products: Array<Product>) => {
    //     const cartProducts = [];
    //     //! if we have no products in the Cart, then cart products will be an empty Array.
    //     for (const product of products) {
    //       const cartProductData = cart?.products.find((prod) => prod.id === product.id);
    //       if (cartProductData) {
    //         cartProducts.push({ productData: product, qty: cartProductData.qty });
    //         //! __important This is use for example, with large data, we should use function database
    //       }
    //     }
    //     console.log(cartProducts);
    //     res.render('shop/cart', {
    //       products: cartProducts,
    //       path: '/cart',
    //       pageTitle: 'Your Cart',
    //     });
    //   });
    // });
};
exports.getCart = getCart;
const postCart = (req, res, next) => {
    // const prodId: string = req.body.productId;
    // res.redirect('/cart');
    // Product.findById(prodId, (product: Product) => {
    //   Cart.addProduct(product.id!, product.price);
    // });
    // //! get route cart -> render Cart route
};
exports.postCart = postCart;
const postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    // //! We can alse use a hidden input to pass the [prop: price] to the backend.
    // //! I think this Ok, If we only pass the [prop: id] through the req and then we do all the data retrieval on the backend.
    // Product.findById(prodId, (product: Product) => {
    //   Cart.deleteProduct(prodId, product.price);
    //   res.redirect('/cart');
    // });
};
exports.postCartDeleteProduct = postCartDeleteProduct;
const getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
    });
};
exports.getOrders = getOrders;
const getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
    });
};
exports.getCheckout = getCheckout;
//# sourceMappingURL=shop.js.map