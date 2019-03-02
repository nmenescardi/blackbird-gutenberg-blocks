import React from 'react';
import icons from '../00-icons/icons';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { Button } = wp.components;
const { MediaUpload } = wp.editor;

export default class BackgroundImageInRow extends React.Component {
	render() {
		const {
			index,
			collection,
			item,
			collectionName,
			isSelected,
			setAttributes
		} = this.props;

		const onSelectImage = img => {
			let newCollection = [...collection];
			newCollection[index]['imgURL'] = img.url;
			newCollection[index]['imgID'] = img.id;
			setAttributes({ [collectionName]: newCollection });
		};
		const onRemoveImage = img => {
			let newCollection = [...collection];
			newCollection[index]['imgURL'] = null;
			newCollection[index]['imgID'] = null;
			setAttributes({ [collectionName]: newCollection });
		};

		return (
			<Fragment>
				{!item['imgID'] ? (
					/* No image selected */

					<Fragment>
						<p class="gutenberg-block-title">{__('Image: ', 'understrap')}</p>
						<MediaUpload
							onSelect={onSelectImage}
							type="image"
							value={item['imgID']}
							render={({ open }) => (
								<Button className={'button button-large'} onClick={open}>
									{icons.upload}
									{__('Upload Image', 'understrap')}
								</Button>
							)}
						/>
					</Fragment>
				) : (
					/* There is an image selected */
					<p class="image-wrapper">
						<p class="gutenberg-block-title">{__('Image: ', 'understrap')}</p>
						<img className="image-preview" src={item['imgURL']} />

						{isSelected && (
							<div class="mt-2">
								<Button className="remove-image" onClick={onRemoveImage}>
									{icons.remove}
									<span class="ml-2">{__('Remove', 'understrap')}</span>
								</Button>
							</div>
						)}
					</p>
				)}
			</Fragment>
		);
	}
}
