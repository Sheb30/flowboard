
import {
    Area,
    AreaChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
  } from 'recharts'
  
  import {
    ChevronDown,
    MoreHorizontal,
  } from 'lucide-react'
  
  const activityData = [
    { day: 'Mon', completed: 8, created: 5 },
    { day: 'Tue', completed: 12, created: 8 },
    { day: 'Wed', completed: 9, created: 6 },
    { day: 'Thu', completed: 16, created: 10 },
    { day: 'Fri', completed: 13, created: 7 },
    { day: 'Sat', completed: 18, created: 9 },
    { day: 'Sun', completed: 15, created: 6 },
  ]
  
  export default function DashboardCharts({
    tasks,
    inProgressTasks,
    completedTasks,
    onNotice,
  }) {
    const todoTasks = tasks.filter((task) => task.status === 'To Do').length
  
    const distributionData = [
      { name: 'To Do', value: todoTasks || 0.01, displayValue: todoTasks },
      { name: 'In Progress', value: inProgressTasks || 0.01, displayValue: inProgressTasks },
      { name: 'Done', value: completedTasks || 0.01, displayValue: completedTasks },
    ]
  
    return (
      <section className="overview-grid">
        <article className="panel activity-panel">
          <div className="panel-heading">
            <div>
              <h2>Activity overview</h2>
              <p>Task activity throughout the week</p>
            </div>
  
            <button
              className="select-button"
              type="button"
              onClick={() => onNotice('Showing activity for this week')}
            >
              This week <ChevronDown size={15} />
            </button>
          </div>
  
          <div className="chart-legend">
            <span>
              <i className="legend-dot legend-purple" /> Completed
            </span>
            <span>
              <i className="legend-dot legend-mint" /> Created
            </span>
          </div>
  
          <div className="activity-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={activityData}
                margin={{ top: 8, right: 6, left: -22, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="completedFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#8b7cf6"
                      stopOpacity={0.22}
                    />
                    <stop
                      offset="95%"
                      stopColor="#8b7cf6"
                      stopOpacity={0}
                    />
                  </linearGradient>
  
                  <linearGradient
                    id="createdFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#54b8a5"
                      stopOpacity={0.18}
                    />
                    <stop
                      offset="95%"
                      stopColor="#54b8a5"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
  
                <CartesianGrid
                  strokeDasharray="3 5"
                  vertical={false}
                  stroke="var(--chart-grid)"
                />
  
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--muted)', fontSize: 12 }}
                  dy={9}
                />
  
                <Tooltip
                  contentStyle={{
                    background: 'var(--panel)',
                    border: '1px solid var(--border)',
                    borderRadius: 12,
                    color: 'var(--text)',
                  }}
                />
  
                <Area
                  type="monotone"
                  dataKey="completed"
                  name="Completed"
                  stroke="#8b7cf6"
                  strokeWidth={2.5}
                  fill="url(#completedFill)"
                />
  
                <Area
                  type="monotone"
                  dataKey="created"
                  name="Created"
                  stroke="#54b8a5"
                  strokeWidth={2.5}
                  fill="url(#createdFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>
  
        <article className="panel progress-panel">
          <div className="panel-heading">
            <div>
              <h2>Task distribution</h2>
              <p>Current status breakdown</p>
            </div>
  
            <button
              className="icon-button subtle-icon"
              type="button"
              aria-label="Task distribution information"
              onClick={() =>
                onNotice('Distribution is based on your current task statuses.')
              }
            >
              <MoreHorizontal size={20} />
            </button>
          </div>
  
          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="68%"
                  outerRadius="88%"
                  paddingAngle={5}
                  stroke="none"
                >
                  <Cell fill="#8b7cf6" />
                  <Cell fill="#e7a45b" />
                  <Cell fill="#54b8a5" />
                </Pie>
  
                <Tooltip
                  contentStyle={{
                    background: 'var(--panel)',
                    border: '1px solid var(--border)',
                    borderRadius: 12,
                    color: 'var(--text)',
                  }}
                  formatter={(_value, name, item) => [
                    item.payload.displayValue,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
  
            <div className="donut-center">
              <strong>{tasks.length}</strong>
              <span>Total tasks</span>
            </div>
          </div>
  
          <div className="distribution-legend">
            <div>
              <span>
                <i className="legend-dot legend-purple" /> To Do
              </span>
              <strong>{todoTasks}</strong>
            </div>
  
            <div>
              <span>
                <i className="legend-dot legend-orange" /> In Progress
              </span>
              <strong>{inProgressTasks}</strong>
            </div>
  
            <div>
              <span>
                <i className="legend-dot legend-mint" /> Completed
              </span>
              <strong>{completedTasks}</strong>
            </div>
          </div>
        </article>
      </section>
    )
  }
  