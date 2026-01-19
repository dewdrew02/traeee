# Tech Stack Documentation

This project is a BMI Calculator and Tracking application built with modern web technologies.

## Core Technologies

### Framework & Runtime
- **[Next.js](https://nextjs.org/) (v16.1.3)**: React framework for production, providing the application structure, routing, and optimization.
- **[React](https://react.dev/) (v19.2.3)**: JavaScript library for building user interfaces.
- **[Bun](https://bun.sh/)**: Fast all-in-one JavaScript runtime, package manager, and bundler used for development and building the project.

### Language
- **[TypeScript](https://www.typescriptlang.org/) (v5)**: Superset of JavaScript that adds static typing, improving code quality and developer experience.

### Styling
- **[Tailwind CSS](https://tailwindcss.com/) (v4)**: A utility-first CSS framework for rapidly building custom designs directly in your markup.

### Data Persistence
- **LocalStorage**: Browser-based key-value storage used to persist user data (BMI records) across sessions without a backend database.

## Project Structure

- **`src/app`**: Contains the App Router pages and global layouts.
- **`src/components`**: Reusable React components (`BMICalculator`, `BMIReport`).
- **`src/utils`**: Helper functions for logic (`bmi.ts` for calculations and data grouping).
- **`src/types`**: TypeScript interfaces and type definitions.

## Key Features

- **BMI Calculation**: Real-time calculation based on weight and height.
- **Data Visualization**: Reporting view with Daily, Monthly, and Yearly aggregation.
- **Mock Data**: Built-in generator to create test data for visualization.
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS.
