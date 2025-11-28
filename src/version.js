export const getBuildMetadata = () => {
	if (typeof __BUILD_METADATA__ !== "undefined") {

	return {buildMajor: 0, buildMinor: 30, buildRevision: 60, buildTag: "Beta"};
};
