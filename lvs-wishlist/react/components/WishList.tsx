import React,{useState} from 'react'
import GETPROFILE from '../graphql/query.getProfile.gql'
import GETWISHLIST from '../graphql/query.getWishlist.gql'
import CREATEDOCUMENT from '../graphql/querty.createDocument.gql'
import GETDOCUMENT from '../graphql/query.getDocument.gql'
import GETORDER from '../graphql/query.getOrders.gql'
import { useQuery } from 'react-apollo'
import { useMutation } from 'react-apollo'
import { v4 as uuidv4 } from 'uuid';
import { useCssHandles } from 'vtex.css-handles'
import { useApolloClient } from 'react-apollo'
import
  {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    PinterestShareButton,
    PinterestIcon,
    EmailShareButton,
    EmailIcon
  } from 'react-share';

export const WishList = () => {
  const CSS_HANDLES = [
    "wishlist_link_wrapper",
    "wishlist_link_p",
    "wishlist_link",
    "container",
    "privacy_options_wrapper",
    "privacy_options",
    "wishlist_share_wrapper",
    "share_button",
    "wishlist_icon",
    "wishlist_h4",
    "gifts_wrapper",
    "gifts_select_wrapper",
    "gifts_select",
    "gifts_span_msg",
    "radio_input",
    "product_list"]
  const handles = useCssHandles(CSS_HANDLES)
  const { data, loading }:any = useQuery(GETPROFILE)
  const [privacy, setPrivacy] = useState(String)
  const [urlShare, setUrlShare] = useState(String)
  const [createDocument] = useMutation(
    CREATEDOCUMENT
  )
  const client = useApolloClient();

  async function getDocuments() {
    try {
      const { data: { documents },loading } = await client.query({
        query: GETDOCUMENT,
        variables: {
          acronym: 'PW',
          fields: ["email","automaticId"],
          where: `email=${data.profile.email}`
        },
        fetchPolicy: 'no-cache'
      })
      if(!loading){
        return documents;
      }else{
        return true
      }

    } catch (error) {
      return null;
    }
  }
  async function handleShare(e:any){
    const valueRadio=e.target.value;
    setPrivacy(valueRadio)
    const dataexample = await getDocuments()
    console.log('Data example',dataexample)
    console.log('Target value',valueRadio)
    if(dataexample.length==0 && valueRadio=="shared"){
    const uuidstring= uuidv4()
    setUrlShare(uuidstring)
     createDocument({
      variables: {
        acronym: 'PW',
        document: {
          fields: [
            {
              key: 'email',
              value: data.profile.email,
            },
            {
              key: 'automaticId',
              value:uuidstring,
            }
          ],
        },
      }
    })
    }
    else{
      if(dataexample.length>0){
        setUrlShare(dataexample[0]?.fields[1].value)
      }
    }
  }
  const AlertShare=()=>{
    return(
      <div className = { handles.wishlist_link_wrapper } >
        <p className = { handles.wishlist_link_p }>
          Wish List Link:
          <br />
          <a className = { handles.wishlist_link } href = { `/wishlists/${ urlShare }` } >
            { `${ window.location.host }/wishlists/${ urlShare }` }
          </a>

        </p>
      </div>
    )

  }
  const itemsWishlist = (email:String) =>{
    console.log(email)
    const { data: data2, loading: loading2 }:any = useQuery(GETWISHLIST,{
      variables: {"shopperId": email}
    });
    if(loading2){
      return <p>Loading 2</p>
    }
    console.log('Data 2',data2)
    return (
      <>
      <div className={handles.container}>
        <h4 className = { handles.wishlist_h4 } >Privacy Setting</h4>
        {privacy=="shared" && <AlertShare />}
        <div className = { handles.privacy_options_wrapper } >
          <div className = { handles.privacy_options } >
            <input className = { handles.radio_input } type="radio" value="public" name="privacy" onChange={handleShare} checked={privacy=="public"}/><label>Public: Anyone can find this wish list</label>
          </div>
          <div className = { handles.privacy_options }>
            <input className = { handles.radio_input } type="radio" value="shared" name="privacy" onChange={handleShare} checked={privacy=="shared"}/><label>Shared: Only people with the link can see this wish list</label>
          </div>
          <div className = { handles.privacy_options }>
            <input className = { handles.radio_input } type="radio" value="private" name="privacy" onChange={handleShare} checked={privacy=="private"}/><label>Private: Only you can see this list</label>
          </div>
        </div>
        <div className={ handles.wishlist_share_wrapper }  >
          <FacebookShareButton className={ handles.share_button } children={ <FacebookIcon className={ handles.wishlist_icon } size={ 30 } borderRadius={ 10 } /> } url={ `${ window.location.host }/wishlists/${ urlShare }` } />
          <TwitterShareButton className={ handles.share_button } children={ <TwitterIcon size={ 30 } borderRadius={ 10 } /> } url={ `${ window.location.host }/wishlists/${ urlShare }` } />
          <PinterestShareButton className={ handles.share_button } media= "https://www-jefferspet-weblinc.netdna-ssl.com/assets/store_front/logo-4b2e359865121fcf1ba1d55de282b633.png" children={ <PinterestIcon size={ 30 } borderRadius={ 10 } /> } url={ `${ window.location.host }/wishlists/${ urlShare }` } />
          <EmailShareButton className={ handles.share_button } children={ <EmailIcon size={ 30 } borderRadius={ 10 } /> } url={ `${ window.location.host }/wishlists/${ urlShare }` } />
        </div>
        <div>
          <h4 className = { handles.wishlist_h4 } >Shipping Address</h4>
          <div className ={ handles.gifts_wrapper } >
            <label htmlFor="address_id">
              <span>Send Gifts To</span>
            </label>
            <div className ={ handles.gifts_select_wrapper } >
              <select className={ handles.gifts_select } name="address_id" id="address_id">
                <option value="">Select an address</option>
              </select>
              <span className ={ handles.gifts_span_msg } >
                Allow friends and family to ship gifts directly to your preferred shipping address (the actual address is hidden for privacy)
              </span>

            </div>
          </div>

        </div>

      </div>
      </>
    )
  }
  const ProfileData = () =>{
    const { data:dataorder }:any = useQuery(GETORDER);
    console.log('Data order',dataorder)
    if(loading){
      return <p>Loading 1</p>
    }
    const emailUser= data.profile.email
    return itemsWishlist(emailUser)
  }
  return (
    <div>
      <ProfileData />
    </div>
  )
}


