import logger from 'redux-logger'
import promise from 'redux-promise-middleware'
const middlewares = []

middlewares.push(logger)
middlewares.push(promise)

export { middlewares };