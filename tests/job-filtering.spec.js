// @ts-check
import { test, expect } from '@playwright/test';

test('Insider Career Page QA Job Filtering', async ({ page }) => {
  
  const pageTitle = '#1 Leader in Individualized, Cross-Channel CX — Insider';
  const companybtn =  'text=Company';
  const careers = 'text=Careers';
  const locationsBlock = '#career-our-location';
  const openPositionsBlock = '#career-find-our-calling';
  const insiderLifeBlock = 'text=Life at Insider';

  const qaJobsBtn = 'text=See all QA jobs';
  const filterByDepartment = '#select2-filter-by-department-container';
  const locationDropdown = '#select2-filter-by-location-container';
  const location = 'li.select2-results__option';
  const department = 'span[class*="position-department"]';

  const jobCard = 'div[data-location="istanbul-turkiye"]';
  const position = 'div[class="position-list-item-wrapper bg-light"]';
  const positionDepartment = 'span[class*="position-department"]';
  const positionLocation = 'div[class*="position-location"]';

  const ViewRoleBtn = 'a[class*="btn btn-navy rounded"]';

  // Visit main page and check Insider home page is opened or not
  await page.goto('https://useinsider.com/');
  await expect(page).toHaveTitle(pageTitle);

  // Navigate to Careers page and check Locations, Teams, and Life at Insider blocks
  await page.hover(companybtn);
  await page.click(careers);
  await expect(page).toHaveURL(/careers/);
  await expect(page.locator(locationsBlock)).toBeVisible();
  await expect(page.locator(openPositionsBlock)).toBeVisible();
  await expect(page.locator(insiderLifeBlock)).toBeVisible();

  // Go to QA positions and click “See all QA jobs”, then filter jobs by Location
  await page.goto('https://useinsider.com/careers/quality-assurance/');
  await page.click(qaJobsBtn);
  await page.locator(filterByDepartment).getByText('Quality Assurance').waitFor();
  await page.click(locationDropdown);
  await page.waitForTimeout(2000);
  await page.locator(location).filter({ hasText: 'Istanbul, Turkiye' }).click();
  await page.waitForSelector(department);
  // await page.waitForTimeout(5000);

  
  // Check that job positions contain “Quality Assurance”, and Locations contain “Istanbul, Turkey”
  const jobCards = page.locator('div[data-location="istanbul-turkiye"]');
  const positionLocator = page.locator(position);
  const departmentLocator = page.locator(positionDepartment);
  const locationLocator = page.locator(positionLocation);
  const count = await jobCards.count();

  for (let i = 0; i < count; i++) {
    const position = await jobCards.nth(i).locator(positionLocator).textContent();
    const department = await jobCards.nth(i).locator(departmentLocator).textContent();
    const location = await jobCards.nth(i).locator(locationLocator).textContent();
    await expect(position).toContain('Quality Assurance');
    await expect(department).toContain('Quality Assurance');
    await expect(location).toContain('Istanbul, Turkiye');
    
  }

  // Click the “View Role” button and check that redirects to the Lever Application form page
  await page.locator(jobCard).first().hover();
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator(ViewRoleBtn).getByText('View Role').first().click()
  ])
  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL(/jobs.lever.co/);
});