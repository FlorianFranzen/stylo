// Copyright 2015-2020 Parity Technologies (UK) Ltd.
// Modifications Copyright (c) 2021 Thibaut Sardan

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import Clipboard from '@react-native-community/clipboard';
import testIDs from 'e2e/testIDs';

import { Action, SetAlert } from '../context/AlertContext';

const alertTestIDs = testIDs.Alert;

export const alertError = (setAlert: SetAlert, message: string): void =>
	setAlert('Error', message);

const buildAlertButtons = (onConfirm: () => any, confirmText: string, testID?: string): Action[] => [
	{
		onPress: (): void => {
			onConfirm();
		},
		testID,
		text: confirmText
	},
	{ text: 'Cancel' }
];

const buildAlertDeleteButtons = (onDelete: () => any, testID?: string): Action[] => buildAlertButtons(onDelete, 'Delete', testID);

export const alertDeleteLegacyAccount = (setAlert: SetAlert,
	accountName: string,
	onDelete: () => any): void => {
	setAlert('Delete Account',
		`Do you really want to delete ${accountName}?
This account can only be recovered with its associated secret phrase.`,
		buildAlertDeleteButtons(onDelete));
};

export const alertCopyBackupPhrase = (setAlert: SetAlert, seedPhrase: string): void =>
	setAlert('Write this secret phrase on paper',
		'It is not recommended to transfer or store a secret phrase digitally and unencrypted. Anyone in possession of this secret phrase is able to spend funds from this account.',
		[
			{
				onPress: (): void => {
					Clipboard.setString(seedPhrase);
				},
				text: 'Copy'
			},
			{ text: 'Cancel' }
		]);

export const alertRisks = (setAlert: SetAlert, message: string, onPress: () => any): void =>
	setAlert('Warning', message, [
		{
			onPress,
			text: 'Proceed'
		},
		{ text: 'Back' }
	]);

export const alertDecodeError = (setAlert: SetAlert): void =>
	setAlert('Could not decode method with available metadata.',
		'Signing something you do not understand is inherently unsafe. Do not sign this extrinsic unless you know what you are doing, or update Stylo to be able to decode this message. If you are not sure, or you are using the latest version, please open an issue on github.com/stylo-app/stylo.');

export const alertBackupDone = (setAlert: SetAlert, onPress: () => any): void =>
	setAlert('Important',
		"Make sure you've backed up this secret phrase. It is the only way to restore your account in case of device failure/loss.",
		[
			{
				onPress,
				testID: alertTestIDs.backupDoneButton,
				text: 'Proceed'
			},
			{ text: 'Cancel' }
		]);
