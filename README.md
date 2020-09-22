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
| GET      | /recipes/:id      |  resolves to a recipe with that id along with the array of ingredients, and an array of the instructions for that recipe |
| GET | /users/:userid      |    resolves to an array of all the recipes for a particular user based on their id |
| POST       | /recipes | resolves to an array with the newly posted recipe - EXPECTS: title, and user_id, OPTIONAL: source, category, image_url |
| DELETE      | /recipes/:id      |  returns the number of deleted recipes - 1 being successful |
| GET | /users/:userid      |    resolves to an array of all the recipes for a particular user based on their id |

# Ingredient Endpoints
| HTTP method        | to           | Description  |
| ------------- |:-------------:| -----:|
| GET       | /ingredients | returns an array of all the ingredients regardless of recipe |
| GET      | /ingredients/recipes/:id      |  resolves to an array of all the ingredients for a particular recipe based on the recipe id |
| GET | /ingredients/:id      |    returns the ingredient with that particular id |
| POST       | /ingredients | returns the newly posted item, with the id, name, and recipe_id |
| PUT       | /ingredients/:id | returns the newly edited item |
| DELETE      | /ingredients/:id      |  returns the number of deleted ingredients, 1 is successful, based on the ingredient_id |

# Instructions Endpoints
| HTTP method        | to           | Description  |
| ------------- |:-------------:| -----:|
| GET       | /instructions | returns an array of all the instructions regardless of recipe |
| GET      | /instructions/recipe/:id      |  resolves to an array of all the steps for a particular recipe based on the recipe id |
| POST       | /instructions | returns the newly posted item, with the id, name, and recipe id |
| PUT       | /instructions/:id | returns the newly edited item based on the instruction id |
| DELETE      | /ingredients/:id      |  returns the number of deleted instructions, 1 is successful, based on the instruction id |










