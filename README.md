# Проект Movies Explorer

## Цель проекта
Дипломный проект курса ***Яндекс Практикум*** по профессии веб-разработчик  
Бэкенд часть для приложения проекта `Movies Explorer`  
Репозиторий с фронтенд-частью можно посмотреть по ссылке [Movies Explorer Frontend](https://github.com/SvetAlexa/movies-explorer-frontend).

## Функционал
* регистрация и авторизация пользователей  
* редактирование профиля пользователя  
* добавление и удаление фильмов в избранное  
* аутентификация пользователя с помощью cookie  
* валидация приходящих на сервер запросов и данных на уровне схемы БД  
* централизованная обработка ошибок

## Технологии
<div id="badges">
  <img src="https://img.shields.io/badge/Node.js-blue?style=for-the-badge&logo=Node.js&logoColor=white" alt="Node.js Badge"/>
  <img src="https://img.shields.io/badge/Express-orange?style=for-the-badge&logo=Express&logoColor=white" alt="Express Badge"/>
  <img src="https://img.shields.io/badge/MongoDB-grey?style=for-the-badge&logo=MongoDB&logoColor=white" alt="MongoDB Badge"/>
</div>

## Директории
`/models` — содержит файлы описания схем пользователя и сохраненного фильма  
`/controllers` — содержит файлы описания моделей пользователя и фильма  
`/routes` — содержит описание основных роутов для пользователя и карточки  
`/middlewares` — директория с мидлварами  
`/errors` — директория с файлами кастомных ошибок  
`/utils` — содержит вспомогательные файлы  

## Endpoints
* **`/signup`**
   - *`POST`* запрос - создает пользователя с переданными в теле `email`, `password` и `name`. Пароль записывается в БД в зашифрованном виде
* **`/signin`**
   - *`POST`* запрос - проверяет переданные в теле почту и пароль и возвращает `JWT`
* **`/signout`**
   - *`POST`* запрос - удаляет `JWT` из куков пользователя
* **`/users/me`**
   - *`GET`* запрос - возвращает информацию о пользователе (email и имя)
* **`/users/me`**
   - *`PATCH`* запрос - обновляет информацию о пользователе (email и имя)
* **`/movies`**
    - *`GET`* запрос - возвращает все сохраненные текущем пользователем фильмы
    - *`POST`* запрос - создает в БД фильм с переданными в теле параметрами
* **`/movies/_id`**
   - *`DELETE`* запрос - удаляет сохраненный фильм по `id`

## Ссылки
**Ссылка на домен сервера** https://api.movies-diploma.nomoredomainsrocks.ru/  
**Ссылка на сайт приложения** https://movies-diploma.nomoredomainsrocks.ru/

## Запуск проекта
Предварительные требования: [Node.js](https://nodejs.org/en) и [MongoDB](https://www.mongodb.com/try/download/community) версия 4

* `git clone git@github.com:SvetAlexa/movies-explorer-api.git` склонировать репозиторий или сказать zip-архив  
* `cd movies-explorer-api` — перейти в папку проекта
* `npm ci` — установить зависимости  
* `npm run start` — запуcтить сервер   
* `npm run dev` — запустить сервер с hot-reload

Сервер слушает порт 3000. Изменить порт можно в файле config.js
