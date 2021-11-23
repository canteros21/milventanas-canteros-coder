import { createContext, useState, useContext } from 'react'

const CartContext = createContext([])

export const useCartContext = () => {
    return useContext(CartContext)
}

const CartContextProvider = ({ children }) => {

    const [cartList, setCartList] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)


    function agregarAlCarro(producto, cantSelected, subtotalAdded) {

        const currentItemId = producto.id

        if (cartList.filter(prod => prod.id === currentItemId).length > 0) {
            cartList.forEach((prod) => {
                if (prod.id === currentItemId) {
                    prod.cantidadAgregada = prod.cantidadAgregada + cantSelected
                    prod.subtotal = prod.subtotal + subtotalAdded
                }
            });

        } else {

            setCartList([...cartList, producto])
        }

    }

    console.log(cartList);

    return (
        <CartContext.Provider value={
            {
                cartList,
                totalItems,
                setTotalItems,
                useCartContext,
                agregarAlCarro,
                setTotalPrice,
                totalPrice
            }
        }>
            {children}
        </CartContext.Provider>
    )
}


export default CartContextProvider