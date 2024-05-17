import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import IconWithBadge from "./IconWithBadge";

const TrolleyIconWithBadge = props => {
  let totalValue = props.shoppingCart.reduce(function(total, currentValue) {
    return total + currentValue.quantity;
  }, 0);

  const badgeCount = props.shoppingCart === null ? 0 : totalValue;
  // You should pass down the badgeCount in some other ways like react context api, redux,  or event emitters.
  return <IconWithBadge {...props} badgeCount={badgeCount} />;
};

function mapStateToProps(state) {
  return {
    shoppingCart: state.shoppingCart
  };
}

export default connect(mapStateToProps)(TrolleyIconWithBadge);
