export const getBuildMetadata = () => {
	if (typeof __BUILD_METADATA__ !== "undefined") {

	return {buildMajor: 0, buildMinor: 80, buildRevision: 17, buildTag: "Beta"};
};
