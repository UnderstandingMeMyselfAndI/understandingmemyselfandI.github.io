// --------------------------------------------------------------------------
// https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/06
// --------------------------------------------------------------------------


async function publishPostOnConnected(post) {
	const registration = await navigator.serviceWorker.ready;
	try {
		// First, you should write a code to save to IndexedDB the data you want to send later. It's a good idea to have this function ready for multiple posts published while offline.
		await savePost(post);

		// Then, the sync registration itself. We give it a name because we can have multiple syncs for various parts of the app functionality:
		await registration.sync.register("sync-post");

		// Finally, you can inform the user about it:
		showNotification("Your post will be published automatically right after connection is restored. It is safe to close the app.");
	} catch {
		console.error("Background Sync registration failed");
	}
}

async function publishSavedPostData(post) {
	// iterate over saved data
}
// feature detection
if ("serviceWorker" in navigator && "SyncManager" in window) {
	publishPostOnConnected(post);
} else {
	console.log("Background Sync is not supported");
}
// --------------------------------------------------------------------------
// Implement in service workwr
// --------------------------------------------------------------------------
// code for service worker

self.addEventListener("sync", event => {
	if (event.tag === "sync-post") {
		event.waitUntil(
			// You have to implement the function that iterates over the preserved posts and sends them:
			publishSavedPostData()
		);
	}
});
// --------------------------------------------------------------------------
// Periodic synchronization
// --------------------------------------------------------------------------

async function registerPeriodicFeedUpdate() {
  const registration = await navigator.serviceWorker.ready;

  // Query and check permission. See "Privacy and resource utilization considerations" section below.
  const status = await navigator.permissions.query({
    name: 'periodic-background-sync',
  });
  if (status.state !== 'granted') {
    console.log('Periodic Background Sync is not granted.');
    return;
  }

  try {
    await registration.periodicSync.register('update-feed-content', {
      minInterval: 24 * 60 * 60 * 1000, // We ask browser to run the sync no more than once a day
    });
    showNotification('Success! Feed will be updated in the background.');

  } catch() {
    console.error('Periodic Background Sync registration failed');
  }
}
// Like always in PWA, feature detection is a best practice:

if ('serviceWorker' in navigator && 'PeriodicSyncManager' in window) {
  registerPeriodicFeedUpdate();
} else {
  console.log('Periodic Background Sync is not supported');
}

// --------------------------------------------------------------------------
// Implement in service workwr
// --------------------------------------------------------------------------
// In the service worker, you should listen and react to the periodicsync event named update-feed-content:

self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-feed-content') {
      event.waitUntil(

        // You have to implement the function that fetches the latest posts and updates the storage:
        updateFeedContent()
      );
  }
});

// --------------------------------------------------------------------------
// Notify users of updates
// --------------------------------------------------------------------------
// https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/07


//// Check if the API is supported
if ('setAppBadge' in navigator) {
    navigator.setAppBadge(2).catch((error) => {
        // Code to handle an error
    });
}
// To remove a badge:

navigator.clearAppBadge()
or

navigator.setAppBadge(0)