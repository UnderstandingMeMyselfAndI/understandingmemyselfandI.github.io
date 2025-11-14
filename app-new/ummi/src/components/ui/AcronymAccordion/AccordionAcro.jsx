import React from 'react';
import { Accordion } from 'radix-ui';
// import ButtonScenario from '../ui/buttons/ButtonScenario';
import ScenarioDialog from '../dialog/ScenarioDialog';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import './styles.css';
import './scenariosStyles.css?inline';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import data from '../../../data/data.js';
import Favourite from '../favourite/Favourite.jsx';

const AccordionDemo = () => {
	const showFavouriteData = localStorage.getItem('filterFavs');
	const favouriteData = data.filter((a) => {
		const idFromLocalStorage = localStorage.getItem(`favourite-item-${a.id}`);
		return idFromLocalStorage === 'true';
	});
	const displayData = showFavouriteData === 'true' ? favouriteData : data;
	return (
		<Accordion.Root
			className='AccordionRoot'
			type='single'
			defaultValue=''
			collapsible
		>
			{displayData.map((item) => (
				<Accordion.Item
					className='AccordionItem'
					key={item.id}
					value={'item-' + item.id}
				>
					<AccordionTrigger value={'item-' + item.id} className={item.title}>
						{item.title}
					</AccordionTrigger>
					<AccordionContent>{item.content}</AccordionContent>
					<div className='scenarios'>
						<div className='title'>Scenarios</div>
						<div className='scenariosGroup'>
							{item.scenarios.map((scenario, index) => (
								<ScenarioDialog
									btnLabel={scenario.btnLabel}
									title={scenario.title}
									content={scenario.content}
									key={'scenario-' + index}
								/>
							))}
						</div>
					</div>
				</Accordion.Item>
			))}
		</Accordion.Root>
	);
};

const AccordionTrigger = React.forwardRef(
	({ children, value, className, ...props }, forwardedRef) => (
		<Accordion.Header className='AccordionHeader'>
			<Accordion.Trigger
				className={classNames('AccordionTrigger ', className)}
				{...props}
				ref={forwardedRef}
			>
				<Favourite id={value} className={children.replaceAll('.', '')} />
				<div
					className={children.replaceAll('.', '') + ' AccordionTriggerTitle '}
				>
					{children}
				</div>
				<ChevronDownIcon className='AccordionChevron' aria-hidden />
			</Accordion.Trigger>
		</Accordion.Header>
	)
);

AccordionTrigger.propTypes = {
	className: PropTypes.string,
	value: PropTypes.string,
	children: PropTypes.node.isRequired,
};
AccordionTrigger.displayName = 'AccordionTrigger';

const AcronymFooter = React.forwardRef(
	({ children, className, ...props }, forwardedRef) => (
		<div
			className={classNames('AcronymFooter', className)}
			{...props}
			ref={forwardedRef}
		>
			{children}
		</div>
	)
);
AcronymFooter.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};
AcronymFooter.displayName = 'AcronymFooter';

const AccordionContent = React.forwardRef(
	({ children, className, ...props }, forwardedRef) => (
		<Accordion.Content
			className={classNames('AccordionContent', className)}
			{...props}
			ref={forwardedRef}
		>
			<>
				<div className='AccordionContentText'>
					<div
						className='AcronymDefinition'
						dangerouslySetInnerHTML={{ __html: children.explanation }}
					/>

					<div className='AcronymContainer'>
						{children?.acronyms?.map((acronym, index) => (
							<div className='Acronym-part' key={index}>
								<div className='Acronym-letter-group'>
									{/* <div className='Acronym-letter'>{acronym.letter}</div> */}
									<div
										className='Acronym-letter-meaning'
										dangerouslySetInnerHTML={{ __html: acronym.meaning }}
									/>
								</div>
								<div
									className='Acronym-definition'
									dangerouslySetInnerHTML={{ __html: acronym.definition }}
								/>
							</div>
						))}
					</div>
				</div>
			</>
		</Accordion.Content>
	)
);
AccordionContent.propTypes = {
	className: PropTypes.string,
	children: PropTypes.object,
};

AccordionContent.displayName = 'AccordionContent';

// const AccordionItemFavourite = ({ id }) => {
// 	const [favourite, setFavourite] = React.useState(() => {
// 		const storedFavourite = localStorage.getItem(`favourite-${id}`);
// 		return storedFavourite; // === 'true';
// 	});

// 	const imgSrc = favourite ? starFilled : starOutline;
// 	const imgClassName = favourite ? 'favourite chosen' : 'favourite';

// 	React.useEffect(() => {
// 		const storedFavourite = localStorage.getItem(`favourite-${id}`);
// 		if (storedFavourite !== null) {
// 			setFavourite(storedFavourite === 'true');
// 		}
// 	}, [id]);

// 	const handleClick = (e) => {
// 		e.stopPropagation();
// 		const newFavourite = !favourite;
// 		localStorage.setItem(`favourite-${id}`, newFavourite.toString());
// 		setFavourite(newFavourite);
// 	};

// 	return (
// 		<div className='AccordionItemFavourite' onClick={handleClick}>
// 			<img src={imgSrc} className={imgClassName} alt='starOutline' />
// 		</div>
// 	);
// };
// AccordionItemFavourite.propTypes = {
// 	id: PropTypes.string,
// };
// AccordionItemFavourite.displayName = 'AccordionItemFavourite';

export default AccordionDemo;
