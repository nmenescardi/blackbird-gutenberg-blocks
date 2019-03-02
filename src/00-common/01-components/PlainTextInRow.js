import React, { Component } from 'react';
const { PlainText } = wp.editor;

export default class PlainTextInRow extends Component {
	render() {
		const {
			fieldName,
			item,
			index,
			placeholder,
			collectionName,
			collection,
			setAttributes
		} = this.props;
		return (
			<PlainText
				value={item[fieldName]}
				className={fieldName}
				onChange={value => {
					let newCollection = [...collection];
					newCollection[index][fieldName] = value;
					setAttributes({ [collectionName]: newCollection });
				}}
				placeholder={placeholder}
			/>
		);
	}
}
