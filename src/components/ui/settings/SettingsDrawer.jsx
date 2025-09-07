'use client';
import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerTrigger,
	DrawerTitle,
} from '@/components/ui/drawer';
import './styles.css';

import ButtonSettings from '../buttons/settings/ButtonSettings.jsx';
// import CheckboxOffline from '../footer/offlineCheckbox/OfflineCheckbox.jsx';
import iconAndroid from '@/src/components/icons/iconAndroid.jsx';
import iconApple from '@/src/components/icons/iconApple.jsx';
import BackgroundOptions from '../footer/background/BackgroundOptions';
import CheckboxFilterFavourites from '@/src/components/ui/CheckboxFilterFavourites/CheckboxFilterFavourites.jsx';
import ButtonUpdate from '../buttons/update/ButtonUpdate.jsx';
export function SettingsDrawer() {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<div className='settings'>
					<ButtonSettings />
				</div>
			</DrawerTrigger>
			<div className='settingsDrawerMain'>
				<DrawerContent className='DrawerContent'>
					<DrawerTitle className='hide'>TItle</DrawerTitle>
					<div className='settingsDrawerCont'>
						<div className='settingsDrawer'>
							<div>Theme</div>
							<BackgroundOptions />
						</div>

						<CheckboxFilterFavourites />

						<div className='settingsDrawer'>
							{/* <CheckboxOffline /> */}
							<ButtonUpdate label='Check for updates' />
						</div>

						<div className='settingsDrawer subtitle tip install-as-app'>
							<h3>Install as an app</h3>

							<p>Add to your home screen video instructions</p>
							<div className='links'>
								<a
									href='https://www.youtube.com/watch?v=O1xEXKB6tNg'
									target='_blank'
									rel='noopener noreferrer'
								>
									<div
										className='android logo'
										dangerouslySetInnerHTML={{ __html: iconAndroid }}
									/>
									<div>Android</div>
								</a>
								<a
									href='https://www.youtube.com/watch?v=B7fKs4dTeu0'
									target='_blank'
									rel='noopener noreferrer'
								>
									<div
										className='apple logo'
										dangerouslySetInnerHTML={{ __html: iconApple }}
									/>
									<div>Apple iOS</div>
								</a>
							</div>
						</div>
						<DrawerFooter className='drawerFooter'>
							<DrawerClose asChild>
								<Button variant='outline'>Close</Button>
							</DrawerClose>
						</DrawerFooter>
					</div>
				</DrawerContent>
			</div>
		</Drawer>
	);
}
export default SettingsDrawer;
