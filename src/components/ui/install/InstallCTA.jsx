import InstallPWA from "ui/buttons/InstallPWA/InstallPWA";
import appleShareIcon from 'public/icons/apple-share-white-40x40.png'
import appleAddToHomescreen from 'public/icons/apple-add-to-homescreen-white-40x40.png'
import parse from "html-react-parser";
import { strings } from "@/data/config";
import './styles.scss';
const InstallCTA = () => {

    const content = strings.activity.find(activity => activity.name === 'install') || null;
    if (content === null) {
        console.warn('No content found for activity "daysCounter"');
    }

    const appleUsersContent = 'Tap the <b><u>Share icon</u></b></b>'
		const appleUsersContent2 = '<br />on your device and then select <b><u>Add to Home Screen</u></b>'
    return (
			<div className='installCTA cta' id='install'>
				<h3>
					<u>
						<span>{content?.cta?.title}</span>
					</u>
				</h3>

				{content?.cta?.content?.map((html, i) => {
					return <p key={i}>{parse(html)}</p>
				})}
				<InstallPWA />
				<div className='title'>Apple users:</div>
				<p>
					<span>{parse(appleUsersContent)}</span>
					<img src={appleShareIcon} className='shareIcon' alt='apple share icon' />
					<span>{parse(appleUsersContent2)}</span>
					<img src={appleAddToHomescreen} className='homescreenIcon' alt='apple add to homescreen icon' />
				</p>
			</div>
		)

    
}

export default InstallCTA