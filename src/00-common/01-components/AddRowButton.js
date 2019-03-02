import React from 'react';

export default class AddRowButton extends React.Component {
	render() {
		const { callback, label } = this.props;

		return (
			<div className="add-row-container">
				<button
					type="button"
					className="components-button components-icon-button"
					onClick={callback}
				>
					{label}
					<span className="dashicons dashicons-plus" />
				</button>
			</div>
		);
	}
}
