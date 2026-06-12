import { test, expect, chromium } from '@playwright/test'



test('Handling Dynamic Dropdown', async ({ page }) => {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

    await page.getByTestId('dynamic-group-select').selectOption('Locators')

    await page.getByTestId('dynamic-option-select').selectOption('getByRole + name')

    await expect(page.getByText('Dynamic Dropdown (Group + Option):Dynamic dropdown selected: getByRole + name')).toBeVisible()

})


test('Handling Hidden dropdown', async ({ page }) => {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

    await page.getByTestId('hidden-dropdown-toggle-btn').click()

    const isVisible = await page.getByTestId('hidden-dropdown-select').isVisible()

    if (isVisible) {

        await page.getByTestId('hidden-dropdown-select').selectOption('Hidden - Core')
    }

    await expect(page.getByText('Hidden dropdown selected: Hidden - Core.')).toBeVisible()
})



test('handling Bootstrap Dropdown', async ({ page }) => {


    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

    await page.getByTestId('bootstrap-dropdown-trigger').click()

    await page.getByText('Weekday Batch').click()

    await expect(page.getByText('Bootstrap dropdown selected: Weekday Batch.')).toBeVisible()

})


test('handling alert popup', async ({ page }) => {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


    // page.on('dialog', async dialog => {
    //     console.log(dialog.message())
    //     await dialog.accept()

    // })

    // await page.getByTestId('alert-btn').click()

    // await expect(page.getByText('Alert handled.')).toBeVisible()


    // page.on('dialog', async dialog => {
    //     console.log(dialog.message())
    //     await dialog.dismiss()
    // })

    // await page.getByTestId('confirm-btn').click()

    // await expect(page.getByText('Confirm dismissed')).toBeVisible()



    page.on('dialog', async dialog => {
        console.log(dialog.message())
        await dialog.accept('Playwright')
    })

    await page.getByTestId('prompt-btn').click()

    await expect(page.getByText('Prompt value: Playwright')).toBeVisible()

})





test('Handling New tab', async () => {


    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

    //getByTestId('popup-link')

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.getByTestId('popup-link').click()
    ])


    await expect(newPage.getByText('Popup Opened Successfully')).toBeVisible()

    await newPage.waitForTimeout(5000)

    // await page.bringToFront()

    await page.waitForTimeout(5000)


})



test('Handling new tab direct click blocked', async () => {

    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


    await page.getByTestId('popup-right-click-link').click()

    await expect(page.getByText('Direct click blocked. Use right click -> Open link in new tab.')).toBeVisible()

    const link = await page.getByTestId('popup-right-click-link').getAttribute('href')

    console.log(link)

    const pageTwo = await context.newPage()

    await pageTwo.goto(`https://playwright-mastery-academy-app.vercel.app/${link}`)

     await expect(pageTwo.getByText('Popup Opened Successfully')).toBeVisible()

     await pageTwo.waitForTimeout(3000)
})