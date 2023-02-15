 const initialState = { //初期値
  user: null,
  isAuthenticated: null,
  loading: false,
}

const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    default:
      return state
  }
}

export default authReducer