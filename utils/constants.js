const REGEX_URL = /^https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i;

const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const FORBIDDEN_CODE = 403;
const NOT_FOUND_CODE = 404;
const CONFLICT_CODE = 409;
const INTERNAL_SERVER_CODE = 500;
const CREATED_CODE = 201;
const MONGO_DUPLICATE_ERROR_CODE = 11000;

const BAD_REQUEST_MESSAGE = 'Переданы некорректные данные';
const UNAUTHORIZED_MESSAGE = 'Необходимо авторизоваться';
const UNAUTHORIZED_LOGIN_MESSAGE = 'Неправильные почта или пароль';
const FORBIDDEN_MESSAGE = 'Недостаточно прав, чтобы выполнить действие';
const NOT_FOUND_USER_MESSAGE = 'Пользователь по указанному _id не найден';
const NOT_FOUND_MOVIE_MESSAGE = 'Фильм с указанным _id не найден';
const NOT_FOUND_PAGE_MESSAGE = 'Страница не найдена';
const CONFLICT_MESSAGE = 'Пользователь с таким email уже существует';
const INTERNAL_SERVER_MESSAGE = 'На сервере произошла ошибка';
const TOO_MANY_REQUESTS_MESSAGE = 'Превышен лимит запросов. Попробуйте еще раз позже.';
const OK_LOGOUT_MESSAGE = 'Вы успешно вышли из аккаунта';
const INVALID_URL_MESSAGE = 'Введите ссылку в формате url';
const INVALID_EMAIL_MESSAGE = 'Введите e-mail в правильном формате';

module.exports = {
  REGEX_URL,
  BAD_REQUEST_CODE,
  UNAUTHORIZED_CODE,
  FORBIDDEN_CODE,
  NOT_FOUND_CODE,
  CONFLICT_CODE,
  INTERNAL_SERVER_CODE,
  CREATED_CODE,
  MONGO_DUPLICATE_ERROR_CODE,
  BAD_REQUEST_MESSAGE,
  UNAUTHORIZED_MESSAGE,
  UNAUTHORIZED_LOGIN_MESSAGE,
  FORBIDDEN_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  NOT_FOUND_MOVIE_MESSAGE,
  NOT_FOUND_PAGE_MESSAGE,
  CONFLICT_MESSAGE,
  INTERNAL_SERVER_MESSAGE,
  TOO_MANY_REQUESTS_MESSAGE,
  OK_LOGOUT_MESSAGE,
  INVALID_URL_MESSAGE,
  INVALID_EMAIL_MESSAGE,
};
