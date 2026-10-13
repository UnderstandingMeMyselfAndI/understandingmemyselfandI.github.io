import './iconArrowDownwardLong.css'
import './icon.css'
const IconArrowDownwardLong = ({ className = '' }) => {
  return (
    <div className={'icon icon-arrow-down-long' + className}>
      <div>
        <svg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 -960 960 960' width='48px' fill='#ffffff'>
          <path d='M479.77-267.69 266.46-480.23l22-22.23 176.16 173.92v-410h30.76v411.23l174.93-174.92 22 22-212.54 212.54Z' />
        </svg>
      </div>
    </div>
  )
}
export default IconArrowDownwardLong
