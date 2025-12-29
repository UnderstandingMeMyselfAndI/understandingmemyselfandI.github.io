import fs from 'fs'
import path from 'path'

// import { fileURLToPath } from 'url'

export function simpleCopySync(filePathsFrom, filePathsTo, sourceDir, outputDir) {
	let successCount = 0

	filePathsFrom.forEach((filePath,i) => {
		try {
			const absoluteSourcePath = path.resolve(sourceDir, filePath)
			const destinationPath = path.join(outputDir, filePathsTo[i])

			// Check if source file exists
			if (!fs.existsSync(absoluteSourcePath)) {
				console.log(`❌ Source file not found: ${filePath}`)
				return
			}

			// Create destination directory recursively
			const destDir = path.dirname(destinationPath)
			if (!fs.existsSync(destDir)) {
				fs.mkdirSync(destDir, { recursive: true })
			}

			// Copy the file
			fs.copyFileSync(absoluteSourcePath, destinationPath)

			console.log(`✅ Copied: ${filePath}`)
			successCount++
		} catch (error) {
			console.log(`❌ Failed to copy ${filePath}:`, error.message)
		}
	})

	console.log(`📁 Successfully copied ${successCount}/${filePathsTo.length} files`)
}
