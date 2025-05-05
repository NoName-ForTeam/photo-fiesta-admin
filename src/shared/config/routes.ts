export const ROUTES = {
  USERS_LIST: '/usersList',
  STATISTICS: '/statistics',
  PAYMENTS_LIST: '/paymentsList',
  POSTS_LIST: '/postsList',
}

export type AppRoutes = typeof ROUTES

export type AppRoutesValues = AppRoutes[keyof AppRoutes]
