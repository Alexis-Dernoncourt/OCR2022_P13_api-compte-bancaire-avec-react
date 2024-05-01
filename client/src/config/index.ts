import { Location, NavigateFunction } from "react-router-dom"

export const BaseURL = "http://localhost:3001/api/v1"

// custom history object to allow navigation outside react components
export const history = {
  navigate: null as unknown as NavigateFunction,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: null as unknown as Location<any>,
}
