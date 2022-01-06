# Movie Release Date Trivia Game

## Basic Requirements 
As an avid fan of movies and movie trivia, I want to create a web application to generate movie release date trivia questions. Users should be able to sign up for an account answer as many questions as they like and see statistics on how well they answer movie date questions. Users should be able to see their statistics compared to others on a leader board. Users will be able to upload specific lists exported from IMDB so users can do trivia on subsets of movies. This web application is to be completed by April 2022.

## Extra Features
As a web developer, my eyes are always bigger than my stomach. I have many extra features I would like to add to this project if I have time. Some of these include:
- Adding API calls to IMDB to get images of movie posters
- Adding web sockets so there can be a multiplayer mode 
- Adding question types other than movie release dates

## Domain Driven Design 
### Events
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

### Commands
Authentication Commands
* createAccount
* logInUser
* logOutUser
* deleteAccount

General Movie Game Commands
* startMovieGame
* answerQuestion
* nextQuestion

Movie Lists Commands
* uploadListCSVFile
* updateList (changeName, changePrivacy)
* deleteList
* playMovieList
* answerMovieListQuestion
* nextMovieListQuesion
* readPublicMovieLists