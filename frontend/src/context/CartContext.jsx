import {createContext, useState, useContext,useEffect} from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [cartItems, setCartItems] = useState([]);

    const [total, setTotal] = useState(0);

    // fetch cart items from backend
    const fetchCart = async () => {
        try{
            const res  =  await fetch(`${BASE_URL}/api/cart/`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setCartItems(data.items || []);
            setTotal(data.total || 0);
        }
            catch(error) {
                console.error('Error fetching cart:', error);
            }
    }

    useEffect(() => {
        fetchCart();
    }, []);

    
    // Add product to cart
    const addToCart = async (productId) => {
        try {
            await fetch(`${BASE_URL}/api/cart/add/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ product_id: productId }),
            }
            );
            fetchCart();
        }
            catch (error) {
                console.error('Error adding to cart:', error);
            }
    }


    const removeFromCart = async (itemId) => {
        try{
            await fetch(`${BASE_URL}/api/cart/remove/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_id: itemId }),
            });
            fetchCart();
        }
        catch(error) {
            console.error('Error removing from cart:', error);
        }
    }

    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) {
            removeFromCart(itemId);
            return;
        }
        try {
            await fetch(`${BASE_URL}/api/cart/update/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_id: itemId, quantity }),
            });
            fetchCart();
        }
        catch(error) {
            console.error('Error updating quantity:', error);
        }
    }



    return (
        <CartContext.Provider value={{ cartItems, total, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () =>  useContext(CartContext);