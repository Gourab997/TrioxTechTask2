export const reducer = (state, action) => {
  if (action.type === "REMOVE_ITEM") {
    return {
      ...state,
      item: state.item.filter((cardValue) => {
        return cardValue.id !== action.payload;
      }),
    };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, item: [] };
  }

  if (action.type === "INCREMENT") {
    const updatedCart = state.item.map((curElem) => {
      if (curElem.id === action.payload) {
        return { ...curElem, quantity: curElem.quantity + 1 };
      }
      return curElem;
    });

    return { ...state, item: updatedCart };
  }

  if (action.type === "DECREMENT") {
    const updatedCart = state.item
      .map((curElem) => {
        if (curElem.id === action.payload) {
          return { ...curElem, quantity: curElem.quantity - 1 };
        }
        return curElem;
      })
      .filter((curElem) => curElem.quantity !== 0);
    return { ...state, item: updatedCart };
  }

  if (action.type === "GET_TOTAL") {
    let { totalItem, totalAmount, updatedTotalAmount } = state.item.reduce(
      (valueGet, cardValue) => {
        let { price, quantity } = cardValue;

        let updatedTotalAmount = price * quantity;
        valueGet.totalAmount += updatedTotalAmount;

        valueGet.totalItem += quantity;
        return valueGet;
      },
      {
        totalItem: 0,
        totalAmount: 0,
      }
    );
    return { ...state, totalItem, totalAmount, updatedTotalAmount };
  }
  return state;
};
