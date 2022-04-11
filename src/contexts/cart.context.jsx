import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if(existingCartItem) {
        return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    return cartItems.filter(
        (cartItem) => cartItem.id !== cartItemToRemove.id
    );
};

const decreaseCartItemQuantity = (cartItems, cartItemToDecreaseQuantity) => {
    const findCartItemToRemoveQuantity = cartItems.find(
        (cartItem) => cartItem.id === cartItemToDecreaseQuantity.id
    ).quantity;

    if(findCartItemToRemoveQuantity > 1) {
        return cartItems.map((cartItem) =>
        cartItem.id === cartItemToDecreaseQuantity.id 
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
        );
    }

    return cartItems.filter(
        (cartItem) => cartItem.id !== cartItemToDecreaseQuantity.id
    );
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    decreaseItemQuantityFromCart: () => {},
    cartCount: 0,
    cartTotalPrice: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
        const newCartTotalPrice = cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
        setCartTotalPrice(newCartTotalPrice);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const decreaseItemQuantityFromCart = (cartItemToDecreaseQuantity) => {
        setCartItems(decreaseCartItemQuantity(cartItems, cartItemToDecreaseQuantity));
    };

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        removeItemFromCart,
        decreaseItemQuantityFromCart,
        cartTotalPrice
    };

    return (
        <CartContext.Provider value={value}> {children} </CartContext.Provider>
    )
}