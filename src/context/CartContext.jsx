import { createContext, useState, useContext } from 'react'

const CartContext = createContext([])

export const useCartContext = () => {
    return useContext(CartContext)
}

const CartContextProvider = ({ children }) => {

    const [cartList, setCartList] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    


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


    function borrarDelCarro(currentItemId) {
        
        let newArr = cartList

        newArr.forEach((prod) => {
            if (prod.id === currentItemId) {
                newArr.splice(newArr.findIndex(a => a.id === prod.id), 1)

                setTotalItems(totalItems - prod.cantidadAgregada)
            }
        })

        setCartList(newArr)
    }


    const precioTotal = () => {
        return cartList.reduce((acum, prod) => acum + (prod.cantidadAgregada * prod.precio), 0)
    }


    const quitarTodo = () => {
        setTotalItems(0)
        setCartList([])
    }

    return (
        <CartContext.Provider value={
            {
                useCartContext,
                cartList,
                setCartList,
                agregarAlCarro,
                borrarDelCarro,
                precioTotal,
                totalItems,
                setTotalItems,
                quitarTodo
            }
        }>
            {children}
        </CartContext.Provider>
    )
}


export default CartContextProvider