# Backend

# User Login / Sign up Endpoints
| HTTP method        | to           | Description  |
| ------------- |:-------------:| -----:|
| POST       | /auth/register | posts the user to the DB and returns the username and user_id |
| POST      | /auth/login      |  returns the user_id and the newly created token |

# Recipe Endpoints
| HTTP method        | to           | Description  |
| ------------- |:-------------:| -----:|
| GET       | /recipes | resolves to an array of all all the recipes |
| GET      | /recipes/:id      |  resolves to the recipe with that id |
| GET | /recipes/users/:userid      |    resolves to an array of all the recipes for a particular user based on their id |
| POST       | /recipes | resolves to an array with the newly posted recipe - EXPECTS: title, and user_id, OPTIONAL: source, category, image_url, steps, ingredients |
| DELETE      | /recipes/:id      |  returns the number of deleted recipes - 1 being successful |

# Public Recipes Endpoint
| HTTP method        | to           | Description  |
| ------------- |:-------------:| -----:|
| GET       | /public/recipes | resolves to an array of all all the recipes |













