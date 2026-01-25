'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import './styles.css';
export function CheckboxOffline() {
	return (
		<div className='offlineCheckboxCont'>
			<div className='option'>
				<Checkbox id='offlineCheckbox' />
				<Label htmlFor='offlineCheckbox' className='label'>
					Use this app offline
				</Label>
			</div>
			<div>
				<p>
					By clicking this checkbox, you will be able to use this app offline
					but you will need to use the update button to get the latest version
					when they are released.
				</p>
			</div>
		</div>
	);
}
export default CheckboxOffline;
