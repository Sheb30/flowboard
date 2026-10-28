const fs = require('fs')
const path = require('path')

const file = path.join(process.cwd(), 'src', 'App.jsx')
if (!fs.existsSync(file)) {
  console.error('Error: src/App.jsx was not found. Run this script from the FlowBoard project folder.')
  process.exit(1)
}

let source = fs.readFileSync(file, 'utf8')
const backup = file + '.backup-before-lint-fix'

const taskStart = source.indexOf('  function TaskRows({ items }) {')
const projectStart = source.indexOf('  function ProjectCards() {', taskStart)
const appReturnStart = source.indexOf('  return (\n    <div className={`app-shell', projectStart)

if (taskStart < 0 || projectStart < 0 || appReturnStart < 0) {
  console.error('Error: expected component definitions were not found. No changes were made.')
  process.exit(1)
}

let taskComponent = source.slice(taskStart, projectStart).trimEnd()
let projectComponent = source.slice(projectStart, appReturnStart).trimEnd()
source = source.slice(0, taskStart) + source.slice(appReturnStart)

taskComponent = taskComponent.replace(
  /^\s*function TaskRows\(\{ items \}\)/,
  'function TaskRows({ items, toggleTask, cycleStatus, openEditForm, deleteTask })'
)

projectComponent = projectComponent.replace(
  /^\s*function ProjectCards\(\)/,
  'function ProjectCards({ projectStats, projects, openEditProject, askDeleteProject, setActiveNav, openCreateProject })'
)

// Remove the state updates from persistence-effect error handlers regardless
// of indentation, semicolons, or the exact console.error wording.
source = source.replace(/^\s*setNotice\(['"]Could not save (?:tasks|projects) in this browser['"]\);?\s*$/gm, '')

source = source.replace(
  '<TaskRows items={filteredTasks.slice(0, 5)} />',
  '<TaskRows items={filteredTasks.slice(0, 5)} toggleTask={toggleTask} cycleStatus={cycleStatus} openEditForm={openEditForm} deleteTask={deleteTask} />'
)
source = source.replace(
  '<TaskRows items={filteredTasks} />',
  '<TaskRows items={filteredTasks} toggleTask={toggleTask} cycleStatus={cycleStatus} openEditForm={openEditForm} deleteTask={deleteTask} />'
)
source = source.replace(
  '<ProjectCards />',
  '<ProjectCards projectStats={projectStats} projects={projects} openEditProject={openEditProject} askDeleteProject={askDeleteProject} setActiveNav={setActiveNav} openCreateProject={openCreateProject} />'
)

insertionPoint = source.indexOf('function App() {')
if (insertionPoint < 0) {
  console.error('Error: App function was not found. No changes were made.')
  process.exit(1)
}

if (
  !taskComponent.includes('function TaskRows({ items, toggleTask, cycleStatus, openEditForm, deleteTask })') ||
  !projectComponent.includes('function ProjectCards({ projectStats, projects, openEditProject, askDeleteProject, setActiveNav, openCreateProject })')
) {
  console.error('Error: component signatures did not match. No changes were written.')
  console.error('Please send the first 30 lines around TaskRows and ProjectCards from src/App.jsx.')
  process.exit(1)
}

source = source.slice(0, insertionPoint) + taskComponent.trimStart() + '\n\n' + projectComponent.trimStart() + '\n\n' + source.slice(insertionPoint)

if (
  !source.includes('function TaskRows({ items, toggleTask, cycleStatus, openEditForm, deleteTask })') ||
  !source.includes('function ProjectCards({ projectStats, projects, openEditProject, askDeleteProject, setActiveNav, openCreateProject })') ||
  source.includes("setNotice('Could not save tasks in this browser')") ||
  source.includes("setNotice('Could not save projects in this browser')")
) {
  console.error('Error: validation failed. No changes were written.')
  process.exit(1)
}

fs.copyFileSync(file, backup)
fs.writeFileSync(file, source, 'utf8')
console.log('Success: src/App.jsx has been updated.')
console.log('Backup created at: ' + backup)
console.log('Next run: npm run lint')
