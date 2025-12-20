import parse from "html-react-parser";
import { activities ,strings} from "@/data/config";

import './styles.scss';

const PrivacyPolicy = () => {
    const content = strings.activity.find(activity => activity.name === 'introduction') || null;
	if (content === null) {
		console.warn('No content found for activity "introduction"');
	}
    return (
        <div className="yourData">
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
export default PrivacyPolicy;