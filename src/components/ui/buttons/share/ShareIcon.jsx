import { useState, useEffect } from 'react';
// import androidIcon from '../../assets/share_android.svg';
// import iosIcon from '../../assets/share_apple.svg';
import ShareIconAndroid from './ShareIconAndroid';
import ShareIconApple from './ShareIConApple';

const ShareIcon = () => {
	const [isAndroid, setIsAndroid] = useState(false);
	const [isIOS, setIsIOS] = useState(false);

	useEffect(() => {
		const userAgent = navigator.userAgent;
		const isAndroid = userAgent.match(/Android/i);
		const isIOS = userAgent.match(/iPhone|iPad|iPod/i);

		setIsAndroid(isAndroid);
		setIsIOS(isIOS);
	}, []);

	return (
		<div>
			{isAndroid && (
				<div dangerouslySetInnerHTML={{ __html: ShareIconAndroid }} />
			)}
			{isIOS && <div dangerouslySetInnerHTML={{ __html: ShareIconApple }} />}
			{isAndroid === null && isIOS === null && (
				<div dangerouslySetInnerHTML={{ __html: ShareIconAndroid }} />
			)}
		</div>
	);
};
export default ShareIcon;
