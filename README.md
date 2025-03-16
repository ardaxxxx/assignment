# Insider

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Install Playwright browsers:
   ```sh
   npx playwright install
   ```

## Running Tests

Run all tests in the project:

```sh
npx playwright test
```

Run tests in a specific browser:

```sh
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run tests in headed mode:

```sh
npx playwright test --headed
```

Run a specific test file:

```sh
npx playwright test tests/example.spec.ts
```

## Generating Test Reports

Generate an HTML test report:

```sh
npx playwright test --reporter=html
```

Open the report:

```sh
npx playwright show-report
```
