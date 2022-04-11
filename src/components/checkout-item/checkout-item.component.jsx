import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss'

const CheckoutItem = ({cartItem}) => {
    const { addItemToCart, decreaseItemQuantityFromCart,removeItemFromCart } = useContext(CartContext);

    const { name, imageUrl, price, quantity } = cartItem;

    const increaseCartItemCountHandler = () => addItemToCart(cartItem);
    const decreaseCartItemCountHandler = () => decreaseItemQuantityFromCart(cartItem);
    const removeCartItemHandler = () => removeItemFromCart(cartItem);

   
    return (
        <div className='checkout-item-container'>
         <div className='image-container'>
            <img src={imageUrl} alt={`${name}`} />
         </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={decreaseCartItemCountHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={increaseCartItemCountHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={removeCartItemHandler}>&#10005;</div>
        </div>
    );


}

export default CheckoutItem;
