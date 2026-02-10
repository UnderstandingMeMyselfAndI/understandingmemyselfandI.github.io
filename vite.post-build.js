import fs from 'fs';
import path from 'path';

/**
 * Creates a 404.html copy of index.html.
 * This ensures that when a user hits a dynamic route (e.g., /recovery-tool/my-slug) 
 * on a fresh visit, the server returns the SPA shell instead of a 404 error.
 */
export function createSpaFallback(outputDir) {
    const indexPath = path.resolve(outputDir, 'index.html');
    const fallbackPath = path.resolve(outputDir, '404.html');

    try {
        if (fs.existsSync(indexPath)) {
            fs.copyFileSync(indexPath, fallbackPath);
            console.log('✅ Created 404.html fallback from index.html');
        } else {
            console.error(`❌ Could not find index.html at: ${indexPath}`);
        }
    } catch (error) {
        console.error('❌ Failed to create 404.html:', error.message);
    }
}

/**
 * Existing utility for manual file transfers.
 */
export function simpleCopySync(filePathsFrom, filePathsTo, sourceDir, outputDir) {
    let successCount = 0;
    filePathsFrom.forEach((filePath, i) => {
        try {
            const absoluteSourcePath = path.resolve(sourceDir, filePath);
            const destinationPath = path.resolve(outputDir, filePathsTo[i]);

            if (!fs.existsSync(absoluteSourcePath)) return;

            const destDir = path.dirname(destinationPath);
            if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

            fs.copyFileSync(absoluteSourcePath, destinationPath);
            successCount++;
        } catch (error) {
            console.error(`❌ Error copying ${filePath}:`, error.message);
        }
    });
    console.log(`📁 Successfully copied ${successCount}/${filePathsTo.length} extra files`);
}

// Configuration based on your vite.config.js
const outDir = './docs'; 

console.log('🚀 Running Post-Build Tasks...');
createSpaFallback(outDir);