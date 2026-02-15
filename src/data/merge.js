// Helper function to convert PascalCase to kebab-case (if not already available)
function pascalToKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// Import from your config
import { baseActivities, strings } from './config.js';

// Function to find the best matching activity from strings.activity
function findMatchingActivity(url, activityArray) {
  const normalizedUrl = url.replace('#', '').toLowerCase();
  let match = activityArray.find(s => {
    const sUrl = s?.url?.replace('#', '').toLowerCase();
    const sNameKebab = pascalToKebab(s.name).toLowerCase();
    return normalizedUrl === sUrl || normalizedUrl === sNameKebab;
  });

  // Handle specific mismatches manually for better coverage
  if (!match) {
    if (normalizedUrl === 'privacy-policy') {
      match = activityArray.find(s => s.name.toLowerCase() === 'privacy');
    } else if (normalizedUrl === 'wallpaper-gallery') {
      match = activityArray.find(s => s.name.toLowerCase() === 'wallpapers');
    }
  }

  return match;
}

// Merge the arrays: Start with baseActivities, add matching data from strings.activity
const mergedActivities = baseActivities.map(activity => {
  const matchingStringActivity = findMatchingActivity(activity.url, strings.activity);
  return {
    ...activity,
    ...(matchingStringActivity || {}),  // Spread in the matching data (or empty if no match)
    icon: null,  // As per your original mapping
  };
});

// Optional: Add any unmatched items from strings.activity to the end (with no id/menu/etc.)
const unmatchedStrings = strings.activity.filter(s => 
  !mergedActivities.some(m => m.url === s.url || m.name === s.name)
);
const finalMergedActivities = [
  ...mergedActivities,
  ...unmatchedStrings.map(s => ({
    ...s,
    id: null,  // No id for extras
    menu: false,
    modal: false,
    conditions: [],
    icon: null,
  }))
];

// Log the result (Node-friendly)
console.log('Merged Activities (first few for preview):', JSON.stringify(mergedActivities.slice(0, 3), null, 2));
console.log('\nFull Final Merged Activities length:', finalMergedActivities.length);

// If you want to write to a file (optional)
import { writeFileSync } from 'fs';
writeFileSync('merged-activities.json', JSON.stringify(finalMergedActivities, null, 2));
console.log('\nExported to merged-activities.json');