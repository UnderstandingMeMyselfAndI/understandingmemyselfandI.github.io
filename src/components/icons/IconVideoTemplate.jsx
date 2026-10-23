import './icon.scss'
const IconVideoTemplate = ({ className = '' }) => {
  return (
    <div className={'icon icon-video-template ' + className}>
      <div>
        <svg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 -960 960 960' width='48px' fill='#fff'>
          <path d='M138.85-60v-125.77h45.38v80.38h591.54v-80.38h45.38V-60h-682.3ZM100-258.85v-442.69h760v442.69H100Zm313.23-121.23L580.46-480 413.23-580.54v200.46ZM138.85-774.62V-900h682.3v125.38h-45.38v-79.99H184.23v79.99h-45.38Zm6.54 470.39h669.22v-351.92H145.39v351.92ZM480-480Z' />
        </svg>
      </div>
    </div>
  )
}
export default IconVideoTemplate
