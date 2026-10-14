import { Stack } from 'expo-router';
import { BusinessProvider } from '../businesses';
import { colors } from '../theme';

export default function Layout() {
  return (
    <BusinessProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.ink,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: 'Discover' }}
        />
        <Stack.Screen
          name="create"
          options={{ title: 'Add a business' }}
        />
      </Stack>
    </BusinessProvider>
  );
}