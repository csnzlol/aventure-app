/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/app` | `/home` | `/login` | `/passwordrecovery` | `/register` | `/workouts`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
