import { useState } from 'react'
import SearchField from '@/components/ui/search/SearchField'
import Dialog from '@/components/ui/dialog/Dialog'
import lingo from '@/data/lingo.js'
import './styles.scss'
const Lingo = () => {
	const [showDialog, setShowDialog] = useState(false)
	const [content, setContent] = useState([])
	function getContent(id) {
		if (!id) return

		return lingo.find((item) => {
			if (item.id === id) return item.lingoFieldGroup
		})
	}

	const handleClick = (id) => {
		const search = getContent(id)
		if (search?.lingoFieldGroup?.description) {
			setContent(search)
			setShowDialog(true)
		}
	}
	return (
		<section className='search-lingo activity' id='lingo'>
			<Dialog
				show={showDialog}
				title={content?.title}
				instruction={content?.lingoFieldGroup?.description}
				confirmLabel='Close'
				onConfirm={() => setShowDialog(false)}
				showCancel={false}
				onClick={() => setShowDialog(false)}
			/>
			<h3>Lingo &amp; Phrases</h3>
			<SearchField handleClick={handleClick} />
		</section>
	)
}

export default Lingo
