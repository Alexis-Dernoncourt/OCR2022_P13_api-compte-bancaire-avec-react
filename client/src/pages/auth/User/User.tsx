import { jwtDecode } from "jwt-decode"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import AccountBlock from "../../../components/AccountBlock/AccountBlock"
import { useAuth } from "../../../hooks/auth"
import { updateUserId } from "../../../redux/slices/userSlice"
import "./User.css"

export default function User() {
  const dispatch = useDispatch()
  const user = useAuth()
  const token = user.token
  useEffect(() => {
    if (user.token) {
      const decoded: { iat: number; exp: number; id: string } = jwtDecode(token)
      dispatch(updateUserId({ id: decoded.id }))
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token])

  return (
    <>
      <div className="header">
        <h1>
          Welcome back
          <br />
          Tony Jarvis!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <AccountBlock />
    </>
  )
}
