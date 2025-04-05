import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { verifyUserAPI } from '~/apis'
import Loading from '~/components/Loading/Loading'
import paths from '~/routes/paths'

function AccountVerification() {
  const [searchParams] = useSearchParams()
  const { email, token } = Object.fromEntries([...searchParams])
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => setVerified(true))
    }
  }, [email, token])

  if (!email || !token) {
    return <Navigate to="/404" />
  }

  if (!verified) {
    return <Loading caption="Verifying your account..." />
  }

  return <Navigate to={paths.login({ verifiedEmail: email })} />
}

export default AccountVerification
