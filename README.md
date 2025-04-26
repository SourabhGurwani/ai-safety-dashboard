# AI Safety Incident Dashboard
https://ai-safety-dashboard-eta.vercel.app/

![Dashboard Screenshot](/public/screenshot.png)

A comprehensive dashboard for tracking and managing AI safety incidents with advanced filtering, reporting, and analytics capabilities.

## Features

- 🚨 **Incident Management**
  - View all reported AI safety incidents
  - Filter by severity (Low, Medium, High) and status
  - Sort by reported date (newest/oldest first)
  - Search across titles and tags

- 📝 **Incident Reporting**
  - Rich form for submitting new incidents
  - Tagging system for categorization
  - Status tracking (Open, Investigating, Resolved)

- 🎨 **UI Features**
  - Responsive design for all screen sizes
  - Clean, intuitive interface

## Technologies Used

- **Frontend**: React 18 with TypeScript
- **Styling**: CSS with CSS Variables for theming
- **Build Tool**: Create React App
- **State Management**: React Hooks

## Installation

Follow these steps to set up the project locally:

### 1. Clone the repository
Clone the repository to your local machine using the following command:
```bash
git clone https://github.com/SourabhGurwani/ai-safety-dashboard.git
cd ai-safety-dashboard
```

### 2. Install dependencies
Install the required dependencies using `npm` or `yarn`:
```bash
npm install
# or
yarn install
```

### 3. Start the development server
Run the development server to view the application locally:
```bash
npm start
# or
yarn start
```
The application will be available at `http://localhost:3000`.

### 4. Build for production (optional)
To create an optimized production build, use the following command:
```bash
npm run build
# or
yarn build
```
The production-ready files will be available in the `build` directory.

### 5. Run tests (optional)
To run the test suite, use:
```bash
npm test
# or
yarn test
```

## Design Decisions and Challenges

- **Design Decisions**:
  - The project uses React 18 with TypeScript for type safety and scalability.
  - CSS Variables are used for theming to ensure a consistent and customizable design.
  - React Hooks are leveraged for state management to keep the codebase simple and functional.

- **Challenges**:
  - Ensuring responsiveness across all screen sizes required extensive testing and adjustments.
  - Managing complex filtering and sorting logic for incidents while maintaining performance.



