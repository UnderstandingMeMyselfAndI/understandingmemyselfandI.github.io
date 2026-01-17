import {useEffect, useState} from "react";
import useAppStore from "@/store/useAppStore";
import { activities } from "@/data/config";
import podcastsData from "data/podcasts";
import PodcastsOutlinedIcon from '@mui/icons-material/PodcastsOutlined';
import './styles.scss';

// import PropTypes from "prop-types";
const Podcasts = () => {
    const [open, setOpen] = useState(true);
   
    
    const data = podcastsData[0].data.podcasts.nodes.slice().reverse();
    // const activity = useAppStore(s => s.activity);

    // const activityID = activities.find(activity => (activity.url === "tools" ? activity.id : null));
    return (
        <section id="podcasts" className={"activity podcasts" + (open ? " show" : " ")}>
            <h2><u>Podcasts</u></h2>
            <p>The following podcasts are available on Spotify. Following a link will take you to the podcast.</p>
            {data.map((podcast, i) => {
                return (
                    <div className={"podcast"} key={i}>
                        <a href={podcast.podcastsFieldGroup.url} target="_blank" rel="noreferrer">
                            <PodcastsOutlinedIcon className="icon" />
                        <div><img src={`./podcasts/${podcast.podcastsFieldGroup.imageName}`} alt={podcast.title} className="podcast-image" /></div>
                        <div className="podcast-title">
                            {podcast.title}
                        </div>
                        
                    </a>
                </div>)
            })}
        </section>
    )
}
export default Podcasts