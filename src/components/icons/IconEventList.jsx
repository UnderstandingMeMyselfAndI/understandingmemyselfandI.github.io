import './icon.scss'
// import './iconAppleInc.scss'
const IconEventList = ({ className = '' }) => {
  return (
    <div className={'icon icon-event-list' + className}>
      <div>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="48px" width="48px" fill="#fff"><path d="M31.62,41q-1.23,0-2.11-0.89T28.62,38V29.62q0-1.23 0.89-2.11t2.11-0.89H40q1.23,0 2.11,0.89T43,29.62V38q0,1.23-0.89,2.11T40,41H31.62Zm-0.73-2.27h9.85V28.88H30.88v9.85ZM5,34.94V32.67H22.23v2.27H5ZM31.62,21.38q-1.23,0-2.11-0.89t-0.89-2.11V10q0-1.23 0.89-2.11T31.62,7H40q1.23,0 2.11,0.89T43,10v8.38q0,1.23-0.89,2.11T40,21.38H31.62Zm-0.73-2.27h9.85V9.27H30.88v9.85ZM5,15.33V13.06H22.23v2.27H5ZM35.81,33.81Zm0-19.62Z"/></svg>    
        </div>
    </div>
  )
}
export default IconEventList
