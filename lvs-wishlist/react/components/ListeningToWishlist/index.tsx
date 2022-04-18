import React, { useState, useEffect} from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { Link } from 'vtex.render-runtime';

interface props {
  children:any
}

const ListeningToWishlist = ({children}:props) =>{

  const CSS_HANDLES = [
    "wrapperWishList",
    "wrapperWishListButton",
    "viewWishlist"
  ]
  const handles = useCssHandles(CSS_HANDLES)
  const [showWishlist, useShowWishlist] = useState(false)

  const showStatus = () => {
    setTimeout(() => {
      const buttonContainer:any = document.querySelector(".vtex-wish-list-1-x-wishlistIcon") as HTMLElement;
      if(buttonContainer.classList.contains("vtex-wish-list-1-x-outline")){
        useShowWishlist(false)
      }
      if(buttonContainer.classList.contains("vtex-wish-list-1-x-fill")){
        useShowWishlist(true)
      }
    },1000)
  }

  const clickButton = () => {
    const wishButton:any = document.querySelector(".vtex-wish-list-1-x-wishlistIconContainer .vtex-button") as HTMLElement;
    wishButton.click()
    showStatus()
  }

  const handleToast = () => {
    const addToast:any = document.querySelector(".jefferspet-wishlist-0-x-addMessage__block")
    let sessionIniated = '';
    if(typeof sessionStorage !== "undefined"){
      try{
        sessionIniated = JSON.parse(sessionStorage?.getItem('wishlist_isAuthenticated') || "");
      }catch(error){
          console.log("e-> ", error);
      }
    }

    if(!showWishlist && sessionIniated){
    if(addToast){
      addToast.style.display = "block"
    }
      window.scroll({
        top: 100,
        behavior: 'smooth'
      });
    } else {
      addToast.style.display = "none"
    }
  }

  const hideToast = () => {
    const toastNative:any = document.querySelector(".vtex-toast")
    const hideToast:any = document.querySelector(".vtex-toast .flex-grow-1 .flex-grow-1 .lh-copy")
    let x = 1;
    while(x <= 10){
      setTimeout(() => {
        if(hideToast){
          if(hideToast.textContent === 'Product added to the list'){
            toastNative.style.display = "none";
          }
        }
      },100)
      if(hideToast){
        break
      }
      x++
    }
  }

  const clickFunctions = () => {
    clickButton()
    handleToast()
  }

  useEffect(() => {

    setTimeout(() => {
      showStatus()
    },3000)
  }, [])

  useEffect(() => {
      hideToast()
  })

  return(
    <div className={handles.wrapperWishList}>
      <div className={handles.wrapperWishListButton} onClick={clickFunctions}>
        {children}
      </div>
      {
        showWishlist ?
        <Link to='/account/#wishlist' className={handles.viewWishlist}>View Wish List</Link>
        :
        null
      }
    </div>
  )
}

export default ListeningToWishlist
