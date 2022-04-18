import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { Link } from 'vtex.render-runtime';

const AddMessage = () => {

  const CSS_HANDLES = [
		'addMessage__block',
		'addMessage__container',
		'addMessage__content',
		'addMessage__text',
		'addMessage__link',
		'addMessage__close'
  ] as const;

  const handles = useCssHandles(CSS_HANDLES)

  const handleShowMessage = () => {
    const addToast:any = document.querySelector(".jefferspet-wishlist-0-x-addMessage__block")
    if(addToast){
      addToast.style.display = "none"
    }
  }

  return(
    <>
      <div className={handles.addMessage__block}>
        <div className={handles.addMessage__container}>
          <div className={handles.addMessage__content}>
            <p className={handles.addMessage__text}>THIS ITEM HAS BEEN ADDED TO<Link to='/account/#wishlist' className={handles.addMessage__link}> YOUR WISH LIST</Link>.</p>
            <span className={handles.addMessage__close} onClick={handleShowMessage}></span>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddMessage
