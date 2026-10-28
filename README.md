
# FlowBoard

A modern, responsive project management dashboard built with React and Vite.

FlowBoard brings task and project management into one workspace, with dashboard charts, search and filtering, task status and priority controls, and browser-based local storage.

## Features

- **Task management** — organize and manage tasks in one place.
- **Project management** — keep project information organized.
- **Dashboard charts** — view project and task information through charts.
- **Search and filtering** — find relevant tasks and narrow displayed results.
- **Task status and priority** — track task progress and priority.
- **Local browser storage** — keep app data in the current browser using `localStorage`.
- **Responsive layout** — use the dashboard on desktop and mobile-sized screens.


## Tech Stack

<p align="left">
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  </a>
  <a href="https://vite.dev/">
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">
    <img src="https://img.shields.io/badge/CSS-663399?style=for-the-badge&logo=css&logoColor=white" alt="CSS" />
  </a>
</p>


## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) (which includes npm).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sheb30/flowboard.git
   ```

2. Open the project directory:

   ```bash
   cd flowboard
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Run Locally

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed in your terminal.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run lint` | Run ESLint to check the code. |
| `npm run build` | Build the production bundle into `dist/`. |

## Data Storage

FlowBoard uses the browser's `localStorage` for local persistence. Data is stored in the browser profile on the device where the app is being used; it is not automatically synchronized across browsers or devices. Clearing the browser's site data may remove locally stored app data.

## Deployment

FlowBoard is not currently deployed as a public live application. The production build can be generated with:

```bash
npm run build
```

The generated static files are placed in the `dist/` directory. Choose a static hosting provider and configure deployment before sharing a live app URL.

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Make your changes and run the checks:

   ```bash
   npm run lint
   npm run build
   ```

4. Commit and push your branch, then open a pull request.

## License

This project is licensed under the MIT License. See the [`LICENSE`](LICENSE) file for details.

## Repository

[github.com/Sheb30/flowboard](https://github.com/Sheb30/flowboard)
