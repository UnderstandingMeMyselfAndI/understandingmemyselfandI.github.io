import {useEffect, useState} from "react";
import metadata from "@/metadata.json";
import {fetchVersionData, compareVersions} from "@/utils/checkVersion";
import "./styles.scss";
function FooterMetadata() {
	//const [remoteVersion, setRemoteVersion] = useState(null);
	const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

	useEffect(() => {
		const fetchAndCompareVersions = async () => {
			const remoteVersionData = await fetchVersionData();
			if (remoteVersionData) {
				//setRemoteVersion(remoteVersionData);

				setIsUpdateAvailable(compareVersions(remoteVersionData, metadata));
			}
		};
		fetchAndCompareVersions();
	}, []);

	const year = new Date().getFullYear();

	return (
		<div className="version-footer">
			&copy; {year} <span className="ummi">Ummi</span>
			<div className="sf-footer-version">
				{`Version ${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision} ${metadata.buildTag}  `}
				{isUpdateAvailable && <span className="update"> (Update available - go to settings)</span>}
			</div>
		</div>
	);
}
export default FooterMetadata;
