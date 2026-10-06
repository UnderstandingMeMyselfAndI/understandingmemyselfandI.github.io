import './icon.scss'
const IconPlusThinSq = ({ className = '' }) => {
  return (
    <div className={'icon-sml ' + className}>
      <div>
        <svg fill='#fff' xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 -0.5 21 21'>
          <path fillRule='evenodd' d='M21 9v2h-9.45v9h-2.1v-9H0V9h9.45V0h2.1v9z' />
        </svg>
      </div>
    </div>
  )
}
export default IconPlusThinSq
