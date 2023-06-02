export const APP_NAME = process.env.APP_NAME
export const AUTH_TOKEN_NAME = 'app.token'
export const AUTH_TOKEN_TIME = 60 * 60 * 1 // 1 hour
export const DATE_FORMAT = 'YYYY-MM-DD'

export const COLLECTIVE_AGREEMENTS_FILE_URL =
  process.env.API_URL + 'admin/collectiveAgreementsFile'
export const PUBLICATION_FILE_URL =
  process.env.API_URL + 'admin/publicationsFile'

export const BOOK_COVER_UPLOAD_URL = process.env.API_URL + 'upload/book/cover'
export const PRIVACY_POLICY_FILE_UPLOAD_URL =
  process.env.API_URL + 'admin/privacyPolicy'
export const PRIVACY_POLICY_FILE_GET_URL =
  process.env.API_URL + 'uploads/files/privacy_policy/politica_privacidade.pdf'
export const IMPORT_ASSOCIATE_FILE_UPLOAD_URL =
  process.env.API_URL + 'admin/importAssociatesFile'

export const DEFAULT_APP_LOGO_DIR = 'sindalquim-logo.png'
export const DEFAULT_USER_AVATAR_DIR = 'avatar.jpg'

export const TABLE_PAGE_SIZE_OPTIONS = ['20', '50', '100']
export const AUTH_SIGNIN_ROUTE = '/auth/signin'
export const AUTHENTICATED_INDEX_ROUTE = '/dashboard'
