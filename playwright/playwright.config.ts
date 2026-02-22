import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  // Look for test files in the "tests" directory (relative to this config)
  testDir: './tests',

  // Run all tests in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: 'html',

  // Shared settings for all projects
  use: {
    // Base URL to use in tests like `await page.goto('/')`
    baseURL: 'http://localhost:5173', // Change to your app's dev URL

    // Collect trace when retrying the test
    trace: 'on-first-retry',
  },

  // Configure projects for different devices / browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // iPhone 8 emulation – perfect for your PWA testing
    {
      name: 'Mobile Safari - iPhone 8',
      use: {
        ...devices['iPhone 8'],
        // Optionally override any iPhone 8 settings here
        // For example, you might want to set locale or timezone
        // locale: 'en-US',
      },
    },

    // You can add more devices like iPad, Pixel, etc.
  ],

  // Run your local dev server before starting the tests
  // (Uncomment and adjust if your app needs to be served)
  webServer: {
    command: 'npm run dev', // command to start your dev server
    url: 'http://localhost:5173', // wait for this url to be ready
    reuseExistingServer: !process.env.CI, // reuse if already running
  },
})
