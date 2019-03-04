import React from 'react';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { IconButton } = wp.components;
const { PlainText, URLInput } = wp.editor;

export default class ButtonContainerInRow extends React.Component {
	render() {
		const {
			index,
			item,
			collection,
			collectionName,
			setAttributes
		} = this.props;

		const onChangeButtonText = buttonText => {
			const newCollection = [...collection];
			newCollection[index]['buttonText'] = buttonText;
			setAttributes({ [collectionName]: newCollection });
		};
		const onChangeButtonURL = buttonURL => {
			const newCollection = [...collection];
			newCollection[index]['buttonURL'] = buttonURL;
			setAttributes({ [collectionName]: newCollection });
		};

		return (
			<Fragment>
				<p class="general-block-title">{__('Link Text: ', 'understrap')}</p>
				<PlainText value={item.buttonText} onChange={onChangeButtonText} />
				<p class="general-block-title">{__('Link URL: ', 'understrap')}</p>
				<form
					className="blocks-format-toolbar__link-modal-line blocks-format-toolbar__link-modal-line"
					onSubmit={event => event.preventDefault()}
				>
					<URLInput
						className="url"
						value={item.buttonURL}
						onChange={onChangeButtonURL}
					/>
					<IconButton
						icon="editor-break"
						label={__('Apply', 'understrap')}
						type="submit"
					/>
				</form>
			</Fragment>
		);
	}
}
