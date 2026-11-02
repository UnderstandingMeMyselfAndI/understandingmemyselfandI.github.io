import './icon.scss'
// import './iconAppleInc.scss'
const IconDayView = ({ className = '' }) => {
  return (
    <div className={'icon icon-day-view' + className}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="48px" width="48px" fill="#fff"><path d="M7,38.77V36.5H41v2.27H7ZM7,11.5V9.23H41V11.5H7ZM9.88,30.6q-1.18,0-2.03-0.85T7,27.72V20.28q0-1.18 0.85-2.03T9.88,17.4H38.12q1.18,0 2.03,0.85T41,20.28v7.44q0,1.18-0.85,2.03T38.12,30.6H9.88Zm0-2.27H38.12q0.23,0 0.42-0.19t0.19-0.42V20.28q0-0.23-0.19-0.42t-0.42-0.19H9.88q-0.23,0-0.42,0.19T9.27,20.28v7.44q0,0.23 0.19,0.42t0.42,0.19ZM9.27,19.67q0,0 0,0.19t0,0.42v7.44q0,0.23 0,0.42t0,0.19q0,0 0-0.19t0-0.42V20.28q0-0.23 0-0.42t0-0.19Z"/></svg>      
        </div>
    </div>
  )
}
export default IconDayView
