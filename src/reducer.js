const reducer = (state, action) => {
    if(action.type === 'CLEAR_CART') {
        return {...state, cart: []}
    }
    if(action.type === 'REMOVE') {
        return {...state, cart: state.cart.filter(item => {
            return item.id !== action.payload;
            })}
    }
/*

    if(action.type === 'INCREASE') {
        const tempCart = state.cart.map((item)=>{
            if(item.id === action.payload) {
                return {...item, amount: item.amount + 1}
            }
            return item;
        })
        return {...state, cart: tempCart}
    }

    if(action.type === 'DECREASE') {
        const tempCart = state.cart.map((item)=>{
            if(item.id === action.payload) {
                return {...item, amount: item.amount - 1}
            }
            return item;
        }).filter(item => item.amount > 0)

        return {...state, cart: tempCart}
    }
*/

    if(action.type === 'GET_TOTALS') {

        let {total, amount} = state.cart.reduce((cartTotal, cartItem)=>{
            const { price, amount } = cartItem;
            const itemTotal = price * amount;
            cartTotal.total += itemTotal;
            cartTotal.amount += amount;
            return cartTotal;
        }, {
            total: 0, amount: 0,
        })

        total = parseFloat(total.toFixed(2))

        return {...state, total, amount}
    }

if(action.type === 'LOADING') {
    return {...state, loading: true}
}
if(action.type === 'DISPLAY_ITEMS') {
    return {
        ...state, cart: action.payload, loading: false
    }
}

if(action.type === 'TOGGLE_AMOUNT') {
    let tempCart = state.cart.map(item => {
        if(item.id === action.payload.id) {
            if(action.payload.type === 'inc') {
                return {...item, amount: item.amount + 1};
            } else {
                return {...item, amount: item.amount - 1};
            }
        }
        return item;
    }).filter(item => item.amount > 0);
    return {...state, cart: tempCart}
}


    throw new Error('No matching action type');
};

export default reducer;