"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckout = exports.postOrder = exports.getOrders = exports.postCartDeleteProduct = exports.postCart = exports.getCart = exports.getIndex = exports.getProduct = exports.getProducts = void 0;
//! imp library
const Logging_1 = __importDefault(require("../library/Logging"));
//! Models
const product_1 = __importDefault(require("../models/product"));
//@ /products => GET
const getProducts = (req, res, next) => {
    Logging_1.default.shop('GET getProducts');
    product_1.default.fetchAll()
        .then((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.getProducts = getProducts;
//! Render Details Product
const getProduct = (req, res, next) => {
    Logging_1.default.shop('GET getProduct');
    const prodId = req.params.productId;
    product_1.default.findById(prodId)
        .then((product) => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product === null || product === void 0 ? void 0 : product.title,
            path: '/products',
        });
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.getProduct = getProduct;
const getIndex = (req, res, next) => {
    Logging_1.default.shop('GET getIndex');
    product_1.default.fetchAll()
        .then((productDocs) => {
        res.render('shop/index', {
            prods: productDocs,
            pageTitle: 'Shop',
            path: '/',
        });
    })
        .catch((err) => console.log(err));
};
exports.getIndex = getIndex;
const getCart = (req, res, next) => {
    Logging_1.default.shop('GET getCart');
    // req.user
    //   ?.getCart()
    //   .then(
    //     (cart) => {
    //       cart.getProducts().then((cartProducts) => {
    //         // console.log('hello')
    //         res.render('shop/cart', {
    //           path: '/cart',
    //           pageTitle: 'Your Cart',
    //           products: cartProducts,
    //         });
    //       });
    //     }
    //     //! we can use cart to fetch the Products that inside of it
    //   )
    //   .catch((err) => err);
};
exports.getCart = getCart;
//@ /cart => POST
const postCart = (req, res, next) => {
    var _a;
    Logging_1.default.shop('POST postCart');
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    (_a = req.user) === null || _a === void 0 ? void 0 : _a.getCart().then((cart) => {
        //! find out if product
        fetchedCart = cart;
        return cart.getProducts({ where: { id: prodId } });
    }).then((products) => {
        let product;
        if (products.length > 0) {
            product = products[0];
        }
        if (product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
        }
        return product_1.default.findByPk(prodId);
    }).then((product) => {
        return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity },
        });
    }).then(() => {
        Logging_1.default.shop('redirect to /cart');
        res.redirect('/cart');
    }).catch((err) => console.log(err));
};
exports.postCart = postCart;
const postCartDeleteProduct = (req, res, next) => {
    Logging_1.default.shop('POST postCartDeleteProduct');
    // const prodId: string = req.body.productId;
    // req.user
    //   ?.getCart()
    //   .then((cart) => {
    //     return cart.getProducts({ where: { id: prodId } });
    //   })
    //   .then((products) => {
    //     const product = products[0];
    //     product.cartItem.destroy();
    //   })
    //   .then((result) => {
    //     Logging.admin('redirect /cart');
    //     res.redirect('/cart');
    //   })
    //   .catch((err) => err);
};
exports.postCartDeleteProduct = postCartDeleteProduct;
const getOrders = (req, res, next) => {
    Logging_1.default.shop('GET getOrders');
    // req.user
    //   ?.getOrders({ include: ['products'] })
    //   //! __Eager__Loading
    //   .then((orders) => {
    //     console.log('__orders: ', orders); //! We have an Array of Orders
    //     res.render('shop/orders', {
    //       path: '/orders',
    //       pageTitle: 'Your Orders',
    //       orders: orders,
    //     });
    //   })
    //   .catch((err) => err);
};
exports.getOrders = getOrders;
//@ /create-order => POST
const postOrder = (req, res, next) => {
    Logging_1.default.shop('POST postOrder');
    // let fetchedCart: Cart;
    // req.user
    //   ?.getCart()
    //   .then((cart) => {
    //     fetchedCart = cart;
    //     return cart.getProducts();
    //   })
    //   .then((products) => {
    //     return req.user
    //       ?.createOrder()
    //       .then((order) => {
    //         //! this Promise return order
    //         return order.addProducts(
    //           products.map((product) => {
    //             product.orderItem = { quantity: product.cartItem.quantity };
    //             return product;
    //           })
    //         );
    //       })
    //       .catch((err) => err);
    //   })
    //   .then((result) => {
    //     return fetchedCart.setProducts(null!);
    //   })
    //   .then((result) => {
    //     Logging.shop('redirect to /orders');
    //     res.redirect('/orders');
    //   })
    //   .catch((err) => err);
};
exports.postOrder = postOrder;
const getCheckout = (req, res, next) => {
    Logging_1.default.shop('GET getCheckout');
    // res.render('shop/checkout', {
    //   path: '/checkout',
    //   pageTitle: 'Checkout',
    // });
};
exports.getCheckout = getCheckout;
//# sourceMappingURL=shop.js.map