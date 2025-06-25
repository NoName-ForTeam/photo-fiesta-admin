export const ROUTES = {
  LOGIN: '/auth/login',
  USERS_LIST: '/usersList',
  USER_PAGE: '/userPage',
  STATISTICS: '/statistics',
  PAYMENTS_LIST: '/paymentsList',
  POSTS_LIST: '/postsList',
}

export type AppRoutes = typeof ROUTES

export type AppRoutesValues = AppRoutes[keyof AppRoutes]
