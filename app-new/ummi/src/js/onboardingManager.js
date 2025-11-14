// onboardingManager.js
let onboardingInitialized = false;
let onboardingInstance = null;

export const initOnboarding = async () => {
	if (onboardingInitialized) return onboardingInstance;

	// Dynamically import the onboarding to avoid immediate execution
	const onboardingModule = await import("./onboarding.js");
	onboardingInstance = onboardingModule.default;
	onboardingInitialized = true;

	console.log("Onboarding initialized");
	return onboardingInstance;
};

export const startOnboarding = async () => {
	const onboarding = await initOnboarding();
	if (onboarding) {
		onboarding.drive();
	}
};
