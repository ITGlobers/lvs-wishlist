import React from 'react'

import { useCssHandles } from 'vtex.css-handles'

export const WishlistSelector = () => {

  const CSS_HANDLES = [
    "selector_main_wrapper",
    "label_selector",
    "wishlist_selector"
    ]
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div>
      <div className ={ handles.selector_main_wrapper } >
        <label className={ handles.label_selector } htmlFor="purchase_id">
          <span>Show</span>
        </label>
        <select className={ handles.wishlist_selector } name="purchase_id" id="purchase_id">
          <option value="">Unpurchased Items</option>
          <option value="">Purchased Items</option>
        </select>
      </div>
    </div>
  )
}
