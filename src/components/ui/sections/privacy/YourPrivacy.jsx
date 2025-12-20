import parse from "html-react-parser";
import { strings } from "@/data/config";
import './styles.scss';    
const YourPrivacy = () => {

    const context = 'privacy'

    const content = strings.activity.find(activity => activity.name === context) || null;
    if (content === null) {
        console.warn('No content found for activity "' + context + '"');
    }

    return (
        <div className="your-privacy">
            <h4>{parse(content?.title)}</h4>
            {content?.content?.map((html, i) => {
                return (
                    <p key={i}>{parse(html)}</p>
                )
            })}
        </div>
    )
}

export default YourPrivacy