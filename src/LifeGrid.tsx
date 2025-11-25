interface LifeGridProps {
  name: string
  birthDate: string
  onReset: () => void
}

function LifeGrid({ name, birthDate, onReset }: LifeGridProps) {
  const calculateWeeks = () => {
    const birth = new Date(birthDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - birth.getTime())
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7))
    return diffWeeks
  }

  const weeksLived = calculateWeeks()
  const expectedLifeWeeks = 3827 // Average human life expectancy: 73.5 years
  const totalWeeks = expectedLifeWeeks

  const renderGrid = () => {
    const cells = []

    for (let i = 0; i < totalWeeks; i++) {
      const isLived = i < weeksLived
      cells.push(
        <div
          key={i}
          className={`cell ${isLived ? 'lived' : 'future'}`}
        />
      )
    }

    return cells
  }

  const yearsLived = Math.floor(weeksLived / 52)
  const remainingWeeks = weeksLived % 52

  return (
    <div className="life-grid-container">
      <div className="header">
        <div className="title-section">
          <h1>{name}</h1>
          <p className="stats">
            {yearsLived} years and {remainingWeeks} weeks lived
            <span className="separator"> • </span>
            {weeksLived.toLocaleString()} weeks total
          </p>
        </div>
      </div>

      <p className="life-expectancy">
        Today, the average human life expectancy is about 73.5 years (≈3,827 weeks)
      </p>

      <div className="legend">
        <span className="legend-item">
          <span className="legend-box lived"></span>
          Lived
        </span>
        <span className="legend-item">
          <span className="legend-box future"></span>
          Future
        </span>
      </div>

      <div className="grid-wrapper">
        <div className="grid">
          {renderGrid()}
        </div>
      </div>

      <div className="reset-section">
        <button onClick={onReset} className="btn-reset">
          Reset
        </button>
      </div>
    </div>
  )
}

export default LifeGrid
