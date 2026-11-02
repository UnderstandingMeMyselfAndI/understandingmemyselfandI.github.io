import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import Proptypes from 'prop-types'
import './stylesCTA.scss'
const CTA = ({ children, name = '', title = '', content = {} }) => {
  return (
    <div
      id={`${name}-cta`}
      className={`cta-${name} cta`}
    >
      <div className='cta__inner'>
        {title && (     
          <h3 className='cta__title'>{parse(DOMPurify.sanitize(title))}</h3>
          
        )}
        {content &&
          Array.isArray(content) &&
          content.map((part, i) => {
            return (
              <div className='cta__content' key={i}>
                <p>{parse(DOMPurify.sanitize(part))}</p>
              </div>
            )
          })}

        <div className='cta__buttons-wrapper'>{children}</div>
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
