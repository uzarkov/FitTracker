import React from 'react';
import { Switch, Route } from 'react-router-native';
import { SignInView } from '../views/SignInView/SignInView';
import { SignUpView } from '../views/SignUpView/SignUpView';
import { PUBLIC_ROUTES } from './constants';

export const PublicContentRouting = () => {
    return (
        <Switch>
            <Route exact path={PUBLIC_ROUTES.SIGN_IN_ROUTE} component={SignInView} />
            <Route exact path={PUBLIC_ROUTES.SIGN_UP_ROUTE} component={SignUpView} />
        </Switch>
    )
}