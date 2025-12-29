import { exec } from 'child_process'
import { promisify } from 'util'
// import fs from 'fs'
// import path from 'path'

const execAsync = promisify(exec)
let buildCount = 0

export default function createPostBuildPlugin() {
	let rebuildTimeout = null
	let isBuilding = false

	return {
		name: 'wordpress-theme-reload',



		async writeBundle(options, bundles) {
			if (isBuilding) return

			isBuilding = true
			buildCount++

			try {
				console.log(`\n🔄 [Build #${buildCount}] Running post-build script...`)
				const { stdout, stderr } = await execAsync('node vite.post-build.js')

				if (stdout.trim()) console.log('📝 Post-build output:', stdout)
				if (stderr.trim()) console.error('⚠️ Post-build warnings:', stderr)
				console.log('✅ Post-build script completed')
			} catch (error) {
				console.error('❌ Post-build script failed:', error)
			} finally {
				isBuilding = false
			}
		},

		
	}
}
