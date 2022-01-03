import React from 'react';
import { Switch, Route } from 'react-router-native';
import { SignInView } from '../views/SignInView/SignInView';
import { SignUpView } from '../views/SignUpView/SignUpView';

export const SIGN_IN_ROUTE = '/';
export const SIGN_UP_ROUTE = '/sign-up';

export const PublicContentRouting = () => {
    return (
        <Switch>
            <Route exact path={SIGN_IN_ROUTE} component={SignInView} />
            <Route exact path={SIGN_UP_ROUTE} component={SignUpView} />
        </Switch>
    )
}