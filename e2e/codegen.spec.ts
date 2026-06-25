import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic');
  await page.getByTestId('single-click-btn').click();

  await expect(page.getByTestId('single-click-status')).toContainText('Single click completed.');
  await page.getByTestId('double-click-btn').dblclick();
  await expect(page.getByTestId('double-click-status')).toContainText('Double click completed.');
});



// console.log()
// npx playwright test --debug  - npx playwright test tests/codegen.spec.ts --debug
// page.pause() - npx playwright test tests/codegen.spec.ts --headed
// vs code debugging
// trace viewer