import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useOrderForm } from 'vtex.store-resources/OrderFormContext'
import useMarketingSessionParams from './hooks/useMarketingSession'

export const ListItems = ({data}:any) => {
  const CSS_HANDLES = ["product_list_item","product_list_cell","media","link_image","image","info","summary_line_item","name","link_name","button"]
  const handles = useCssHandles(CSS_HANDLES)
  const orderFormContext = useOrderForm()
  const { utmParams, utmiParams } = useMarketingSessionParams()
  async function addToCart  (items:any){
    try {
      const variables = {
        orderFormId: orderFormContext.orderForm.orderFormId,
        items: {
          id: items.product.items[0].itemId,
          seller: items.product.items[0].sellers[0].sellerId,
          quantity: 1,
        },
        ...(utmParams ? { utmParams } : {}),
        ...(utmiParams ? { utmiParams } : {}),
      }
      await orderFormContext.addItem({ variables })
      await orderFormContext.refetch().catch((error: any) => console.log(error))
      console.log(items)
    } catch (error) {
      console.error(error)
      console.log(orderFormContext.orderForm.orderFormId)
    }

}
  return (
    <div className={handles.product_list_item}>
      <div className={handles.product_list_cell}>
        <div className={handles.summary_line_item}>
          <p className={handles.media}>
            <a href={`/${data.product.linkText}/p`} className={handles.link_image}>
              <img src={data?.product.items[0].images[0].imageUrl} alt="" className={handles.image}/>
            </a>
          </p>
          <div className={handles.info}>
            <p className={handles.name}>
              <a href={`/${data.product.linkText}/p`} className={handles.link_name}>{data?.product.items[0].name}</a>
            </p>
          </div>
        </div>
      </div>
      <div>
        <button onClick={()=>{setTimeout(() => {
          addToCart(data)
        }, 100); }} className={handles.button}>Add to cart</button>
      </div>
    </div>
  )
}
