import React from 'react';
import { Switch, Route } from 'react-router-native';
import { BodyMeasurementsProvider } from '../contexts/body-measurements-context/bodyMeasurementsContext';
import { DailyProgressProvider } from '../contexts/daily-progress-context/dailyProgressContext';
import { GoalProvider } from '../contexts/goal-context/goalContext';
import { UserProfileProvider } from '../contexts/user-profile-context/userProfileContext';
import { DashboardView } from '../views/DashboardView';
import { GoalsView } from '../views/GoalsView/GoalsView';
import { HistoryView } from '../views/HistoryView';
import { NavigationView } from '../views/NavigationView/NavigationView';
import { ProfileView } from '../views/ProfileView/ProfileView';
import { StatsView } from '../views/StatsView';

export const DASHBOARD_ROUTE = '/'
export const NAVIGATION_ROUTE = '/navigation'
export const PROFILE_ROUTE = '/profile'
export const GOALS_ROUTE = '/goals'
export const STATS_ROUTE = '/stats'
export const HISTORY_ROUTE = '/history'

export const ProtectedContentRouting = () => {
  return (
    <Switch>
      <DailyProgressProvider>
        <UserProfileProvider>
          <GoalProvider>
            <BodyMeasurementsProvider>
              <Route exact path={DASHBOARD_ROUTE} component={DashboardView} />
              <Route exact path={NAVIGATION_ROUTE} component={NavigationView} />
              <Route exact path={PROFILE_ROUTE} component={ProfileView} />
              <Route exact path={GOALS_ROUTE} component={GoalsView} />
              <Route exact path={STATS_ROUTE} component={StatsView} />
              <Route exact path={HISTORY_ROUTE} component={HistoryView} />
            </BodyMeasurementsProvider>
          </GoalProvider>
        </UserProfileProvider>
      </DailyProgressProvider>
    </Switch>
  )
}