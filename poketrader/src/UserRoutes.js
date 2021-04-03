import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import Dashboard from './views/Dashboard'
//const Login = lazy(() => import('./Login'))

const UserRoutes = () => (
    <Router>
        <Suspense fallback={
            <div className="d-flex justify-content-center mt-5 pt-5">
                <CircularProgress />
            </div>
        }>
            <Switch>
                <Route path="/" component={Dashboard} />
            </Switch>
        </Suspense>
    </Router>
)

export default UserRoutes;