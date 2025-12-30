import { useEffect } from 'react'

function useLoadScript(src, options = {}) {
	const { onLoad, onError, ...scriptAttributes } = options

	useEffect(() => {
		const script = document.createElement('script')
		script.src = src
		script.async = true

		// Set additional attributes
		Object.keys(scriptAttributes).forEach((key) => {
			script[key] = scriptAttributes[key]
		})

		// Event handlers
		if (onLoad) script.onload = onLoad
		if (onError) script.onerror = onError

		document.body.appendChild(script)

		return () => {
			document.body.removeChild(script)
		}
	}, [src, onLoad, onError, scriptAttributes])
}

export default useLoadScript