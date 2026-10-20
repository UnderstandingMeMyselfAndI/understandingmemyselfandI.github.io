import fs from 'fs'
import path from 'path'

import { fileURLToPath } from 'url'
import {
  red,
  green,
  grn,
  yellow,
  ylw,
  blue,
  blu,
  magenta,
  mgta,
  cyan,
  cyn,
  white,
  wht,
  reset,
  rst,
} from './src/utils/console-colors.js'
// import fse from "fs-extra";
const __dirname = path.dirname(fileURLToPath(import.meta.url))

function combineCSS(files, output) {
  console.log(wht + `\n Combining CSS files for: ` + rst)
  console.log(ylw + ` ${output} ` + rst)
  // console.log(wht + `--------------------------------------------` + rst);

  let combinedContent = ''
  let foundFiles = 0
  const outputFilePath = path.resolve(__dirname, output)
  // Ensure output directory exists
  const outputDir = path.dirname(outputFilePath)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
    console.log(`📁 Created directory: ${outputDir}`)
  }
  // check for the output file
  // if it doesn't exist, create it
  if (!fs.existsSync(outputFilePath)) {
    console.log(red + `\n 			*** Output file not found. *** ` + rst)
    console.log(wht + `* Creating:		${output}: `)
    console.log(`* Path:			${outputFilePath}: ` + rst)

    try {
      fs.writeFileSync(outputFilePath, ' ')
      //	console.log(ylw + `✓ Created: 		${output}` + rst);
      //	console.log(wht + `\n *** Output file created. ****\n` + rst);
    } catch (err) {
      console.error(red + `\n>>> ⚠️ Could not create file: ${output}`)
      console.error(`>>> ⚠️ Path: ${outputFilePath}`)
      console.error(`>>> ⚠️ Error: ${err}` + rst)
    }
  }

  files.forEach((file) => {
    const filePath = path.resolve(__dirname, file)
    //console.log(mgta + `\n- Checking:		${file}`);
    //console.log(`- Path:			${filePath}` + rst);

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8')
      //console.log(ylw + `✓ Found:		${file} , size: ${content.length} chars` + rst);
      combinedContent += content + '\n'
      foundFiles++
    } else {
      console.log(red + `\n>>> ✗ Missing: 	${file}`)
      console.log(`Path: 					${filePath}` + rst)
      console.log(`--------------------------------------------`)
    }
  })

  console.log(`			Found ${foundFiles}/${files.length} files\n`)

  if (combinedContent.trim()) {
    try {
      //console.log(mgta + `Writing: 		${output}` + rst);
      fs.writeFileSync(outputFilePath, combinedContent)
      //console.log(ylw + `✓ Wrote to file: 	${output}\n` + rst);
    } catch (err) {
      console.log(red + `\n>>> ⚠️ Could not write to: ${output}` + rst)
    }
  } else {
    console.log(red + `\n>>> ⚠️ No content to write for: ${output}` + rst)
  }

  console.log(wht + `--------------------------------------------` + rst)
}
//---------------------------------------
/**
 * Enhanced copy function with glob support
 * @param {string[]} patterns - Array of file paths or glob patterns
 * @param {string} sourceDir - Source directory
 * @param {string} outputDir - Destination directory
 * @param {Object} options - Optional settings
 */
//---------------------------------------

export function simpleCopySync(filePaths, sourceDir, outputDir) {
  let successCount = 0

  filePaths.forEach((filePath) => {
    try {
      const absoluteSourcePath = path.resolve(sourceDir, filePath)
      const destinationPath = path.join(outputDir, filePath)

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

      //console.log(`✅ Copied: ${filePath}`);
      successCount++
    } catch (error) {
      console.log(`❌ Failed to copy ${filePath}:`, error.message)
    }
  })

  console.log(`📁 Successfully copied ${successCount}/${filePaths.length} files`)
}
//---------------------------------------
//---------------------------------------
// Copy files Post Build
//---------------------------------------
// const filesToBeCopied = [[['./robots.txt'], './', './dist/']]
const filesToBeCopied = []
//---------------------------------------
filesToBeCopied.map((files) => {
  simpleCopySync(files[0], files[1], files[2])
})
//---------------------------------------
