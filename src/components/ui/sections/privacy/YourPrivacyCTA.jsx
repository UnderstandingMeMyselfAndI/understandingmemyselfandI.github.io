import parse from "html-react-parser";
import { strings } from "@/data/config";
import useAppStore from "@/store/useAppStore";
import './styles.scss';    
const YourPrivacyCTA = () => {

    const context = 'privacy'
    const setActivity = useAppStore(s => s.setActivity);

    const content = strings.activity.find(activity => activity.name === context) || null;
    if (content === null) {
        console.warn('No content found for activity "' + context + '"');
    }

    const handleClick = () => {
        console.log("YourPrivacyCTA handleClick");
        setActivity(10);
        
        
    };  

    return (
        <section className="your-privacy cta">
            <h4>{parse(content?.title)}</h4>
            {content?.cta?.content?.map((html, i) => {
                return (
                    <p key={i}>{parse(html)}</p>
                )
            })}
            <button className="btn" onClick={() => handleClick()} >{content?.cta?.btnLabel}</button>
            
        </section>
    )
}

export default YourPrivacyCTA