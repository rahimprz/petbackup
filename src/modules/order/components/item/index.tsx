import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  currencyCode: string
}

const Item = ({ item, currencyCode }: ItemProps) => {
  return (
    <div
      className="flex items-center gap-4 p-4 bg-secondary/10 border border-border/10 rounded-xl hover:bg-secondary/20 transition-colors"
      data-testid="product-row"
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-16">
        <Thumbnail thumbnail={item.thumbnail} size="square" />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Text
          className="txt-medium-plus text-foreground font-semibold"
          data-testid="product-name"
        >
          {item.product_title}
        </Text>
        <LineItemOptions variant={item.variant} data-testid="product-variant" />
      </div>

      {/* Price Info */}
      <div className="flex flex-col items-end">
        <span className="flex gap-x-1 text-muted-foreground text-sm">
          <Text className="text-muted-foreground">
            <span data-testid="product-quantity">{item.quantity}</span>x{" "}
          </Text>
          <LineItemUnitPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </span>

        <LineItemPrice
          item={item}
          style="tight"
          currencyCode={currencyCode}
        />
      </div>
    </div>
  )
}

export default Item
