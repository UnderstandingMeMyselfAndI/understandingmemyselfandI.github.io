import InstallPWA from "ui/buttons/InstallPWA/InstallPWA";
import parse from "html-react-parser";
import { strings } from "@/data/config";
import './styles.scss';
const InstallCTA = () => {

    const content = strings.activity.find(activity => activity.name === 'install') || null;
    if (content === null) {
        console.warn('No content found for activity "daysCounter"');
    }

    return (      

    <div className="installCTA cta">
 
        <div className="title"><span>{content?.cta?.title}</span></div>
        {content?.cta?.content?.map((html, i) => {
            return (
                <p key={i}>{parse(html)}</p>
            )
        })}
        <InstallPWA />
    </div>)

    
}

export default InstallCTA