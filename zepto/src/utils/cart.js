export const calculateTotalItems = (cart) => {
    let totalNumberOfItems = cart.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);
    // console.log(cart, totalNumberOfItems);
    return totalNumberOfItems;
  };
