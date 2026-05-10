import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import axios from "axios"

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 50;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState(localStorage.getItem('user') && localStorage.getItem('user') !== "undefined" ? JSON.parse(localStorage.getItem('user')) : null);
    const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : {});

    const navigate = useNavigate();

    useEffect(() => {
    getProductsData();
    
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        setToken(storedToken);
        getUserCart(storedToken); 
    }
}, []);


const addToCart = async (itemId, data) => {

    const size = typeof data === "string"
        ? data
        : data.size;

    const isCustom =
        typeof data === "object" && data.custom;

    if (!size) {
        toast.error('Select Frame Size');
        return;
    }

    let cartData = structuredClone(cartItems);

    // 🎨 CUSTOM MANDALA
    if (isCustom) {

        const customId = `custom-${Date.now()}`;

        const customPrice =
            size === "A2"
                ? 500
                : size === "A3"
                ? 400
                : 300;

        cartData[customId] = {
            custom: true,
            name: "Custom Mandala",
            image: data.image,
            size,
            quantity: 1,
            price: customPrice
        };

    }

    // 🛍 NORMAL PRODUCT
    else {

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        }
        else {
            cartData[itemId][size] = 1;
        }

        // backend sync only for normal items
        if (token) {
            try {

                await axios.post(
                    backendUrl + '/api/cart/add',
                    { itemId, size },
                    { headers: { token } }
                );

            } catch (err) {
                console.log(err);
            }
        }
    }

    setCartItems(cartData);

    localStorage.setItem(
        'cartItems',
        JSON.stringify(cartData)
    );
};

   const getCartCount = () => {

    let totalCount = 0;

    for (const key in cartItems) {

        const item = cartItems[key];

        // 🎨 custom product
        if (item.custom) {
            totalCount += item.quantity;
        }

        // 🛍 normal product
        else {

            for (const size in item) {

                if (item[size] > 0) {
                    totalCount += item[size];
                }

            }
        }
    }

    return totalCount;
}

   const updateQty = async (itemId, size, quantity) => {

    let cartData = structuredClone(cartItems);

    // 🎨 CUSTOM PRODUCT
    if (cartData[itemId]?.custom) {

        if (quantity <= 0) {
            delete cartData[itemId];
        }
        else {
            cartData[itemId].quantity = quantity;
        }

    }

    // 🛍 NORMAL PRODUCT
    else {

        cartData[itemId][size] = quantity;

        if (token) {
            try {

                await axios.post(
                    backendUrl + '/api/cart/update',
                    { itemId, size, quantity },
                    { headers: { token } }
                )

            }
            catch (err) {

                console.log(err);
                toast.error(err.message)

            }
        }
    }

    setCartItems(cartData);

    localStorage.setItem(
        'cartItems',
        JSON.stringify(cartData)
    );
}

const getCartAmount = () => {

    let totalAmount = 0;

    for (const itemId in cartItems) {

        const item = cartItems[itemId];

        // 🎨 CUSTOM PRODUCT
        if (item.custom) {

            totalAmount += item.price * item.quantity;

        }

        // 🛍 NORMAL PRODUCTS
        else {

            let itemInfo = products.find(
                (product) => product._id === itemId
            );

            if (!itemInfo) continue;

            for (const size in item) {

                if (item[size] > 0) {

                    totalAmount += itemInfo.price * item[size];

                }
            }
        }
    }

    return totalAmount;
}


    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')

            if (response.data.success) {
                setProducts(response.data.products)
            }
            else {
                toast.error(response.data.message)
            }
        }
        catch (err) {
            console.log(err)
            toast.error(err.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }

        }
        catch (err) {
            console.log(err)
            toast.error(err.message)
        }
    }

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart, getCartCount,
        updateQty, getCartAmount, navigate, backendUrl, setToken, token, user, setUser
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider