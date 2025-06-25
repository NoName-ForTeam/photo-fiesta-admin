type Avatar = {
  url: string
  width: number
  height: number
  fileSize: number
}

export type SubscriptionPaymentsModel = {
  id: number
  userId: number
  userName: string
  paymentMethod: 'STRIPE' | 'PAYPAL' | 'CREDIT_CARD'
  amount: number
  currency?: 'USD' | 'EUR'
  createdAt: string
  endDate?: string
  type: 'MONTHLY' | 'DAY' | 'WEEKLY'
  avatars: Avatar[]
}

export type PaymentsPaginationModel = {
  items: SubscriptionPaymentsModel[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}
export type PaymentsResponse = {
  getPayments: PaymentsPaginationModel
}
export type PostModel = {
  id: number
  images: ImagePost[]
}

export type PostsPaginationModel = {
  items: PostModel[]
  page: number
  pageSize: number
  totalCount: number
  pagesCount: number
}

export type ImagePost = {
  id: number
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}

export type PostsByUserModel = {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  items: ImagePost[]
}
export type SubscriptionByPaymentModel = {
  /** ID записи */
  id: string
  /** ID бизнес-аккаунта */
  businessAccountId: number
  /** Статус подписки */
  status: 'PENDING' | 'ACTIVE' | 'FINISHED' | 'DELETED'
  /** Дата оплаты (может быть null) */
  dateOfPayment?: string
  /** Дата начала */
  startDate: string
  /** Дата окончания (может быть null) */
  endDate?: string
  /** Тип подписки */
  type: 'MONTHLY' | 'DAY' | 'WEEKLY'
  /** Сумма */
  price: number
  /** Тип платежа */
  paymentType: 'STRIPE' | 'PAYPAL' | 'CREDIT_CARD'
  /** Массив вложенных платежей */
  payments: PaymentModel[]
}

/** Вложенный платеж внутри SubscriptionByPaymentModel.payments */
export type PaymentModel = {
  /** ID */
  id?: number
  /** ID пользователя */
  userId?: number
  /** Метод платежа */
  paymentMethod?: 'STRIPE' | 'PAYPAL' | 'CREDIT_CARD'
  /** Сумма */
  amount?: number
  /** Валюта */
  currency?: 'USD' | 'EUR'
  /** Когда создан этот платёж */
  createdAt?: string
  /** Дата окончания при необходимости */
  endDate?: string
  /** Тип подписки (повторяется из родителя) */
  type?: 'MONTHLY' | 'DAY' | 'WEEKLY'
}

/** Модель страницы для getPaymentsByUser */
export type PaymentsByUserModel = {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  items: SubscriptionByPaymentModel[]
}

/** Результат выполнения запроса getPaymentsByUser */
export type PaymentsByUserResponse = {
  getPaymentsByUser: PaymentsByUserModel
}
export type DateTime = string

export type Follow = {
  id: number
  userId: number
  userName?: string
  firstName?: string
  lastName?: string
  createdAt: DateTime
}

export type FollowPaginationModel = {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  items: Follow[]
}

export type FollowersResponse = {
  getFollowers: FollowPaginationModel
}

export type FollowingResponse = {
  getFollowing: FollowPaginationModel
}
