import metadata from '@src/metadata.json'
import './styles.scss'

function FooterMetadata() {
  const buildMajor = metadata ? (metadata.buildMajor ? metadata.buildMajor : '') : ''
  const buildMinor = metadata ? (metadata.buildMinor ? metadata.buildMinor : '') : ''
  const buildRevision = metadata ? (metadata.buildRevision ? metadata.buildRevision : '') : ''

  const year = new Date().getFullYear()

  return (
    <div className='version-footer'>
      &copy; {year} <span className='ummi'>Ummi</span>
      <div className='sf-footer-version'>{`Version ${buildMajor}.${buildMinor}.${buildRevision}`}</div>
    </div>
  )
}
export default FooterMetadata
