import { useEffect, useState } from 'react'
import { path, pathOr } from 'ramda'

declare const window: any

const getUtmParams = (publicFields: any) => ({
  source: path(['utm_source', 'value'], publicFields),
  medium: path(['utm_medium', 'value'], publicFields),
  campaign: path(['utm_campaign', 'value'], publicFields),
})

const getUtmiParams = (publicFields: any) => ({
  campaign: path(['utmi_cp', 'value'], publicFields),
  page: path(['utmi_p', 'value'], publicFields),
  part: path(['utmi_pc', 'value'], publicFields),
})

const getSessionPromiseFromWindow = () =>
  !window.__RENDER_8_SESSION__ || !window.__RENDER_8_SESSION__.sessionPromise
    ? Promise.resolve(null)
    : window.__RENDER_8_SESSION__.sessionPromise

const useMarketingSessionParams = () => {
  const [utmParams, setUtmParams]: any = useState(undefined)
  const [utmiParams, setUtmiParams]: any = useState(undefined)

  useEffect(() => {
    getSessionPromiseFromWindow()
      .then((data: any) => {
        const publicFields = pathOr(
          {},
          ['response', 'namespaces', 'public'],
          data
        )

        if (Object.keys(publicFields).length === 0) {
          return
        }

        setUtmParams(getUtmParams(publicFields))
        setUtmiParams(getUtmiParams(publicFields))
      })
      .catch(() => {
        // Do nothing!
      })
  }, [])

  return { utmParams, utmiParams }
}

export default useMarketingSessionParams
