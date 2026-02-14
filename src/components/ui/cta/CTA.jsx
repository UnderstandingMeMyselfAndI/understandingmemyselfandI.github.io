import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import Proptypes from 'prop-types'
import './stylesCTA.scss'
const CTA = ({ children, name = '', title = '', content = {}, open }) => {
  return (
    <div
      id={`${name}-cta`}
      className={`cta-${name} cta` + (open ? ' show' : '')}
    >
      <div className='inner'>
        {/* <ArrowOutwardIcon className='cta-icon' /> */}
        {title && (
          <u>
            <h3 className='title'>{parse(DOMPurify.sanitize(title))}</h3>
          </u>
        )}
        {content &&
          Array.isArray(content) &&
          content.map((part, i) => {
            return (
              <div className='cta-content' key={i}>
                <p>{parse(DOMPurify.sanitize(part))}</p>
              </div>
            )
          })}

        <div className='cta-buttons-wrapper'>{children}</div>
      </div>
    </div>
  )
}
CTA.propTypes = {
  name: Proptypes.string,
  title: Proptypes.string,
  content: Proptypes.object,
  children: Proptypes.node,
  open: Proptypes.bool,
}
CTA.displayName = 'CTA'
export default CTA
