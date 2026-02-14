import React from 'react'
import useAppStore from '@/store/useAppStore'
import styles from './AccessibilitySettings.module.scss'

const AccessibilitySettings = () => {
  // Pulling state and setters from your existing useAppStore.js
  const theme = useAppStore((state) => state.theme || 'system')
  const textScale = useAppStore((state) => state.textScale || 100)
  const setTheme = useAppStore((state) => state.setTheme)
  const setTextScale = useAppStore((state) => state.setTextScale)

  // This helper updates the DOM directly for immediate feedback
  const updateVisuals = (newTheme, newScale) => {
    const root = document.documentElement

    // Update Theme
    root.classList.remove('light', 'dark', 'full-colour', 'high-contrast')
    root.classList.add(newTheme)

    // Update Font Scaling (100% = 16px)
    root.style.fontSize = `${(newScale / 100) * 16}px`
  }

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    updateVisuals(newTheme, textScale)
  }

  const handleScaleChange = (e) => {
    const newScale = parseInt(e.target.value)
    setTextScale(newScale)
    updateVisuals(theme, newScale)
  }

  return (
    <div className={styles.container}>
      {/* Appearance Section */}
      <section className={styles.section}>
        <h3>Appearance</h3>
        <div className={styles.buttonGrid}>
          {['light', 'dark', 'full-colour', 'high-contrast'].map((t) => (
            <button
              key={t}
              className={`${styles.themeButton} ${theme === t ? styles.active : ''}`}
              onClick={() => handleThemeChange(t)}
            >
              {t.replace('-', ' ')}
            </button>
          ))}
        </div>
      </section>

      {/* Text Scaling Section */}
      <section className={`${styles.section} ${styles.sliderContainer}`}>
        <div className={styles.labelRow}>
          <button
            className={styles.resetButton}
            onClick={() => handleScaleChange({ target: { value: 100 } })}
          >
            Reset
          </button>
        </div>
        <div className={styles.labelRow}>
          <p>Text Size: {textScale}%</p>
        </div>
        <input
          type='range'
          min='100'
          max='180'
          step='10'
          value={textScale}
          onChange={handleScaleChange}
          className={styles.rangeInput}
        />
        <p className={styles.hint}>
          Change your settings to your suit your visibity and accessibility
          needs
        </p>
      </section>
    </div>
  )
}

export default AccessibilitySettings
