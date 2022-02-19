const expect = require('chai').expect
const { server: app } = require('../server/server')
const request = require('supertest')

describe('server', () => {

	describe('users', () => {

		it('can create an account', () => {
			// The supertest request function returns a promise.
			// Remember that one way to run asynchronous tests
			// is to return a promise.
			return request(app)
				.post('/api/users')
				.send({
					username: 'someuser',
					password: 'somepass'
				})
				.expect(201)
		})

        it('can\'t create an account with missing password', () => {
			return request(app)
				.post('/api/users')
				.send({
					username: 'someuser',
				})
				.expect(400)
		})

        it('can\'t create an account with missing username', () => {
			return request(app)
				.post('/api/users')
				.send({
					password: "somepass"
				})
				.expect(400)
		})

		it('can delete an account', () => {
			return request(app)
				.delete('/api/users/account-id')
				.send() 
				.expect(204)
		})


		it('can update account username', () => {
			return request(app)
				.put('/api/users/account-id')
				.send({
					username: 'someuser'
				})
				.expect(200)
		})
		it('can update account password', () => {
			return request(app)
				.put('/api/users/account-id')
				.send({
					password: 'newPass'
				})
				.expect(200)
		})

		it('can login', () => {
			return request(app)
				.put('/api/users/login')
				.send({
					username: 'someuser',
					password: 'somepass'
				})
				.expect(200)
		})

        it('can\'t login without password', () => {
			return request(app)
				.put('/api/users/login')
				.send({
					username: 'someuser'
				})
				.expect(400)
		})

		it('can logout', () => {
			return request(app)
				.put('/api/users/logout/account-id')
				.send()
				.expect(200)
		})
	})

	describe('General Game', () => {

		it('can get questions', () => {
			return request(app)
				.get('/api/questions')
				.send()
				.expect(200)
				.then(res => {
					expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('movieId', "title", "correctAnswer", "answers", "nextMovieId")
                    expect(res.body.movieId).to.be.an('string')
                    expect(res.body.title).to.be.an('string')
                    expect(res.body.correctAnswer).to.be.an('number')
                    expect(res.body.nextMovieId).to.be.an('string')
                    expect(res.body.answers).to.be.an('array')
                    res.body.answers.forEach(answer => {
                        expect(answer).to.be.an('number')
                    })
				})
		})

		it('can answer questions', () => {
			return request(app)
				.put('/api/questions/user-id/movies/movie-id')
				.send({
					answer: 2012,
					correctAnswer: 2011,
				})
				.expect(200)
		})

        it('can\'t answer questions without answer', () => {
			return request(app)
				.put('/api/questions/user-id/movies/movie-id')
				.send({
					correctAnswer: 2011,
				})
				.expect(400)
		})

        it('can\'t answer questions without correctAnswer', () => {
			return request(app)
				.put('/api/questions/user-id/movies/movie-id')
				.send({
                    answer: 1999,
					correctAnswer: false,
				})
				.expect(400)
		})
	})

    describe('Stats', () => {

		it('can get personal stats', () => {
			return request(app)
				.get('/api/stats/user-id')
				.send()
				.expect(200)
				.then(res => {
					expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('userName', "totalQuestionsAnswerd", "correctAnswers", "incorrectAnswers", "longestStreak")
                    expect(res.body.userName).to.be.an('string')
                    expect(res.body.totalQuestionsAnswerd).to.be.an('number')
                    expect(res.body.correctAnswers).to.be.an('number')
                    expect(res.body.incorrectAnswers).to.be.an('number')
                    expect(res.body.longestStreak).to.be.an('number')
				})
		})

		it('can get leaderboard stats', () => {
            return request(app)
            .get('/api/stats')
            .send()
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array')
                res.body.forEach(stat => {
                    expect(stat).to.have.all.keys('userName', "totalQuestionsAnswerd", "correctAnswers", "incorrectAnswers", "longestStreak")
                    expect(stat.userName).to.be.an('string')
                    expect(stat.totalQuestionsAnswerd).to.be.an('number')
                    expect(stat.correctAnswers).to.be.an('number')
                    expect(stat.incorrectAnswers).to.be.an('number')
                    expect(stat.longestStreak).to.be.an('number')
                });
            })
		})
	})

    describe('Lists', () => {
        it('can get movie lists', () => {
			return request(app)
				.get('/api/lists')
				.send()
				.expect(200)
		})

		it('can update a movie list name', () => {
			return request(app)
				.put('/api/lists/list-id')
				.send({
                    name: "whatever"
				})
				.expect(200)
		})

        it('can update a movie list public status', () => {
			return request(app)
				.put('/api/lists/list-id')
				.send({
                    public: false
                })
				.expect(200)
		})

        it('can\'t update a movie list public status to non boolean', () => {
			return request(app)
				.put('/api/lists/list-id')
				.send({
                    public: "yes"
                })
				.expect(400)
		})
        
        it('can delete a movie list', () => {
			return request(app)
				.delete('/api/lists/list-id')
				.send()
				.expect(204)
		})

        it('can start a movie list game', () => {
			return request(app)
				.get('/api/lists/questions/list-id')
				.send()
				.expect(200)
                .then(res => {
					expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('movieId', "title", "correctAnswer", "answers", "nextMovieId")
                    expect(res.body.movieId).to.be.an('string')
                    expect(res.body.title).to.be.an('string')
                    expect(res.body.correctAnswer).to.be.an('number')
                    expect(res.body.nextMovieId).to.be.an('string')
                    expect(res.body.answers).to.be.an('array')
                    res.body.answers.forEach(answer => {
                        expect(answer).to.be.an('number')
                    })
				})
		})

        it('can answer a list question', () => {
			return request(app)
				.put('/api/lists/questions/list-id')
				.send({
                    nextMovieId: "JFDLKJ379",
                    answer: 2014,
                    correctAnswer: 2015
                })
				.expect(200)
                .then(res => {
					expect(res.body).to.be.an('object')
                    expect(res.body).to.have.all.keys('movieId', "title", "correctAnswer", "answers", "nextMovieId")
                    expect(res.body.movieId).to.be.an('string')
                    expect(res.body.title).to.be.an('string')
                    expect(res.body.correctAnswer).to.be.an('number')
                    expect(res.body.nextMovieId).to.be.an('string')
                    expect(res.body.answers).to.be.an('array')
                    res.body.answers.forEach(answer => {
                        expect(answer).to.be.an('number')
                    })
				})
		})

        it('can\'t answer a list question without answer', () => {
			return request(app)
				.put('/api/lists/questions/list-id')
				.send({
                    nextMovieId: "JFDLKJ379",
                    correctAnswer: 2015
                })
				.expect(400)
		})
        
        it('can\'t answer a list question without correctAnswer', () => {
			return request(app)
				.put('/api/lists/questions/list-id')
				.send({
                    nextMovieId: "JFDLKJ379",
                    answer: 2014
                })
				.expect(400)
		})
	})
})