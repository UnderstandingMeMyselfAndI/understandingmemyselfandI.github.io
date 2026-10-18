import useAppStore from '@store/useAppStore'
import CloseBtn from '@buttons/close/CloseBtn'
import PropTypes from 'prop-types'
import './styles.scss'

const Template = ({ children }) => {
  const componentName = 'name-to-go-here'
  const setActivity = useAppStore((s) => s.setActivity)

  const handleClose = () => setActivity(-1)

  return (
    <div id={componentName} className={`activity activity-${componentName}`}>
      <CloseBtn onClick={handleClose} />
      <section className={componentName}>{children}</section>
    </div>
  )
}
Template.propTypes = {
  children: PropTypes.node,
}

export default Template
