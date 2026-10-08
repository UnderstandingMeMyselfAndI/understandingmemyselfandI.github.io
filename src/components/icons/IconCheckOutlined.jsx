import './icon.scss'
const IconCheckOutlined = ({ className = '' }) => {
  return (
    <div className={'icon icon-checked-outline' + className}>
      <div>
        <svg height='48px' viewBox='0 -960 960 960' width='48px' fill='#ffffff'>
          <path d='m381-239.17 446-446L782-730 381.17-329 179-531l-45 45 247 246.83Zm0 89.67L44.5-486 179-620.67l202 202 401.17-401L916.83-685 381-149.5Z' />
        </svg>
      </div>
    </div>
  )
}
export default IconCheckOutlined
