import './icon.scss'
// import './iconAppleInc.scss'
const IconCalendarViewDay = ({ className = '' }) => {
  return (
    <div className={'icon icon-calendar-view-day' + className}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="48px" width="48px" fill="#fff"><path d="M9.88,32.89q-1.18,0-2.03-0.85T7,30V18q0-1.18 0.85-2.03t2.03-0.85H38.12q1.18,0 2.03,0.85T41,18V30q0,1.18-0.85,2.03t-2.03,0.85H9.88Zm0-2.27H38.12q0.23,0 0.42-0.19T38.73,30V18q0-0.23-0.19-0.42t-0.42-0.19H9.88q-0.23,0-0.42,0.19T9.27,18V30q0,0.23 0.19,0.42t0.42,0.19ZM7,9.88V7.62H41V9.88H7Zm0,30.5V38.12H41v2.27H7Zm2.27-23q0,0 0,0.17t0,0.44V30q0,0.27 0,0.44t0,0.17q0,0 0-0.17t0-0.44V18q0-0.27 0-0.44t0-0.17Z"/></svg>   
        </div>
    </div>
  )
}
export default IconCalendarViewDay
