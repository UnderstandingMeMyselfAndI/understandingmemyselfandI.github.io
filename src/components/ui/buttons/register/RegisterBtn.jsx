import "./buttonStyles.css";
import PropTypes from "prop-types";

const LoginBtn = ({ handleClick }) => {
    
    
    return (
        <button className={"login btn" } onClick={handleClick} >Login</button>
    );
};
LoginBtn.propTypes = {	
	handleClick: PropTypes.func.isRequired,	
}
LoginBtn.displayName = 'LoginBtn'
export default LoginBtn
