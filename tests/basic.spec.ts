import {test, expect} from '@playwright/test'




test('Handling Click, Double Click, Hover, Tooltip, Static Dropdown', async({page})=> {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

    await page.getByTestId('single-click-btn').click()

    await expect(page.getByText('Single click completed.')).toBeVisible()


    await page.getByTestId('double-click-btn').dblclick()

    await expect(page.getByText('Double click completed')).toBeVisible()


    await page.getByTestId('hover-btn').hover()

    await expect(page.getByText('Hover triggered successfully.')).toBeVisible()

    await page.getByTestId('tooltip-trigger-btn').hover()

    await expect(page.getByText('Tooltip verified', { exact: true })).toBeVisible()

    await expect(page.getByText('Tooltip verified successfully.')).toBeVisible()

    await page.getByTestId('static-practice-select').selectOption('Easy - Basic locator targeting')

    await expect(page.getByText('Static dropdown selected: Easy.')).toBeVisible()


})




test('Handling Inputs, Checkbox, Radio, Dropdown', async({page}) => {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

    const name = 'Playwright'

    const email = 'playwrightmasteryacademy@gmail.com'

    const dropdown = 'Playwright Core'

    await page.getByTestId('name-input').fill(name)

    await page.getByTestId('email-input').type(email)

    await page.getByTestId('track-select').selectOption(dropdown)

    await page.getByTestId('remember-checkbox').check()

    await page.getByTestId('mode-api-radio').check()

    await page.getByTestId('submit-form-btn').click()

    await expect(page.getByText(`${name} submitted (${email}) for ${dropdown}.`)).toBeVisible()

})



test('Handling Static Waits, Keyboard', async({page})=> {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

    await page.getByTestId('async-load-btn').click()

    await page.waitForTimeout(20000)

    await expect(page.getByText('Async result loaded successfully.')).toBeVisible()


    await page.getByTestId('keyboard-input').fill('Playwright')

    await page.getByTestId('keyboard-input').press('Enter')

    // Tab, Escape, BackSpace, Delete, ArrowDown, ArrowUp, ArrowLeft, ArrowRight

    // a to Z, 1 to 10

    // Control+C, Control+V, Control+A, Shift+Tab

    await expect(page.getByText('Command submitted: playwright')).toBeVisible()

})


test('Handling Text and Attribute Extraction', async({page})=> {


    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')


    const innerText = await page.getByTestId('extract-textcontent-target').innerText()

    console.log('Inner Text: ', innerText)

    const textContent = await page.getByTestId('extract-textcontent-target').textContent()

    console.log('Text Content: ', textContent)


    const text = await page.getByTestId('extract-inputvalue-target').inputValue()

    console.log('Text: ', text)


    const attrValue = await page.getByTestId('extract-attribute-target').getAttribute('class')

    console.log('Attribute Value: ', attrValue)


    const allInnerTexts = await page.getByTestId('extract-list-item').allInnerTexts()

    console.log('All Inner Texts: ', allInnerTexts)


        const allTextContents = await page.getByTestId('extract-list-item').allTextContents()

    console.log('All Text Contents: ', allTextContents)



})


test('Conditional handling - isChecked, is editable', async({page})=> {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

    await page.getByTestId('remember-checkbox').check()

   const isChecked = await page.getByTestId('remember-checkbox').isChecked()

   console.log('Is Checkbox Checked: ', isChecked)


   const isEditable = await page.getByTestId('name-input').isEditable()

   console.log('Is Name Input Editable: ', isEditable)

})


test('conditional Handling - isVisible, isHidden, isDisabled', async({page})=> {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

    const isDisabled = await page.getByTestId('dynamic-group-select').isDisabled()

    console.log('Is Dropdown Disabled: ', isDisabled)


    const isHidden = await page.getByTestId('hidden-dropdown-select').isHidden()

    console.log('Is Dropdown Hidden: ', isHidden)


    const isVisible = await page.getByTestId('hidden-dropdown-select').isVisible()

    console.log('Is Dropdown Visible: ', isVisible)
})