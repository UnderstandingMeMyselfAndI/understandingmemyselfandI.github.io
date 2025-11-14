'use client';
import React, { useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import './styles.css';
const storageKey = 'filterFavs';

const getStoredValue = () => {
	return localStorage.getItem(storageKey);
};
export function CheckboxFilterFavourites() {
	const isChecked = getStoredValue() === 'true' ? true : false;

	const [checked, setChecked] = React.useState(isChecked);
	useEffect(() => {
		localStorage.setItem(storageKey, checked.toString());
	}, [checked]);

	return (
		<div className='CheckboxFilterFavouritesCont'>
			<div className='option'>
				<Checkbox
					id='CheckboxFilterFavoruites'
					checked={checked}
					onClick={() => {
						setChecked((prevIsChecked) => !prevIsChecked);
						location.reload();
					}}
				/>
				<Label htmlFor='CheckboxFilterFavoruites' className='label'>
					Show only my favourites
				</Label>
			</div>
		</div>
	);
}
export default CheckboxFilterFavourites;
