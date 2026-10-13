import './icon.scss'

const IconDesktop = ({ className = '', svg }) => {
  if (!svg) console.trace('No SVG nopde provided to Icon.jsx')
  return (
    <div className={'custom icon ' + className}>
      <div>{svg}</div>
    </div>
  )
}
export default IconDesktop
