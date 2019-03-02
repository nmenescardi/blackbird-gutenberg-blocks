import React, { Component } from 'react';

export class DeleteRowButton extends Component {
	render() {
		const { collection, collectionName, index, setAttributes } = this.props;

		return (
			<div className="delete-row-wrapper">
				<div className="delete-inner-wrapper">
					<button
						className="components-button components-icon-button"
						type="button"
						onClick={() => {
							let newCollection = [...collection];
							newCollection.splice(index, 1);
							setAttributes({ [collectionName]: newCollection });
						}}
					>
						<span className="dashicons dashicons-trash" />
					</button>
				</div>
			</div>
		);
	}
}

export default DeleteRowButton;
