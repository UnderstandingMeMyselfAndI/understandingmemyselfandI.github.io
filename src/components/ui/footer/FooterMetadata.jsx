import { useEffect, useState } from 'react';
import metadata from '@/src/metadata.json';
import { fetchVersionData, compareVersions } from '@/src/utils/checkVersion';
import './styles.css';
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
		<div className='version-footer'>
			&copy; {year} flpdigital.com
			<div className='sf-footer-version'>
				{`Version ${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision} `}
				{isUpdateAvailable && (
					<span className='update'> (Update available - go to settings)</span>
				)}
			</div>
		</div>
	);
}
export default FooterMetadata;
