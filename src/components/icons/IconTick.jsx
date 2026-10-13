import './icon.scss'

const IconTick = ({ className = '' }) => {
  return (
    <div className={'icon icon-tick' + className}>
      <div>
        <svg xmlns='http://www.w3.org/2000/svg' height='80px' viewBox='0 -960 960 960' width='80px' fill='#ffffff'>
          <path d='M400-318 247-471l42-42 111 111 271-271 42 42-313 313Z' />
        </svg>
      </div>
    </div>
  )
}
export default IconTick
