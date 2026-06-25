import { test, expect } from '@playwright/test';


test('Handling tables and pagination', async({page})=> {


    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/table-pagination')


    await expect(page.getByText('Filter Controls')).toBeVisible()

    await page.getByTestId('page-size-select').selectOption('100')


    const rowCount = await page.locator('tbody tr').count()

    console.log(rowCount);

    const obj: {[key: string]: string[]} = {}

    const paginationText = await page.getByTestId('pagination-current').textContent() || ""

    console.log(paginationText);

    const splitted = paginationText.split(' ')

    console.log(splitted);

    console.log(splitted[3]);

    for(let i = 0; i < Number(splitted[3]) - 1; i++) {

        for(let j = 0; j < rowCount; j++) {
            const rowValue = await page.locator('tbody tr').nth(j).locator('td').allTextContents()

            const objKey = rowValue[0]

            obj[objKey] = rowValue
            
        }

   

        await page.getByTestId('pagination-next').click()


    }

    console.log("object===>"+ JSON.stringify(obj));
    
    
    
    
    


})