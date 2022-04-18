import React, {useState,useEffect} from 'react'
import { useApolloClient } from 'react-apollo'
import GETDOCUMENT from '../graphql/query.getDocument.gql'
import GETWISHLIST from '../graphql/query.getWishlist.gql'
import GETPRODUCT from '../graphql/query.getProduct.gql'
import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { ListItems } from './ListItems'


export const WishShare = () => {

  const CSS_HANDLES = [ "container", "product_list" ]
  const handles = useCssHandles( CSS_HANDLES )
  const [ document, setDocument ]:any = useState( Array )
  const [ wishuser, setWishUser ] = useState( Array )

  const getParam = () => {
    return window.location.pathname.split( "/" ).pop()
  }
  const client = useApolloClient();
  useEffect( () => {
    getDocuments();
  }, [])
  async function getDocuments() {
    try {
      const { data: { documents }, loading } = await client.query({
        query: GETDOCUMENT,
        variables: {
          acronym: 'PW',
          fields: ["email","automaticId"],
          where: `automaticId=${getParam()}`
        },
        fetchPolicy: 'no-cache'
      })
      if(!loading){
        setDocument(documents[0].fields)
        return documents[0].fields;
      }else{
        return true
      }


    } catch (error) {
      return null;
    }
  }

  const WishCustomer = () =>{

    if(document.length>0){
      const { data, loading }:any = useQuery(GETWISHLIST,{
        variables: {"shopperId": document[0].value}
      });
      if(loading){
        return <span>Cargando</span>
      }
      setWishUser(data.viewLists[0].data)
      return (
        <>
        <div className={handles.container}>
            <h2>Wish list</h2>
            <span>Items</span>
            <div className={handles.product_list}>
         {wishuser.map((item:any)=>{
            const { data: data2, loading: loading2 }:any = useQuery(GETPRODUCT,{
              variables:{"id":item.sku}
            });
            // console.log(data2)
            if(loading2){
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
    <div>
      {/* {document} */}
      <WishCustomer />
    </div>
  )
}
