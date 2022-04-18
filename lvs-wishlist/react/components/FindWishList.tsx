import React, { useState } from 'react'
import GETWISHLIST from '../graphql/query.getWishlist.gql'
import GETPRODUCT from '../graphql/query.getProduct.gql'
import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { ListItems } from './ListItems'
import "./Styles/FindWishList.css"
export const FindWishList = () => {
  const CSS_HANDLES = ["button", "text_box", "text", "sub_title", "property", "container", "product_list"]
  const handles = useCssHandles(CSS_HANDLES)
  const [user, setUser] = useState("test@yopmail.com")
  const [wishuser, setWishUser] = useState(Array)
  const { data, loading }: any = useQuery(GETWISHLIST, {
    variables: { "shopperId": user }
  });
  const handleName = (e: any) => {
    setUser(e.target.value)
  }
  const search = (e: any) => {
    e.preventDefault();
    if (loading) {
      return false
    }
    setWishUser(data.viewLists[0].data)
    return true
  }
  const ListUser = () => {
    if (wishuser.length > 0) {
      return (

        <>
          <div className={handles.container}>
            <h2>Wish list</h2>
            <span>Items</span>
            <div className={handles.product_list}>
              {wishuser.map((item: any) => {
                const { data: data2, loading: loading2 }: any = useQuery(GETPRODUCT, {
                  variables: { "id": item.sku }
                });
                console.log(data2)
                if (loading2) {
                  return false
                }
                return (
                  <ListItems data={data2} />
                )
              })}
            </div>
          </div>
        </>
      )
    }
    return null
  }
  return (
    <div className={handles.container}>
      <h2>Find a Wish List</h2>
      <span className={`${handles.text} ${handles.sub_title}`}>Find a friend or family</span>
      <form action="">
        <div className={handles.property}>
          <label htmlFor=""><span className={handles.text}>Email Address</span></label>
          <div>
            <input placeholder='example@email.com' type="text" name="" id="" onChange={handleName} className={handles.text_box} />
          </div>
        </div>
        <button onClick={search} className={handles.button}>SEARCH</button>
      </form>
      <ListUser />
    </div>
  )
}
