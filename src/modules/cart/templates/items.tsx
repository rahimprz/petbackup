import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div>
      <div className="pb-3 flex items-center">
        <Heading className="text-[2rem] leading-[2.75rem] text-foreground">Cart</Heading>
      </div>
      <Table className="!bg-transparent w-full">
        <Table.Header className="!bg-transparent border-t-0 border-b border-border/10">
          <Table.Row className="!bg-transparent text-muted-foreground txt-medium-plus hover:!bg-transparent border-b-0">
            <Table.HeaderCell className="!pl-0 !bg-transparent">Item</Table.HeaderCell>
            <Table.HeaderCell className="!bg-transparent"></Table.HeaderCell>
            <Table.HeaderCell className="!bg-transparent">Quantity</Table.HeaderCell>
            <Table.HeaderCell className="hidden small:table-cell !bg-transparent">
              Price
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-0 text-right !bg-transparent">
              Total
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className="!bg-transparent">
          {items
            ? items
              .sort((a, b) => {
                return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
              })
              .map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    currencyCode={cart?.currency_code}
                  />
                )
              })
            : repeat(5).map((i) => {
              return <SkeletonLineItem key={i} />
            })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsTemplate
