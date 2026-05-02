export const getBuildMetadata = () => {
	if (typeof __BUILD_METADATA__ !== "undefined") {

	return {buildMajor: 1, buildMinor: 0, buildRevision: 17, buildTag: "Production"};
};
