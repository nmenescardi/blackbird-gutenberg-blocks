/**
 *
 * BLOCK: Team Members
 * block-gbg-nrm-team-members
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
const { PlainText } = wp.editor;

registerBlockType('gbg-nrm/block-gbg-nrm-team-members', {
	title: __('Team Members'),
	icon: 'groups',
	category: 'common',
	keywords: [],
	attributes: {
		title: {
			type: 'string',
			default: 'Our Team'
		},
		members: {
			type: 'array',
			default: []
		}
	},

	edit: props => {
		const {
			attributes: { title, members },
			className,
			isSelected,
			setAttributes
		} = props;

		const addNewMember = () => {
			setAttributes({ members: [...members, {}] });
		};

		return (
			<div
				className={classnames('bgb-nrm-general-styles', className, {
					'block-selected': isSelected
				})}
			>
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
									<PlainTextInRow
										fieldName="name"
										item={member}
										index={index}
										placeholder={__('Name', 'bgb-nrm')}
										collectionName="members"
										collection={members}
										setAttributes={setAttributes}
									/>
								) : (
									<p className="label-wrapper">{member.name}</p>
								)}
								{isSelected ? (
									<PlainTextInRow
										fieldName="description"
										item={member}
										index={index}
										placeholder={__('Description', 'bgb-nrm')}
										collectionName="members"
										collection={members}
										setAttributes={setAttributes}
									/>
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
			attributes: { title, members },
			className
		} = props;
		return (
			<div className={classnames('full-width-section', className)}>
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
