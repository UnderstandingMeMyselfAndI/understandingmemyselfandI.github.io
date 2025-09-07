// Create a function to fetch the version data from the remote server
const fetchVersionData = async () => {
	try {
		const response = await fetch(
			'https://UnderstandingMeMyselfAndI.github.io/metadata.json'
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching version data:', error);
		return null;
	}
};

// Create a function to compare the versions
const compareVersions = (remoteVersion, localVersion) => {
	const remoteVersionArray = [
		remoteVersion.buildMajor,
		remoteVersion.buildMinor,
		remoteVersion.buildRevision,
	];
	const localVersionArray = [
		localVersion.buildMajor,
		localVersion.buildMinor,
		localVersion.buildRevision,
	];
	for (let i = 0; i < 3; i++) {
		if (remoteVersionArray[i] > localVersionArray[i]) {
			return true; // Remote version is newer
		} else if (remoteVersionArray[i] < localVersionArray[i]) {
			return false; // Local version is newer
		}
	}

	// If we reach this point, the versions are the same
	return false;
};
export { fetchVersionData, compareVersions };
