import './iconArrowDownThree.scss'
import './iconDec.css'
const IconArrowDownThree = ({ className = '', label = '' }) => {
  return (
    <div className={'icon-sml ' + className}>
      {label ? <div className='label'>{label}</div> : null}
      <div className='arrow-wrap'>
        <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#e3e3e3'>
          <path d='M480-120 226.15-373.85l27.54-27.53L460-195.31v-645.46h40v644.69l206.31-206.3 27.54 28.53L480-120Z' />
        </svg>
      </div>
    </div>
  )
}
export default IconArrowDownThree
