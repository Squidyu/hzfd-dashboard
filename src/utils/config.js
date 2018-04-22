import {hashHistory, browserHistory} from 'dva/router'
import development from './develop.json'
import production from './production.json'
import localMock from './local.json'

const env = 'localMock'

const history = hashHistory
let out = {}

switch (env) {
  case 'development':
    out = {history, ...development, env}
    break
  case 'production':
    out = {history, ...production, env}
    break
  case 'localMock':
    out = {history, ...localMock, env}
    break
}

export default out

