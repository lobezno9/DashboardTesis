export class Dictionary<keyType, valueType> {

	public isDictionary = true;

	protected _keys: keyType[] = [];

	public add(key: keyType, value: valueType): void {
		const stringKey: string = this.createStringKey(key);
		if (this.hasKey(key)) {
			const error: string = 'An element with the key \'' + stringKey + '\' already exists in the dictionary';
			throw error;
		} else {
			(<any>this)[stringKey] = value;
			this._keys.push(key);
		}
	}

	public updateValue(key: keyType, value: valueType): void {
		const stringKey: string = this.createStringKey(key);

		if (!this.hasKey(key)) {
			const error: string = 'An element with the key \'' + stringKey + '\' does not exists in the dictionary';
			throw error;
		} else {
			(<any>this)[stringKey] = value;
		}
	}

	public get(key: keyType): valueType {
		return (<any>this)[this.createStringKey(key)];
	}

	public hasKey(key: keyType): boolean {
		return this.hasOwnProperty(this.createStringKey(key));
	}

	public remove(key: keyType): void {
		const stringKey: string = this.createStringKey(key);
		(<any>this)[stringKey] = undefined;
		delete (<any>this)[stringKey];
		// remove from _keys
		const index = this._keys.indexOf(key);
		if (index > -1) {
			this._keys.splice(index, 1);
		}
	}

	public keys(): keyType[] {
		this.checkConsistence();
		return this._keys;
	}

	public count(): number {
		this.checkConsistence();
		return this._keys.length;
	}

	public values(): valueType[] {
		let result: valueType[] = new Array<valueType>();
		if (!!this._keys) {
			this._keys.forEach(key => {
				result.push(this.get(key));
			});
		}
		return result;
	}

	protected createStringKey(key: keyType): string {
		let stringKey: string;
		if (typeof (key) === "string") {
			stringKey = <any>key;
		} else {
			stringKey = JSON.stringify(key); // k;//
		}

		if (stringKey === '_keys') {
			throw new Error('The key \'_keys\' is a reserved word and can not be used as a dictionary\'s key.');
		}
		if (key === null || key === undefined) {
			throw new Error('The key can´t be null');
		}
		return stringKey.toString(); // '__dictionaryEntry__' +
	}

	protected checkConsistence(): void {
		if ((Object.keys(this).length - 2) !== this._keys.length) { // -2 because the _keys && isDictionary properties
			throw new Error('An inconsistency between the current keys and the internal reference was found. ' +
				'These type of problems are usually found when direct assignments are used to add new elements to the dictionary instead of the \'add\' method. ');
		}
	}

}