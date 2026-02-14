import { exportData, importData } from '../utils/secureStorage'

export async function exportBackup(storeName) {
  const blob = await exportData(storeName)
  const file = new Blob([blob], { type: 'application/json' })
  const url = URL.createObjectURL(file)
  const a = document.createElement('a')
  a.href = url
  a.download = `${storeName}-backup.json`
  a.click()
}

export async function importBackup(storeName, file) {
  const raw = await file.text()
  await importData(storeName, raw)
}
