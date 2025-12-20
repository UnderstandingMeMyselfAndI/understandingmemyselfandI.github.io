import DaysCounterBtn from "ui/buttons/daysCounter/daysCounterBtn";
import parse from "html-react-parser";
import { strings } from "@/data/config";
import './stylesCTA.scss';    
const DaysCounterCTA = () => {

    const content = strings.activity.find(activity => activity.name === 'daysCounter') || null;
    if (content === null) {
        console.warn('No content found for activity "daysCounter"');
    }

    return (
        <div className="daysCounterCTA cta ">
            <div className="title"><span>{content?.cta?.title}</span></div>
            {content?.cta?.content?.map((html, i) => {
                return (
                    <p key={i}>{parse(html)}</p>
                )
            })}
            <DaysCounterBtn />
        </div>
    )
}

export default DaysCounterCTA