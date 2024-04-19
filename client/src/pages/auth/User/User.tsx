import { useState } from "react"
import AccountBlock from "../../../components/AccountBlock/AccountBlock"
import EditUsername from "../../../components/Form/EditUser"
import { GetProfileResponseType } from "../../../config/types"
import { useApiUnauthorized, useTokenJWTDecoded } from "../../../hooks/auth"
import "./User.css"

export default function User() {
  const [editName, setEditName] = useState(false)
  const { userToken, data, isLoading, isError, error } = useTokenJWTDecoded()
  useApiUnauthorized(error, isError)
  const userName = {
    firstName: (data as GetProfileResponseType)?.body.firstName || "",
    lastName: (data as GetProfileResponseType)?.body.lastName || "",
  }

  if (isLoading) return <h3 style={{ color: "#fff" }}>Chargement...</h3>

  return (
    <>
      <div className="header">
        {!editName ? (
          userToken && (data as GetProfileResponseType) ? (
            <h1>
              Welcome back
              <br />
              <>
                {`${userName.firstName} ${userName.lastName}`}
              </>
            </h1>
          ) : null
        ) : (
          <EditUsername setEditName={setEditName} userName={userName} />
        )}
        {!editName &&
          <button
            className="edit-button"
            onClick={() => setEditName(true)}>
            Edit Name
          </button>
        }
      </div>
      <h2 className="sr-only">Accounts</h2>
      <AccountBlock />
    </>
  )
}
