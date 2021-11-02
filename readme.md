## REST API Contacts

### Routes Contacts

| Method | <http://localhost:{PORT}/api>  | Description                 | Properties                     |
| ------ | -----------------------------  | ----------------------------| ------------------------------ |
| GET    | /contacts                      | get all contacts            | Authorization                  |
| GET    | /contacts/{id}                 | get a contact by id         | Authorization                  |
| POST   | /contacts                      | add a new contact           | Authorization, Body(json)      |
| PUT    | /contacts/{id}                 | update an existing contact  | Authorization, id, Body(json)  |
| PATCH  | /contacts/{id}                 | update at least 1 property  | Authorization, id, Body(json)  |
| PATCH  | /contacts/{id}/favorite        | update a property isFavorite| Authorization, id, Body(json)  |
| DELETE | /contacts/{id}                 | remove a contact by id      | Authorization, id              |
| GET    | /contacts?page={1}&limit={20}  | pagination                  | Authorization, query parameter |
| GET    | /contacts?isFavorite={false}   | filter by favorite          | Authorization, query parameter |

### Routes Users

| Method | <http://localhost:{PORT}/api>    | Description                 | Properties                   |
| ------ | -------------------------------- | --------------------------- | ---------------------------- |
| POST   | /users/registration              | create new user             | Request body                 |
| POST   | /users/login                     | user login                  | Request body                 |
| POST   | /users/logout                    | user logout                 | Authorization                |
| GET    | /users/current                   | get info about current user | Authorization                |
| PATCH  | /users                           | update user subscription    | Auth., Body(subscription)    |
| PATCH  | /users/avatar                    | upload user avatar          | Auth., Body(form-data, file) |
| GET    | /users/verify/{verifyTokenEmail} | verify user email           | query parameter              |
| POST   | /users/verify                    | repeat verify user email    | Body(email)                  |

### Schemas db

| Schema Contacts | Types   | Schema Users        | Types   |
| --------------- | ------- | ------------------- | ------- |
| name            | String  | email \*            | String  |
| email           | String  | password \*         | String  |
| phone           | String  | name                | String  |
| isFavorite      | Boolean | gender              | String  |
| owner           | String  | avatar              | String  |
|                 |         | subscription        | String  |
|                 |         | verifyTokenEmail \* | String  |
|                 |         | isVerified          | Boolean |
|                 |         | token               | String  |
