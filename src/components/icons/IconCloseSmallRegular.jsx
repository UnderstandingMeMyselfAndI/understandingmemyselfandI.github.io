import './icon.scss'
const IconCloseSmallRegular = ({ className = '' }) => {
  return (
    <div className={'icon icon-close-small-regular + className}>
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#fff"><path d="m300-258-42-42 180-180-180-179 42-42 180 180 179-180 42 42-180 179 180 180-42 42-179-180-180 180Z"/></svg>
      </div>
    </div>
  )
}
export default IconCloseSmallRegular
