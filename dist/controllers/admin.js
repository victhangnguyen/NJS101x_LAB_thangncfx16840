"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDeleteProduct = exports.postEditProduct = exports.getEditProduct = exports.getProducts = exports.postAddProduct = exports.getAddProduct = void 0;
//! imp Models
const product_1 = __importDefault(require("../models/product"));
//! GET admin/add-product -> Render page
const getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
};
exports.getAddProduct = getAddProduct;
//! POST admin/add-product
const postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    //! Builds a new model instance and calls save on it.
    //! create method that creates a new Element based on that Model an immediately saves it to the Database
    product_1.default.create({
        //! We don't need to assign an ID, that will be managed automatically
        title,
        imageUrl,
        price,
        description,
    })
        .then((result) => {
        console.log('CREATED PRODUCT!');
        res.redirect('/admin/products');
    })
        .catch((err) => console.log(err));
};
exports.postAddProduct = postAddProduct;
const getProducts = (req, res, next) => {
    product_1.default.findAll()
        .then((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    })
        .then((err) => console.log(err));
};
exports.getProducts = getProducts;
const getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = Number(req.params.productId);
    product_1.default.findByPk(prodId)
        .then((product) => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            product: product,
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
        });
    })
        .catch((err) => console.log(err));
    // Product.findById(prodId, (product: Product) => {
    //   if (!product) {
    //     return res.redirect('/'); //! send response and out callback.
    //   }
    //   res.render('admin/edit-product', {
    //     product: product,
    //     pageTitle: 'Edit Product',
    //     path: '/admin/edit-product',
    //     editing: editMode,
    //   });
    // });
};
exports.getEditProduct = getEditProduct;
const postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    //! Updating Product
    product_1.default.findByPk(prodId)
        .then((product) => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl;
        product.description = updatedDesc;
        //! save(): choose product with id and save() with exist id
        //! and if the product does not exist, it will create a new one, but it happen, it will override or update the old one with our new values.
        return product.save(); //! return Product to continue then
        //! Returns a Promise that resolves to the saved instance (or rejects with a Sequelize.ValidationError,
        //! which will have a property for each of the fields for which the validation failed, with the error message for that field).
    })
        .then((result) => {
        console.log('UPDATED PRODUCT!');
        res.redirect(`/admin/products`);
    })
        .catch((err) => console.log(err));
};
exports.postEditProduct = postEditProduct;
const postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    // Product.destroy({where}); //! Way 2: DELETE options
    //! options?: DestroyOptions<ProductAttributes> | undefined
    //! Delete multiple instances, or set their deletedAt timestamp to the current time if paranoid is enabled.
    product_1.default.findByPk(prodId)
        .then((product) => {
        //! product is an instance of this Model
        return product === null || product === void 0 ? void 0 : product.destroy(); //! Promise
    })
        .then((result) => {
        console.log('DELETED PRODUCT!', result);
        res.redirect('/admin/products');
    })
        .catch((err) => console.log(err));
};
exports.postDeleteProduct = postDeleteProduct;
//# sourceMappingURL=admin.js.map