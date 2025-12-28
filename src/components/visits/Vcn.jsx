import { useEffect } from 'react'
import useAppStore from '@/store/useAppStore'

const Vcn = () => {
	// increment visit count
	

	// // increment visit count
	const incVC = useAppStore((s) => s.incVC)
	incVC();


	const date = new Date()
	const secondsSinceEpoch = Math.floor(date.getTime() / 1000)

	// // set last visit date
	const setLVD = useAppStore((s) => s.setLVD)
	setLVD(secondsSinceEpoch)

	const setFVD = useAppStore((s) => s.setFVD)
	setFVD(secondsSinceEpoch)
	
	return (<> </>)
}

export default Vcn
