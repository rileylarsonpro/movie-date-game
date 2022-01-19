# Movie Release Date Trivia Game

## Basic Requirements 
As an avid fan of movies and movie trivia, I want to create a web application to generate movie release date trivia questions. Users should be able to sign up for an account answer as many questions as they like and see statistics on how well they answer movie date questions. Users should be able to see their statistics compared to others on a leader board. Users will be able to upload specific lists exported from IMDB so users can do trivia on subsets of movies. This web application is to be completed by April 2022.

## Extra Features
As a web developer, my eyes are always bigger than my stomach. I have many extra features I would like to add to this project if I have time. Some of these include:
- Adding API calls to IMDB to get images of movie posters
- Adding web sockets so there can be a multiplayer mode 
- Adding question types other than movie release dates

# Domain Driven Design 
## Events
* User create account
* User logged in 
* User logged out 
* User deletes account
* Start general movie game
* User requests new question
* User answers question
* Read user statistics
* Read general leaderboard statistics 
* Load personal lists
* Upload IMDB movie list .csv
* Delete movie list
* Make movie list public
* Make movie list private
* User Selects Movie List to play
* User requests next question

## Commands
Authentication Commands
* createAccount
* logInUser
* logOutUser
* deleteAccount

General Movie Game Commands
* startMovieGame
* answerQuestion
* nextQuestion
* seeLeaderboard
* seeStats

Movie Lists Commands
* uploadListCSVFile
* updateList (changeName, changePrivacy)
* deleteList
* playMovieList
* answerMovieListQuestion
* nextMovieListQuesion
* readPublicMovieLists

## Entities

User
|   Property  |             Description               |
| ----------- | ------------------------------------- |
| userId      | Unique identifier                     |
| usernmae    | (unique) What the user will be called |
| password    | Hashed password                       |
| loggedIn    | Information about session             |

User Statistics
|         Property         |                                   Description                                       |
| ------------------------ | ----------------------------------------------------------------------------------- |
| userId                   | Unique identifier for user who owns stats                                           |
| totalQuestionsAnswerd    | Count of all answerd questions from general game                                    |
| totalCorrectQuestions    | Count of all correct answerd questions from general game                            |
| totalIncorrectQuestions  | Count of all Incorrect answerd questions from general game                          |
| longestStreak            | Count of user's longest count of correct questions from general game in one sitting | 

Movie List
|   Property  |                       Description                           |
| ----------- | ----------------------------------------------------------- |
| userId      | Unique identifier for user who owns list                    |
| listName    | Name of list                                                |
| public      | Status of list (boolean) true === public, false === private |
| movies      | List of movie value objects                                 |

## Value Objects
Movie
|   Property  |         Description        |
| ----------- | -------------------------- |
| movieId     | Unique identifer for movie | 
| title       | Title of a film            |
| releaseYear | Year the film came out     |



# REST Design

## Endpoints
| Description                | URL Fragment                         | HTTP Method | Path Parameters | Representations        |
|----------------------------|--------------------------------------|-------------|-----------------|------------------------|
| create user                | /users                               | POST        |                 | User Credentials       |
| delete user                | /users/{userId}                      | DELETE      | userId          |                        |
| log user in                | /users/login/{userId}                | PUT         | userId          | User Credentials       |
| log user out               | /users/logout/{userId}               | PUT         | userId          |                        |
| get question               | /questions                           | GET         |                 | Get Question           |
| answer question            | /questions/{userId}/movies/{movieId} | PUT         | userId, movieId | Answer Question        |
| get personal stats         | /stats/{userId}                      | GET         | userId          | Get Personal Stats     |
| see leaderboard stats      | /stats                               | GET         |                 | Get Leaderboard Stats  |
| upload movie list csv file | /lists/{userId}                      | POST        | userId          | Upload Movie List      |
| update movie list          | /lists/{listId}                      | PUT         | listId          | Update Movie List      |
| delete movie list          | /lists/{listId}                      | DELETE      | listId          |                        |
| start movie list game      | /lists/questions/{listId}            | GET         | listId          | Get Question           |
| answer movie list question | /lists/questions/{listId}            | PUT         | listId          | Answer List Question   |
| get public movie lists     | /lists                               | GET         |                 | Get Public Movie Lists |

## Representations

### User Credentials

```json
    {
        "username": "movieGuy",
        "password": "supersecret",
    }
```
### Get Question
```json
    {
        "movieId": "ADEF334978",
        "movie": "movie title",
        "correctAnswer": 2012,
        "answers": [2012, 2014, 2009, 2013]
    }
```
### Answer Question
```json
    {
        "answer": 2012,
        "correctAnswer": 2013
    }
```
### Answer List Question
```json
    {
        "questionsAnswerdInList": 1,
        "answer": 2012,
        "correctAnswer": 2013
    }
```

### Get Personal Stats
```json
    {
        "totalQuestionsAnswerd": 500,
        "correctAnswers": 200,
        "incorrectAnswers": 300,
        "longestStreak": 50
    }
```

### Get Leaderboard Stats
```json
    [
        {
            "userName": "someName",
            "totalQuestionsAnswerd": 800,
            "correctAnswers": 500,
            "incorrectAnswers": 300,
            "longestStreak": 50
        },
        {
            "userName": "someName2",
            "totalQuestionsAnswerd": 600,
            "correctAnswers": 300,
            "incorrectAnswers": 300,
            "longestStreak": 40
        },
        {
            "userName": "someName3",
            "totalQuestionsAnswerd": 500,
            "correctAnswers": 200,
            "incorrectAnswers": 300,
            "longestStreak": 30
        }
    ]
```
### Upload Movie List

csv file
```
    title, release date,
    movie, 2001
    movie2, 2004
    movie3, 1998
```
```json
    {
        "name": "List Name",
        "public": true
    }
```

### Update Movie List
```json
    {
        "name": "List Name",
        "public": true
    }
```
### Get Public Movie Lists
```json
    [
        {
            "listId": "EILH3749837",
            "name": "list name 1",
        },
        {
            "listId": "EILH739837837",
            "name": "list name 2"
        },
        {
            "listId": "EI749IOUH837",
            "name": "list name 3"
        }
    ]
```