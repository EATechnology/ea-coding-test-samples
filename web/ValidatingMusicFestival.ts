import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {

  await page.goto('https://eacp.energyaustralia.com.au/codingtest/api-docs/');

});

test.describe('Demo Test', () => {

    test('Verify Music Festival', async ({ page }) => {
        await page.waitForSelector('Music Festival',{state:'visible'});
await page.locator('MusicFestival').isVisable();
expect( await page.locator('MusicFestival'), 'Validating MusicFestival as String').toHaveString();
        await page.locator('Band').isVisable();
        await page.locator('name').isVisable();
expect( await page.locator('name'), 'Validating Name as String').toHaveString();
        await page.locator('recordLabel').isVisable();
expect( await page.locator('recordLabel'), 'Validating recordLabel as String').toHaveString();
    });

});
