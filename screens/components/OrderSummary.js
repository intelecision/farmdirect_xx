import React, { useEffect, useState } from 'react'
import { View } from "react-native"





export default function OrderSummary({ trolleyTotal, discount, deliveryCost })
{
    const [ amountPayable, setAmountPayable ] = useState(0);

    useEffect(() => {
      setAmountPayable(trolleyTotal + discount + deliveryCost);

    }, [ trolleyTotal, discount, deliveryCost ]);

    const RenderRowItem = ({ section, sum}) =>
    {
        return(
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <Text>{section}</Text>
            <Text> GH¢{sum?.toFixed(2)}</Text>
          </View>
        );
    }

  return (
      <View>
          <RenderRowItem section={22} sum={933}/>
      </View>
  )
}
