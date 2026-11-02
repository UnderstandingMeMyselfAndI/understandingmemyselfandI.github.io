import './icon.scss'
import './icon-wheel.scss'
const IconWheel = ({ className = '' }) => {
  return (
    <div className={'icon icon-wheel' + className}>
      <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="48px" width="48px" fill="#fff"><path d="M23.23,40V25.87l-10,10l-1.1-1.1l10-10H8V23.23H22.18L12.13,13.22l1.1-1.06l10,10V8h1.54V22.17L34.78,12.16l1.06,1.06L25.83,23.23H40v1.54H25.84l10,10l-1.06,1.1L24.77,25.82V40H23.23Z"/></svg>
      </div>
    </div>
  )
}
export default IconWheel
