/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/account` | `/app` | `/bmi` | `/home` | `/login` | `/lunges` | `/notifications` | `/passwordrecovery` | `/planks` | `/privacy` | `/profielBewerken` | `/pushups` | `/register` | `/settings` | `/squats` | `/workouts`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
