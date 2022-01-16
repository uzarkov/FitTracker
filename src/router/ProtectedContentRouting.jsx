import React from 'react';
import { Switch, Route } from 'react-router-native';
import { BodyMeasurementsProvider } from '../contexts/body-measurements-context/bodyMeasurementsContext';
import { DailyProgressProvider } from '../contexts/daily-progress-context/dailyProgressContext';
import { GoalProvider } from '../contexts/goal-context/goalContext';
import { UserProfileProvider } from '../contexts/user-profile-context/userProfileContext';
import { DashboardView } from '../views/DashboardView/DashboardView';
import { GoalsView } from '../views/GoalsView/GoalsView';
import { HistoryView } from '../views/HistoryView/HistoryView';
import { NavigationView } from '../views/NavigationView/NavigationView';
import { ProfileView } from '../views/ProfileView/ProfileView';
import { PROTECTED_ROUTES } from './constants';

export const ProtectedContentRouting = () => {
  return (
    <Switch>
      <DailyProgressProvider>
        <UserProfileProvider>
          <GoalProvider>
            <BodyMeasurementsProvider>
              <Route exact path={PROTECTED_ROUTES.DASHBOARD_ROUTE} component={DashboardView} />
              <Route exact path={PROTECTED_ROUTES.NAVIGATION_ROUTE} component={NavigationView} />
              <Route exact path={PROTECTED_ROUTES.PROFILE_ROUTE} component={ProfileView} />
              <Route exact path={PROTECTED_ROUTES.GOALS_ROUTE} component={GoalsView} />
              <Route exact path={PROTECTED_ROUTES.HISTORY_ROUTE} component={HistoryView} />
            </BodyMeasurementsProvider>
          </GoalProvider>
        </UserProfileProvider>
      </DailyProgressProvider>
    </Switch>
  )
}