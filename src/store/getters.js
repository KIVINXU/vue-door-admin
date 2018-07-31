const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  //avatar: state => state.user.avatar,
  name: state => state.user.name,
  permission_routers: state => state.permission.routers,
  
  //roles: state => state.user.roles
}
export default getters
