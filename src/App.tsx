import { useState, useEffect } from 'react'
import LifeGrid from './LifeGrid'

interface UserData {
  name: string
  birthDate: string
}

function App() {
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [savedData, setSavedData] = useState<UserData | null>(null)
  const [error, setError] = useState('')

  const getYesterdayDate = () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return yesterday.toISOString().split('T')[0]
  }

  useEffect(() => {
    const stored = localStorage.getItem('userData')
    if (stored) {
      const data = JSON.parse(stored) as UserData
      setSavedData(data)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const selectedDate = new Date(birthDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate >= today) {
      setError('Birth date must be in the past')
      return
    }

    const userData = { name, birthDate }
    localStorage.setItem('userData', JSON.stringify(userData))
    setSavedData(userData)
  }

  const handleReset = () => {
    localStorage.removeItem('userData')
    setSavedData(null)
    setName('')
    setBirthDate('')
  }

  if (savedData) {
    return (
      <LifeGrid
        name={savedData.name}
        birthDate={savedData.birthDate}
        onReset={handleReset}
      />
    )
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Life Countable</h1>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthdate">Date of Birth</label>
          <input
            type="date"
            id="birthdate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={getYesterdayDate()}
            required
          />
          {error && <span className="error">{error}</span>}
        </div>

        <button type="submit" className="btn-start">
          START
        </button>
      </form>
    </div>
  )
}

export default App
