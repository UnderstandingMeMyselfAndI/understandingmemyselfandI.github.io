import { test, expect } from '@playwright/test'

test('clicking the exit button opens the quick exit dialog', async ({ page }) => {
  // Go to the page where your component lives
  // (the baseURL from config will be prepended)
  await page.goto('/')

  await page.click('#age-gate-yes-btn')
  await page.click('#accept-all-btn')

  // Browser will stay open here for manual testing
  await page.pause() // <-- ADD THIS LINE

  // 2. Wait for the exit button to appear (it's shown after 10 seconds)
  // The button is inside a div with class 'exit-wrap' (see ExitButton.jsx)
  const exitButton = page.locator('.exit-btn').first()
  await exitButton.waitFor({ state: 'visible', timeout: 15000 })

  // 3. Click the button
  await exitButton.click()

  // 4. Verify that the dialog appears
  // The dialog has a title "Quick Exit" (from Exit.jsx)
  const dialog = page.locator('.dialog', { hasText: 'This button lets you leave the app imme' })
  await expect(dialog).toBeVisible()

  // await page.pause()

  // Optional: further assertions, e.g., checkbox is present
  const checkbox = page.locator('input#showAgain')
  await expect(checkbox).toBeVisible()

  // Optional: check that the dialog contains some expected text
  await expect(page.locator('.exit-dialog')).toContainText('Your privacy matters.')
})
