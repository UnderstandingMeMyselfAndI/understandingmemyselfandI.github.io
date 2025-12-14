

import MoreTimeIcon from '@mui/icons-material/MoreTime';
import useAppStore from '@/store/useAppStore';

import "./styles.scss";
const DaysCounterBtn = () => {

    const setActivity = useAppStore(state => state.setActivity);

    const handleClick = () => {		
        
        console.log("handleClick");
        setActivity(2);
	};
	return (
		
        <button onClick={() => handleClick()} className="days-counter btn" aria-label="Days Counter">
            <MoreTimeIcon className="icon" />
            <div>Days Counter</div>
        </button>		
		
	);
};
DaysCounterBtn.propTypes = {
	
};
export default DaysCounterBtn;
