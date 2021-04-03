import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import Login from './views/Login'
import Cadastro from './views/Cadastro'
//const Login = lazy(() => import('./Login'))

const Routes = () => (
    <Router>
        <Suspense fallback={
            <div className="d-flex justify-content-center mt-5 pt-5">
                <CircularProgress />
            </div>
        }>
            <Switch>
                <Route exact path="/cadastro" component={Cadastro} />
                <Route path="/" component={Login} />
            </Switch>
        </Suspense>
    </Router>
)

export default Routes;