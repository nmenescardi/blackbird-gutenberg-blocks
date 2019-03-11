/**
 *
 * BLOCK: Team Members
 * block-bgb-nrm-team-members
 *
 */
import './style.scss';
import './editor.scss';

import classnames from 'classnames';
import AddRowButton from '../../00-common/01-components/AddRowButton';
import DeleteRowButton from '../../00-common/01-components/DeleteRowButton';
import BackgroundImageInRow from '../../00-common/01-components/BackgroundImageInRow';
import PlainTextInRow from '../../00-common/01-components/PlainTextInRow';
import LinkContainerInRow from '../../00-common/01-components/LinkContainerInRow';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PlainText, InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, PanelRow, FormToggle, RangeControl } = wp.components;

registerBlockType('bgb-nrm/block-bgb-nrm-team-members', {
	title: __('Team Members', 'bgb-nrm'),
	icon: 'groups',
	category: 'common',
	keywords: [],
	attributes: {
		title: {
			type: 'string',
			default: 'Our Team'
		},
		fullSize: {
			type: 'boolean',
			default: false
		},
		members: {
			type: 'array',
			default: []
		},
		backgroundColor: {
			type: 'string',
			default: '#ffffff'
		},
		paddingTopBottom: {
			type: 'number',
			default: 10
		}
	},

	edit: props => {
		const {
			attributes: {
				title,
				members,
				fullSize,
				backgroundColor,
				paddingTopBottom
			},
			className,
			isSelected,
			setAttributes
		} = props;

		const addNewMember = () => {
			setAttributes({ members: [...members, {}] });
		};
		const toggleFullSize = () => setAttributes({ fullSize: !fullSize });

		return (
			<div
				className={classnames('bgb-nrm-general-styles', className, {
					'block-selected': isSelected
				})}
			>
				<InspectorControls>
					<PanelBody title={__('Full Size', 'bgb-nrm')}>
						<PanelRow>
							<label htmlFor="full-size-form-toggle">
								{__('Full Size', 'bgb-nrm')}
							</label>
							<FormToggle
								id="full-size-form-toggle"
								label={__('Full Size', 'bgb-nrm')}
								checked={fullSize}
								onChange={toggleFullSize}
							/>
						</PanelRow>
					</PanelBody>

					<PanelColorSettings
						title={__('Color Settings', 'bgb-nrm')}
						colorSettings={[
							{
								value: backgroundColor,
								onChange: backgroundColor => {
									setAttributes({ backgroundColor });
								},
								label: __('Background Color', 'bgb-nrm')
							}
						]}
					/>

					<PanelBody title={__('Padding Top/Bottom', 'bgb-nrm')}>
						<PanelRow>
							<RangeControl
								beforeIcon="arrow-left-alt2"
								afterIcon="arrow-right-alt2"
								label=""
								value={paddingTopBottom}
								onChange={paddingTopBottom =>
									setAttributes({ paddingTopBottom })
								}
								min={0}
								max={200}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>

				<div className="title-wrapper">
					<p className="general-block-title">{__('Title:', 'bgb-nrm')}</p>
					{isSelected ? (
						<PlainText
							value={title}
							onChange={title => setAttributes({ title })}
							placeholder={__('Title', 'bgb-nrm')}
						/>
					) : (
						<p class="unselected-block-text">{title}</p>
					)}
				</div>

				<div className="team-members-container-editor">
					{isSelected && (
						<p className="general-block-title">{__('Items: ', 'bgb-nrm')}</p>
					)}

					{members.map((member, index) => {
						return (
							<div className="member-wrapper" key="index">
								{isSelected && (
									<p className="general-block-title">
										{__('Member Nº ', 'bgb-nrm') + (index + 1) + ': '}
									</p>
								)}
								{isSelected ? (
									<BackgroundImageInRow
										collection={members}
										collectionName="members"
										index={index}
										item={member}
										isSelected={isSelected}
										setAttributes={setAttributes}
									/>
								) : null}
								{isSelected ? (
									<div className="field-wrapper field-wrapper-name">
										<PlainTextInRow
											fieldName="name"
											item={member}
											index={index}
											placeholder={__('Name', 'bgb-nrm')}
											collectionName="members"
											collection={members}
											setAttributes={setAttributes}
										/>
									</div>
								) : (
									<p className="label-wrapper">{member.name}</p>
								)}
								{isSelected ? (
									<div className="field-wrapper">
										<PlainTextInRow
											fieldName="description"
											item={member}
											index={index}
											placeholder={__('Description', 'bgb-nrm')}
											collectionName="members"
											collection={members}
											setAttributes={setAttributes}
										/>
									</div>
								) : (
									<p className="label-wrapper">{member.description}</p>
								)}
								{isSelected ? (
									<LinkContainerInRow
										item={member}
										index={index}
										collectionName="members"
										collection={members}
										setAttributes={setAttributes}
									/>
								) : null}

								{isSelected && (
									<DeleteRowButton
										index={index}
										collection={members}
										collectionName="members"
										setAttributes={setAttributes}
									/>
								)}
							</div>
						);
					})}
				</div>

				{isSelected && (
					<AddRowButton
						callback={addNewMember}
						label={__('Add Member: ', 'bgb-nrm')}
					/>
				)}
			</div>
		);
	},

	save: props => {
		const {
			attributes: {
				title,
				members,
				fullSize,
				backgroundColor,
				paddingTopBottom
			},
			className
		} = props;
		return (
			<div
				className={classnames({ 'full-width-section': fullSize }, className)}
				style={{
					backgroundColor: backgroundColor,
					paddingTop: paddingTopBottom,
					paddingBottom: paddingTopBottom
				}}
			>
				<section className="team-members-container">
					<div className="main-title">
						<h2>{title}</h2>
					</div>
					<div className="cards-container">
						{members.map((member, index) => {
							return (
								<div className="card-wrapper" key={index}>
									<figure>
										<img
											src={member.imgURL}
											className="img-responsive"
											alt={member.name}
										/>
									</figure>
									<h3 className="member-title">
										<a className="member-link" href={member.buttonURL}>
											{member.name}
										</a>
									</h3>
									<p className="member-description">{member.description}</p>
								</div>
							);
						})}
					</div>
				</section>
			</div>
		);
	}
});
