import mongoose from 'mongoose';
import { IProduct, IProductDocument } from './product';

//! User Interface
export interface IUser {
  name: string;
  email: string;
  cart: [
    {
      items: Array<ICartProduct>;
      quantity: number;
    }
  ];
}

interface IUserDocument extends IUser, mongoose.Document {
  addToCart: (product: IProductDocument) => IProductDocument;
}
interface IUserModel extends mongoose.Model<IUserDocument> {}
//! Put all of instance methods in this interface

interface ICartProduct {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface ICart {
  items: Array<ICartProduct>;
}

//! User Schema
const userSchema = new mongoose.Schema<IUserDocument>({
  //! ORM
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

//! Instance methods
//! assign a function to the "methods" object of our userSchema
userSchema.methods.addToCart = function (productDoc: IProductDocument) {
  console.log('userSchema.methods.addToCart');
  //! duplicate or not
  const cartProductIndex = this.cart.items.findIndex((item: ICartProduct) => {
    return item.productId.toString() === productDoc._id.toString();
  });

  let newQuantity = 1;
  //! Therefor JavaScript Object works with Referenece, we should use Shallow Array
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    //! increase
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    //! add new
    updatedCartItems.push({
      productId: productDoc._id,
      quantity: newQuantity,
    });
  }

  const updatedCart = { items: updatedCartItems };
  this.cart = updatedCart;
  console.log('__Debugger__this.cart: ', this.cart);
  return this.save();
};

//! User Model
const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);
export default User;
// //! imp library
// import Logging from '../library/Logging';

// //! imp models
// import Product from './product';
// // import Order from './order';

// //! imp ultils - database
// import * as mongoDB from 'mongodb';
// import { getDB } from '../utils/database';
// import { json } from 'sequelize';

// interface ICartProduct {
//   productId: mongoDB.ObjectId;
//   quantity: number;
// }
// export interface ICart {
//   items: Array<ICartProduct>;
//   total: number;
// }

// // const initialCart: ICart = {
// //   items: [],
// //   total: 0,
// // };

// class User {
//   _id: mongoDB.ObjectId | undefined;
//   // cart: ICart;

//   constructor(
//     public name: string,
//     public email: string,
//     public cart: ICart = { items: [], total: 0 }, //! initialCart
//     // cart: ICart,
//     id: mongoDB.ObjectId | string | undefined
//   ) {
//     this._id = id ? new mongoDB.ObjectId(id) : undefined;
//     // this.cart = cart ? cart : initialCart;
//   }

//   save() {
//     const db = getDB();
//     let dbOperation;
//     if (this._id) {
//       //! update User
//       const query = { _id: this._id };

//       dbOperation = db.collection('users').updateOne(query, { $set: this });
//     } else {
//       //! create new User
//       dbOperation = db.collection('users').insertOne(this);
//     }
//     return dbOperation
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   getCart() {
//     // return this.cart;
//     const db = getDB();
//     const productIds = this.cart.items.map((item) => item.productId);
//     // console.log('__Debugger__productIds: ', productIds);
//     return db
//       .collection('products')
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((productDocs) => {
//         // console.log('__Debugger__productDocs: ', productDocs);
//         //! map productIds with productDocs
//         return productDocs.map((pDoc) => {
//           return {
//             ...pDoc,
//             quantity: this.cart.items.find(
//               (i) => i.productId.toString() === pDoc._id.toString()
//             )?.quantity,
//           };
//         });
//       })
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     //! pass an Object allow us to use some specail mongodb query operators.
//     //! $in operator: in this operator takes an Array of IDs and therefore every ID into the Array will be accepted (duyệt)
//     //! and will get back a Cursor which holds reference to all products with one of the IDs mentioned in this Array.
//   }

//   addToCart(productDoc: mongoDB.Document) {
//     const db = getDB();

//     const cartProductIndex = this.cart.items.findIndex((item: ICartProduct) => {
//       return item.productId.toString() === productDoc._id.toString();
//     });

//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items]; //! JavaScript Object works with Referenece

//     if (cartProductIndex >= 0) {
//       //! increase
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         productId: productDoc._id,
//         quantity: newQuantity,
//       });
//     }

//     const updatedCart = { items: updatedCartItems };

//     return db
//       .collection('users')
//       .updateOne({ _id: this._id }, { $set: { cart: updatedCart } })
//       .then((updateResult) => {
//         // console.log('__Debugger__updateResult: ', updateResult);
//         return updateResult;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   resetCart() {
//     const db = getDB();

//     this.cart.items = [];
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new mongoDB.ObjectId(this._id) },
//         { $set: { cart: { items: [] } } }
//       );
//   }

//   deleteItemFromCart(productId: string) {
//     const db = getDB();
//     // console.log('__Debugger__productId: ', productId);
//     const updatedCartItems = this.cart.items.filter(
//       //! filter is not async
//       (i) => i.productId.toString() !== productId
//     );
//     // console.log('__Debugger__updatedCartItems: ', updatedCartItems);

//     const query = { _id: this._id }; //! filter userId

//     return db
//       .collection('users')
//       .updateOne(query, { $set: { cart: { items: updatedCartItems } } })
//       .then((updateResult) => {
//         return updateResult;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   getOrders() {
//     const db = getDB();

//     return db
//       .collection('orders')
//       .find({'user._id': new mongoDB.ObjectId(this._id)}) //! find all of orders base on userId
//       .toArray()
//       .then((orderDocs) => {
//         return orderDocs;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   addOrder() {
//     const db = getDB();
//     return this.getCart()
//       .then((products) => {
//         //! each product: productInfo + quantity
//         const order = {
//           //! implement products information
//           items: products,
//           //! add some information adbout the user
//           user: {
//             //! user: this
//             _id: new mongoDB.ObjectId(this._id),
//             name: this.name,
//             // email: this.email, //! if email that we care that need update, we should not add.
//           },
//         };
//         return db.collection('orders').insertOne(order);
//       })
//       .then((orderDoc) => {
//         //! RESET CART
//         this.resetCart()
//           .then((result) => {
//             Logging.info('addOrder successful! Reset cart');
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//         return orderDoc;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static findById(userId: string) {
//     const db = getDB();
//     const query = { _id: new mongoDB.ObjectId(userId) };
//     return db
//       .collection('users')
//       .findOne(query)
//       .then((userDoc) => {
//         return userDoc;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }

// // the defined model is the class itself
// Logging.info('models.user'); // true

// export default User;
