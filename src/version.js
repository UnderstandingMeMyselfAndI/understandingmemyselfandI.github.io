export const getBuildMetadata = () => {
	if (typeof __BUILD_METADATA__ !== "undefined") {
		return __BUILD_METADATA__; // Injected by Vite in both client + SW
	}
	// Fallback (should never happen)
	return {buildMajor: 0, buildMinor: 0, buildRevision: 0, buildTag: "dev"};
};
