import getAllUsers from "../api/api"

const SET_USERS = 'SET-USERS'
const SET_PAGE = 'SET-PAGE'

const initialState = {
  users: [
  ],
  pageSize: 10,
  pageNumber: 1
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users.rows,
        count: action.users.count
      }
    case SET_PAGE:
      console.log('hello')
      return {
        ...state,
        pageNumber: action.pageNumber
      }
    default:
      return state;
  }

}

export const setUsersAC = (users) => ({
  type: SET_USERS, users: users })

export const setCurrentPageAC = (page) => ({
  type: SET_PAGE, pageNumber: page })

export const setUsers = (pageSize, page) => {
  return (dispatch) => {
    getAllUsers(pageSize, page).then(data => {
    dispatch(setUsersAC(data))
  }
  )
}}  

export default reducer;