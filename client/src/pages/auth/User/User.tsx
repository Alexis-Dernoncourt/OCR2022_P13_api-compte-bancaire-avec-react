import { jwtDecode } from "jwt-decode"
import { useState } from "react"
import { useSelector } from "react-redux"
import AccountBlock from "../../../components/AccountBlock/AccountBlock"
import EditUsername from "../../../components/Form/EditUser"
import { GetProfileResponseType } from "../../../config/types"
import { useApiUnauthorized, useAuth } from "../../../hooks/auth"
import { useGetUserDataQuery } from "../../../redux/services/authService"
import "./User.css"

export default function User() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reduxUserEmail = useSelector((state: any) => state.user.email)
  const userToken = useAuth()
  const token: { id: string; iat: number; exp: number } = jwtDecode(userToken)
  const getData: { id: string; email: string } = {
    id: token.id,
    email: localStorage.getItem("userEmail") || reduxUserEmail,
  }
  const [editName, setEditName] = useState(false)
  const { data, error, isLoading, isError } = useGetUserDataQuery(getData)
  useApiUnauthorized(error, isError)
  const userName = {
    firstName: (data as GetProfileResponseType)?.body.firstName || "",
    lastName: (data as GetProfileResponseType)?.body.lastName || "",
  }

  if (isLoading) return <h3 style={{ color: "#fff" }}>Chargement...</h3>

  return (
    <>
      <div className="header">
        <h1>
          Welcome back
          <br />
          {!editName ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            userToken && (data as GetProfileResponseType) ? (
              <>
                <p>{`${userName.firstName} ${userName.lastName}`}</p>
                <button
                  className="edit-button"
                  onClick={() => setEditName(true)}>
                  Edit Name
                </button>
              </>
            ) : null
          ) : (
            <EditUsername setEditName={setEditName} userName={userName} />
          )}
        </h1>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <AccountBlock />
    </>
  )
}
