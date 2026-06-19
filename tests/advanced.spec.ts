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




test('Isolated context', async()=> {

    test.setTimeout(120000)

const browser = await chromium.launch()

    
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://testcms.reco-claims.ca/Login')

    await page.locator('[name="Username"]').fill('info+programmanager@xlgclaims.com')

    await page.locator('[name="Password"]').fill('Test1234!')

    await page.locator('[type="submit"]').click()

    await page.waitForTimeout(15000)

    //-------------------------------------------------------------------------

    const contextTwo = await browser.newContext()

    const pageTwo = await contextTwo.newPage()

     await pageTwo.goto('https://testcms.reco-claims.ca/Login')

    await pageTwo.locator('[name="Username"]').fill('info+programmanager@xlgclaims.com')

    await pageTwo.locator('[name="Password"]').fill('Test1234!')

    await pageTwo.locator('[type="submit"]').click()

    await pageTwo.waitForTimeout(15000)


    const cookie = await context.cookies()

    const cookieTwo = await contextTwo.cookies()

    console.log("cookie===>"+ JSON.stringify(cookie))

     console.log("cookieTwo===>"+ JSON.stringify(cookieTwo))








})



test('Handling Drag and drop', async({page})=> {


    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


    await page.getByTestId('drag-source').dragTo(page.getByTestId('drop-target'))

    await expect(page.getByText('Drop completed successfully.')).toBeVisible()




})


test('Single and multiple files upload', async({page})=> {

await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

await page.getByTestId('file-upload-input').setInputFiles('uploads/practice-report.pdf')


await expect(page.getByText('practice-report.pdf uploaded successfully.')).toBeVisible()


await page.getByTestId('multi-file-upload-input').setInputFiles(['uploads/practice-report.pdf', 'uploads/practice-notes.txt', 'uploads/practice-data.xml'])

await expect(page.getByText('3 files uploaded')).toBeVisible()

})




test('Handling Downloads', async({page})=> {

await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

//getByTestId('download-pdf-btn')

const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByTestId('download-pdf-btn').click()
])

const fileName = await download.suggestedFilename()

await download.saveAs(`downloads/${fileName}`)


})



test('Handling Iframe', async({page})=> {

await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


//practice-iframe

const iframe = await page.frameLocator('#practice-iframe')

await iframe.locator('#frame-input').fill('Playwright')

await iframe.locator('#frame-save').click()

await expect(iframe.getByText('Playwright saved')).toBeVisible()


})


test('Handling shadow dom', async({page})=> {


await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


const shadow = await page.getByTestId('shadow-host')


await shadow.locator('#shadow-input').fill('Automation Testing')

await shadow.locator('#shadow-save').click()

await expect(shadow.getByText('Automation Testing saved')).toBeVisible()



})



test('Handling Practice date', async({page})=> {

await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


// await page.getByTestId('practice-date-picker').type('01-06-2026')


// await expect(page.getByText('Practice Date Selected: 2026-06-01')).toBeVisible()


await page.getByTestId('practice-date-picker').fill('2026-06-01')


await expect(page.getByText('Practice Date Selected: 2026-06-01')).toBeVisible()



})


test('Handling interview date', async({page})=> {


await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

const interviewDate = await page.getByTestId('interview-date-picker')

await interviewDate.evaluate((dom, val)=> {

const html = dom as HTMLInputElement
html.value = val as string

html.dispatchEvent(new Event('input'))
html.dispatchEvent(new Event('change'))

}, '2026-06-01')

await expect(page.getByText('Interview Date Selected: 2026-06-01')).toBeVisible()

})



test('Advanced wait commands', async({page})=> {

await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


// await page.getByTestId('wait-navigation-link').click()

// await page.waitForURL('https://playwright-mastery-academy-app.vercel.app/practice/popup?source=waitfornavigation')

// await expect(page.getByText('Popup Opened Successfully')).toBeVisible()


// await page.getByTestId('wait-response-btn').click()

// await page.waitForResponse('https://playwright-mastery-academy-app.vercel.app/api/practice/waits-status')

// await expect(page.getByText('Trigger API Response Completed')).toBeVisible()



// await page.getByTestId('wait-response-btn').click()

// await page.getByText('Trigger API Response Completed').waitFor({state: 'visible'})

// await expect(page.getByText('Trigger API Response Completed')).toBeVisible()


// visible - element should be visible in UI, exists in DOM

// hidden - Locator hidden should not be visible in UI, exists in DOM

// attached - DOM exists

// detached - locator should not exists in DOM and should not be visible





// await page.getByTestId('wait-response-btn').click()

// await page.waitForSelector("//*[contains(text(), 'Trigger API Response Completed')]")

// await expect(page.getByText('Trigger API Response Completed')).toBeVisible()


// load - DOM loaded, images loaded - medium

// await page.getByTestId('wait-loadstate-practice-load-btn').click()

// await page.waitForLoadState('load')

// await expect(page.getByText('Test load State: Completed')).toBeVisible()


// domcontentloaded - DOM loaded - fast
// await page.getByTestId('wait-loadstate-practice-dom-btn').click()

// await page.waitForLoadState('domcontentloaded')

// await expect(page.getByText('Test DOMContentLoaded State: Completed')).toBeVisible()


//networkidle - DOM loaded, images loaded, API calls finished - slow

// await page.getByTestId('wait-loadstate-practice-networkidle-btn').click()

// await page.waitForLoadState('networkidle')

// await expect(page.getByText('Test Network Idle State: Completed')).toBeVisible()


})



test('Handling Mouse actions', async({page})=> {


await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

// await page.getByText('Mouse Actions').scrollIntoViewIfNeeded()

// await expect(page.getByText('Mouse Actions')).toBeVisible()


// await page.getByTestId('mouse-downup-target').hover()

// await page.mouse.down()

// await expect(page.getByText('Mouse down detected')).toBeVisible()

// await page.mouse.up()

// await expect(page.getByText('Mouse down + up detected')).toBeVisible()


// await page.getByTestId('mouse-rightclick-target').click({button: 'right'})

// await expect(page.getByText('Right click detected on target.')).toBeVisible()


// await page.getByTestId('mouse-wheel-target').hover()

// await page.mouse.wheel(0, 300)

// await expect(page.getByText('Mouse wheel scrolled down.')).toBeVisible()




})



test('Force actions', async({page})=> {


    // actions - click, dblclick, hover, check, uncheck, dragto

   await page.getByText('Mouse wheel scrolled down.').click({force: true})

   // Attached to DOM
   // visble
   // stable
   // enable
   // not covered by another element

   // clicking wrong element unintentionally




})




test('element and page screenshot', async({page})=> {

await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

    await page.getByTestId('wait-response-btn').screenshot({path: 'screenshots/element.png'})


    await page.screenshot({path: 'screenshots/page.png', fullPage: true})


})





test('retrying and non retrying assertions', async({page})=> {


    // retry - 5 secs

    // visiblity & state

await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

await expect(page.getByTestId('dynamic-group-select')).toBeVisible()

await expect(page.getByTestId('dynamic-group-select')).toBeEnabled()


await expect(page.getByTestId('dynamic-option-select')).toBeDisabled()

// tobeeditable
// tobehidden
// tobechecked


// text

await expect(page.getByTestId('dynamic-dropdown-status')).toContainText('Dynamic Dropdown')

// toHaveText()

// toHaveValue()

// toHaveAttribute('attribute value')
// toHaveClass('active')

// toHaveCount(20)


// page


//expect(page).toHaveTitle('playwright mastery academy')

// expect(page).toHaveUrl('https//:example.com')


})




