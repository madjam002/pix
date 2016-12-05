import {createStore, combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

import jobsReducer from 'controllers/jobs-popover/reducer'

const reducer = combineReducers({
  form: formReducer,
  jobs: jobsReducer,
})

const store = createStore(reducer)

export default store
