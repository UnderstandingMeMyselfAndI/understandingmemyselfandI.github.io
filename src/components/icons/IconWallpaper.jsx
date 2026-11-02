import './icon.scss'
const IconWallpaper = ({ className = '' }) => {
  return (
    <div className={'icon icon-wallpaper' + className}>
      <div>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="48px" width="48px" fill="#fff"><path d="M9.88,41q-1.18,0-2.03-0.85T7,38.12V25.63H9.27V38.12q0,0.23 0.19,0.42t0.42,0.19H22.37V41H9.88Zm15.75,0V38.73H38.12q0.23,0 0.42-0.19t0.19-0.42V25.63H41V38.12q0,1.18-0.85,2.03T38.12,41H25.63ZM13.39,33.95l4.9-6.29l4.09,5.37l6.06-7.7l6.47,8.63H13.39ZM7,22.37V9.88Q7,8.71 7.85,7.85T9.88,7H22.37V9.27H9.88q-0.23,0-0.42,0.19T9.27,9.88V22.37H7Zm31.73,0V9.88q0-0.23-0.19-0.42T38.12,9.27H25.63V7H38.12q1.18,0 2.03,0.85T41,9.88V22.37H38.73Zm-9.48-3.62q-0.69-0.69-0.69-1.7t0.69-1.7t1.7-0.69t1.7,0.69t0.69,1.7t-0.69,1.7t-1.7,0.69t-1.7-0.69Z"/></svg>
      </div>
    </div>
  )
}
export default IconWallpaper
