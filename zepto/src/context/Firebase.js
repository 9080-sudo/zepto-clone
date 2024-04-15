import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getSimplifiedAddresss } from "../utils/Address";
import { generateOrderId } from "../utils/order";
import { generateReferralId } from "../utils/refer";
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFRPUaFJ4A2v7azidoxnhwuQcw7YojQsM",
  authDomain: "zepto-clone-50782.firebaseapp.com",
  projectId: "zepto-clone-50782",
  storageBucket: "zepto-clone-50782.appspot.com",
  messagingSenderId: "218919420988",
  appId: "1:218919420988:web:bec43c6fa958a743ccaf39",
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const firestore = getFirestore(app);
// const storage = getStorage(app);

const FirebaseContext = createContext();
export const useFirebase = () => useContext(FirebaseContext);

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const [showLocation, setShowLocation] = useState(true);
  const [location, setLocation] = useState("");

  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  const [cart, setCart] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState("");

  const [deliveryTip, setDeliveryTip] = useState(0);
  const [deliveryInstructions, setDeliveryInstructions] = useState([]);

  const [amountToBePaid, setAmountToBePaid] = useState(0);

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        console.log("setting user");
      } else {
        setUser(null);
      }
    });
    // console.log("in useeffect");
  }, []);

  useEffect(() => {
    const changeUserDetails = async () => {
      if (user) {
        const collectionRef = collection(firestore, "users");
        let q = query(collectionRef, where("email", "==", user.email));
        console.log(user, user.email, "user and email");
        let u = await getDocs(q);
        u = u.docs;
        console.log(u, "present user details");
        let id = u[0].id;
        u = { id, ...u[0].data() };
        console.log(u, "user details");
        setUserDetails(u);
        // console.log(u.cart)
        setCart(u.cart || []);
        setSelectedAddress(u.selectedAddress || "");
      } else setUserDetails(null);
    };
    changeUserDetails();
  }, [user]);

  useEffect(() => {
    async function updateUser() {
      if (userDetails) {
        console.log(cart, "cart details");
        const docRef = doc(firestore, "users", userDetails.id);
        await updateDoc(docRef, { cart });
      }
    }
    updateUser();
  }, [userDetails, cart]);

  useEffect(() => {
    const totalAmountAfterCut = cart.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.salePrice;
    }, 0);
    setAmountToBePaid(totalAmountAfterCut + 5 + 2 + deliveryTip);
  }, [cart, deliveryTip]);

  // useEffect(() => {
  //   if(userDetails){
  //     const docRef = doc(firestore, 'users', userDetails.id);
  //   }
  // }, [userDetails])

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const collectionRef = collection(firestore, "categories");
  //     const result = await getDocs(collectionRef);
  //     // console.log(result);
  //     const res = result.docs;
  //     for (let value of res) {
  //       console.log(value.data());
  //     }
  //   };
  //   getProducts();
  // }, []);

  // const docRef = doc(firestore, "categories", 'sPov246v4qGCaLt5JiUY');
  // const result = await getDoc(docRef);
  // console.log(result)
  // return result;

  //     const collectionRef = collection(
  //       firestore,
  //       "categories",
  //       "1",
  //       "all",
  //       "1",
  //       "products"
  //     );
  //     const result = await getDocs(collectionRef);
  //     console.log(result);
  //     const res = result.docs;
  //     for (let value of res) {
  //       console.log(value.data());
  //     }
  //   };
  //   getProducts();
  // }, []);

  // useEffect(() => {
  //   function showPosition(position) {
  //     console.log(position.coords.latitude, position.coords.longitude);
  //   }
  //   navigator.geolocation.getCurrentPosition(showPosition);
  // }, []);

  // useEffect(() => {
  //   async function getDetails(){
  //     const docRef = doc(firestore, 'temp', 'JOsREfJ83R2NwzInV338')
  //     const details = await getDoc(docRef)
  //     console.log(details.data())
  //   }
  //   getDetails()
  // }, [])

  // useEffect(() => {
  //   async function update(){
  //     const docRef = doc(firestore, 'users', 'lzgQdnc2Lim3rKtkq1Nh')
  //     await updateDoc(docRef, {
  //       name: 'tiger',
  //       age: 23
  //     })
  //   }
  //   update()
  // },[])

  // useEffect(() => {
  //   const getVouchers = async () => {
  //     const collectionRef = collection(firestore, "vouchers");
  //     const vouchers = await getDocs(collectionRef);
  //     let results = vouchers.docs;
  //     results.map((res) => {
  //       res = res.data();
  //       // console.log(res.id, res.data());
  //       const today = new Date();
  //       console.log(typeof res.expiryDate);
  //       const expiryDate = res.expiryDate.toDate();
  //       console.log(today < expiryDate);
  //       console.log(res, typeof res.expiryDate.toDate());
  //     });
  //   };
  //   getVouchers();
  // }, []);

  /* User Registering and signing in */
  const signUpUser = async (email, password) => {
    await createUserWithEmailAndPassword(firebaseAuth, email, password);
    console.log("user created");
    const result = await addDoc(collection(firestore, "users"), {
      email,
      password,
      name: "",
      cart: [],
      transactions: [],
      addresses: [],
      referralCode: generateReferralId(),
      recentSearches: []
    });
    // console.log(result, 'user id', result.data())
    // console.log("user is in db");
    // const u = await getDoc(doc(firestore, "users", result.id));
    // console.log(u, "user details");
    // setUserDetails({ id: result.id, ...u.data() });
    await signInWithEmailAndPassword(firebaseAuth, email, password);
    console.log("signin successful");
    return true;
  };

  const signInUser = async (email, password) => {
    const collectionRef = collection(firestore, "users");
    // let users = await getDocs(collectionRef);
    // users = users.docs
    // let isUserExists = users.some(u => {
    //   u = u.data()
    //   return u.email === email
    // })
    let q = query(collectionRef, where("email", "==", email));
    let u = await getDocs(q);
    u = u.docs;
    // console.log(u, "asdf");
    // console.log(Boolean(u), "jkl;");
    if (u.length > 0) {
      try {
        await signInWithEmailAndPassword(firebaseAuth, email, password);
        // console.log(u, 'mno')
        // console.log(u[0].id, 'id')
        // let id = u[0].id;
        // u = { id, ...u[0].data() };
        // console.log(u, "userdetails");
        // // console.log(u, 'pqr')
        // setUserDetails(u);
        return true;
      } catch (err) {
        return false;
      }
    } else {
      return await signUpUser(email, password);
    }
    // await signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signOutUser = async () => {
    const docRef = doc(firestore, "users", userDetails.id);
    await updateDoc(docRef, { cart: [], selectedAddress: "" });
    await signOut(firebaseAuth);
    changeToInitialState();
  };

  const changeToInitialState = () => {
    setUserDetails(null);
    setCart([]);
    setShowLocation(true);
    setLocation("");
    setCategoryName("");
    setSubCategoryName("");
    setSelectedAddress("");
    setDeliveryTip("");
    setDeliveryInstructions([]);
  };

  const isLoggedIn = user ? true : false;
  console.log(user, "user");
  console.log(userDetails, "userDetails");

  //   console.log(isLoggedIn, user)

  const getCategories = async () => {
    const collectionRef = collection(firestore, "categories");
    let result = await getDocs(collectionRef);
    result = result.docs;
    let categories = result.map((res) => [res.id, res.data()]);
    return categories;
    // return result
    // for(let value of result){
    //   console.log(value.data())
    // }
  };

  /* Location */
  const openShowLocation = () => {
    console.log("setting true");
    setShowLocation(true);
  };

  const closeShowLocation = () => {
    setShowLocation(false);
  };

  const changeLocation = (loc) => {
    setLocation(loc);
  };

  /* First Sub Category */
  const getFirstSubCategory = async (categoryId) => {
    const collectionRef = collection(
      firestore,
      "categories",
      categoryId,
      "subcategories",
      "1",
      "products"
    );
    const result = await getDocs(collectionRef);
    const products = result.docs.map((product) => [product.id, product.data()]);
    return products;
  };

  const getCategory = async (categoryId) => {
    const docRef = doc(firestore, "categories", categoryId);
    const result = await getDoc(docRef);
    setCategoryName(result.data().name);
  };

  const getSubCategories = async (categoryId) => {
    await getCategory(categoryId);
    const collectionRef = collection(
      firestore,
      "categories",
      categoryId,
      "subcategories"
    );
    const result = await getDocs(collectionRef);
    const subCategories = result.docs.map((subCategory) => [
      subCategory.id,
      subCategory.data(),
    ]);
    return subCategories;
  };

  const getSubCategoryProducts = async (categoryId, subCategoryId) => {
    const collectionRef = collection(
      firestore,
      "categories",
      categoryId,
      "subcategories",
      subCategoryId,
      "products"
    );
    const result = await getDocs(collectionRef);
    const products = result.docs.map((product) => [product.id, product.data()]);
    return products;
  };

  const changeSubCategoryName = (value) => {
    // console.log(value)
    setSubCategoryName(value);
  };

  const addItemToCart = (id, product, qty) => {
    // let productId = `${categoryName}-${subCategoryName}-${id}`;
    // addProductToCart(productId, product, qty);
    addProductToCart(id, product, qty);
  };

  const addProductToCart = (id, product, qty) => {
    let productId = id;
    let newCart = [...cart];
    let existingProductIdx = newCart.findIndex(
      (product) => product.id === productId
    );
    if (existingProductIdx === -1) {
      newCart.push({ id: productId, ...product, quantity: 1 });
    } else {
      newCart[existingProductIdx].quantity += qty;
      if (newCart[existingProductIdx].quantity === 0) {
        newCart = newCart.filter((product) => product.id !== productId);
        console.log(newCart);
      }
    }
    setCart(newCart);
  };

  const addAddress = async (houseNo, buildingNo, landMark, addressLabel) => {
    let address = {
      id: Math.random().toString(36).substring(2),
      houseNo,
      buildingNo,
      landMark,
      addressLabel
    };
    const docRef = doc(firestore, "users", userDetails.id);
    let addresses = userDetails.addresses || [];
    // console.log(addresses,'before update')
    addresses.push(address);
    // console.log(addresses);
    await updateDoc(docRef, { addresses: addresses });
    let uDetails = { ...userDetails };
    if (uDetails.addresses) {
      // uDetails.addresses.push(address);
      console.log(uDetails);
    } else {
      uDetails["addresses"] = [address];
    }
    setUserDetails(uDetails);
  };
  // console.log(cart);

  const updateAddress = async (id, houseNo, buildingNo, landMark, addressLabel) => {
    let uDetails = { ...userDetails };
    uDetails.addresses = uDetails.addresses.map((address) => {
      if (address.id !== id) return address;
      return { id, houseNo, buildingNo, landMark, addressLabel};
    });
    const docRef = doc(firestore, "users", userDetails.id);
    await updateDoc(docRef, { addresses: uDetails.addresses });
    setUserDetails(uDetails);
  };

  const deleteAddress = async (id) => {
    let uDetails = { ...userDetails };
    let tempAddress = {};
    uDetails.addresses = uDetails.addresses.filter((address) => {
      if (address.id === id) tempAddress = address;
      return address.id !== id;
    });
    const docRef = doc(firestore, "users", userDetails.id);
    await updateDoc(docRef, { addresses: uDetails.addresses });
    setUserDetails(uDetails);
    tempAddress = getSimplifiedAddresss(tempAddress);
    if (tempAddress === selectedAddress) {
      setSelectedAddress("");
    }
  };

  const changeName = async (name) => {
    if (userDetails.name) {
      if (userDetails.name !== name) {
        await change(name);
      }
    }
    await change(name);
  };

  const change = async (name) => {
    const docRef = doc(firestore, "users", userDetails.id);
    await updateDoc(docRef, { name });
    const uDetails = { ...userDetails };
    uDetails.name = name;
    setUserDetails(uDetails);
  };

  const deleteAccount = async () => {
    const loggedInUser = firebaseAuth.currentUser;
    await deleteUser(loggedInUser);
    console.log(1);
    const docRef = doc(firestore, "users", userDetails.id);
    console.log(2);
    await deleteDoc(docRef);
    changeToInitialState();
  };

  const changeSelectedAddress = async (address) => {
    const docRef = doc(firestore, "users", userDetails.id);
    await updateDoc(docRef, { selectedAddress: address });
    setSelectedAddress(address);
  };

  const redeemVoucher = async (voucherCode) => {
    const { transactions } = userDetails;
    const isVoucherRedeemed = transactions.findIndex(
      (transaction) =>
        transaction.isVoucherRedeemed === true &&
        transaction.code === voucherCode
    );
    if (isVoucherRedeemed !== -1) {
      return "voucher already redeemed";
    }
    const collectionRef = collection(firestore, "vouchers");
    let q = query(collectionRef, where("code", "==", voucherCode));
    let vouchersInDb = await getDocs(q);
    vouchersInDb = vouchersInDb.docs;
    // console.log(vouchersInDb);
    if (vouchersInDb.length === 0) {
      return "Ouch! This voucher doesn't exist";
    }
    let voucher = vouchersInDb[0].data();
    if (voucher.expiryDate.toDate() < new Date())
      return "Ouch! This voucher doesn't exist";
    let ts;
    const userD = { ...userDetails };
    userD.transactions.push({
      ...voucher,
      isVoucherRedeemed: true,
      isCredit: true,
      amountLeft: voucher.cash,
      time: new Date(),
    });
    ts = userD.transactions;
    const docRef = doc(firestore, "users", userDetails.id);
    await updateDoc(docRef, { transactions: ts });
    const docRef2 = doc(firestore, "users", userD.id);
    let result = await getDoc(docRef2);
    console.log(result.data());
    setUserDetails((uDetails) => ({
      ...uDetails,
      ...result.data(),
    }));
    return "";
  };

  const getFAQS = async () => {
    const collectionRef = collection(firestore, "faqs");
    let faqs = await getDocs(collectionRef);
    faqs = faqs.docs;
    faqs = faqs.map((faq) => [faq.id, faq.data()]);
    return faqs;
  };

  const getFAQ = async (faqId) => {
    const docRef = doc(firestore, "faqs", faqId);
    let faq = await getDoc(docRef);
    faq = faq.data();
    return faq;
  };

  const getSubFAQs = async (faqId) => {
    const collectionRef = collection(firestore, "faqs", faqId, "subfaqs");
    let subFAQs = await getDocs(collectionRef);
    subFAQs = subFAQs.docs;
    subFAQs = subFAQs.map((subFAQ) => [subFAQ.id, subFAQ.data()]);
    return subFAQs;
  };

  const getSubFAQ = async (faqId, subFaqId) => {
    const docRef = doc(firestore, "faqs", faqId, "subfaqs", subFaqId);
    let subFaq = await getDoc(docRef);
    subFaq = subFaq.data();
    return subFaq;
  };

  const changeDeliveryInstructions = (deliveryInstruction) => {
    setDeliveryInstructions((dI) => {
      const isInstructionExist = dI.find(
        (d) => d.id === deliveryInstruction.id
      );
      if (isInstructionExist) {
        return dI.filter((d) => d.id !== deliveryInstruction.id);
      }
      const dIs = [...dI];
      dIs.push(deliveryInstruction);
      return dIs;
    });
  };

  const placeOrder = async () => {
    let d = new Date();
    d.setMinutes(d.getMinutes() + 8 + parseInt(Math.random() * 7));
    console.log(d);
    console.log(deliveryTip);
    const order = {
      cart,
      deliveryTip,
      deliveryInstructions,
      address: selectedAddress,
      id: generateOrderId(),
      time: new Date(),
      timeToShowOrder: d,
    };
    const collectionRef = collection(
      firestore,
      "users",
      userDetails.id,
      "orders"
    );
    const result = await addDoc(collectionRef, order);
    console.log(result);
    setCart([]);
    setDeliveryTip(0);
    setDeliveryInstructions([]);
  };

  const getOrders = async () => {
    const collectionRef = collection(
      firestore,
      "users",
      userDetails.id,
      "orders"
    );
    let orders = await getDocs(collectionRef);
    orders = orders.docs;
    orders = orders.map((order) => [order.id, order.data()]);
    return orders;
  };

  const getOrder = async (id) => {
    const docRef = doc(firestore, "users", userDetails.id, "orders", id);
    let order = await getDoc(docRef);
    order = order.data();
    return order;
  };

  const getProductsForYou = async () => {
    const collectionRef = collection(firestore, "productsForYou");
    let productsForYou = await getDocs(collectionRef);
    productsForYou = productsForYou.docs;
    productsForYou = productsForYou.map((product) => [
      product.id,
      product.data(),
    ]);
    return productsForYou;
  };

  const getAllProducts = async () => {
    if (allProducts.length === 0) {
      const collectionRef = collection(
        firestore,
        "categories",
        "1",
        "subcategories"
      );
      let subCategories = await getDocs(collectionRef);
      subCategories = subCategories.docs;
      let products = [];
      for (let i = 0; i < subCategories.length; i++) {
        const docRef = collection(
          collectionRef,
          subCategories[i].id,
          "products"
        );
        let tempProducts = await getDocs(docRef);
        tempProducts = tempProducts.docs;
        // console.log(products)
        tempProducts.forEach((tempProduct) => {
          products.push([tempProduct.id, { ...tempProduct.data() }]);
        });
      }
      setAllProducts(products);
      return products;
    }

    // await subCategories.map(async (subCategory) => {

    //   console.log(tempProducts)
    //   return subCategory.id;
    // });
    return allProducts;
  };

  // useEffect(() => {
  //   getAllProducts()
  // },[])

  const getProduct = async (categoryId, subCategoryId, productId) => {
    const docRef = doc(
      firestore,
      "categories",
      categoryId,
      "subcategories",
      subCategoryId,
      "products",
      productId
    );
    let product = await getDoc(docRef);
    product = product.data();
    return product;
  };

  const getSubCategory = async (categoryId, subCategoryId) => {
    const docRef = doc(
      firestore,
      "categories",
      categoryId,
      "subcategories",
      subCategoryId
    );
    let subCategory = await getDoc(docRef);
    subCategory = subCategory.data();
    return subCategory;
  };

  const addToRecentSearches = async (search) => {
    const {recentSearches} = userDetails 
    const docRef = doc(firestore, 'users', userDetails.id)
    const idx = recentSearches.findIndex(s => s === search)
    if(idx !== -1){
      recentSearches.splice(idx, 1)
    }
    recentSearches.unshift(search)
    if(recentSearches.length > 10){
      recentSearches.pop()
    }
    await updateDoc(docRef, { recentSearches });
    setUserDetails(u => ({...u, recentSearches}))
  }

  let value = {
    user,
    userDetails,
    signUpUser,
    isLoggedIn,
    signOutUser,
    signInUser,
    getCategories,
    openShowLocation,
    closeShowLocation,
    showLocation,
    location,
    changeLocation,
    getFirstSubCategory,
    getSubCategories,
    getSubCategoryProducts,
    changeSubCategoryName,
    subCategoryName,
    categoryName,
    addItemToCart,
    addProductToCart,
    cart,
    addAddress,
    updateAddress,
    deleteAddress,
    changeName,
    deleteAccount,
    selectedAddress,
    changeSelectedAddress,
    redeemVoucher,
    getFAQS,
    getFAQ,
    getSubFAQs,
    getSubFAQ,
    deliveryTip,
    setDeliveryTip,
    deliveryInstructions,
    changeDeliveryInstructions,
    placeOrder,
    getOrders,
    getOrder,
    getProductsForYou,
    amountToBePaid,
    getAllProducts,
    getProduct,
    getSubCategory,
    allProducts,
    addToRecentSearches
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
