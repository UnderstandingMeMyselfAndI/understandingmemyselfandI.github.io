import './icon.scss'
const IconCloseSmallThin = ({ className = '' }) => {
  return (
    <div className={'icon icon-close-small-thin' + className}>
      <div>
       <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#fff"><path d="m302.69-270.31-32.38-32.38L447.62-480 270.31-656.31l32.38-32.38L480-511.38l176.31-177.31 32.38 32.38L511.38-480l177.31 177.31-32.38 32.38L480-447.62 302.69-270.31Z"/></svg>
      </div>
    </div>
  )
}
export default IconCloseSmallThin
