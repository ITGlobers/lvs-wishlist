import React from 'react'

import { useCssHandles } from 'vtex.css-handles'

type props = {
  children: any
}

export const TotalPrice = ( { children }: props ) => {

  const CSS_HANDLES = [ "total_price_wrapper" ]
  const handles = useCssHandles(CSS_HANDLES)

  const quantityModifiers = Array.from(( document.querySelectorAll(".vtex-numeric-stepper__minus-button__text, .vtex-numeric-stepper__plus-button__text, .vtex-numeric-stepper__minus-button, .vtex-numeric-stepper__plus-button" )))

  quantityModifiers?.forEach ( modifier => {
    modifier?.addEventListener( "click", listenerFunction )
  } )

  function listenerFunction(this: HTMLElement, ev: Event) {

    ev.preventDefault();

    const container = this.closest( ".vtex-numeric-stepper-container" );

    if ( container !== null ) {

      const quantity = container?.querySelector( ".vtex-numeric-stepper__input" ) as HTMLInputElement;

      setTimeout( () => {
        const quantityValue = parseInt( quantity.value )

        const generalContent = this.closest( ".vtex-flex-layout-0-x-flexRowContent" );
        const priceWrapper = generalContent?.querySelector( ".jefferspet-wishlist-0-x-total_price_wrapper" ) as HTMLElement;
        const unitPriceElement = generalContent?.querySelector( ".vtex-product-summary-2-x-currencyContainer" ) as HTMLElement;
        const unitPrice = parseFloat( unitPriceElement.innerText.slice( 1 ) );
        const totalPrice = unitPrice * quantityValue;
        priceWrapper.innerHTML = `$${ totalPrice }`;



        console.log(quantityValue);
      }, 100 );
    }
  }


  return (
    <div className = { handles.total_price_wrapper } >
      { children }
    </div>
  )
}
