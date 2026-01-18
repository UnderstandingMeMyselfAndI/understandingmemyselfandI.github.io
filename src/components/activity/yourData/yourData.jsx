import parse from "html-react-parser";
import { activities ,strings} from "@/data/config";

import './styles.scss';

const YourData = () => {
    const name = 'yourData'
    const content = strings.activity.find(activity => activity.name === name) || null;
	if (content === null) {
		console.warn(`No content found for activity "${name}"`);
	}
    return (
        <div id="your-data"className="activity yourData">
            <h2><u>{content.title}</u></h2>
            {content?.content?.map((html, i) => {
                return (
                    <div key={i}>
                        <p>{parse(html)}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default YourData;