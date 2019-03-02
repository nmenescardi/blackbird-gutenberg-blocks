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

				<div className="team-members-container">
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
			attributes: { title, members }
		} = props;
		return (
			<div>
				<section className="team-members-container padding-lg">
					<div className="container">
						<div className="row heading heading-icon">
							<h2>{title}</h2>
						</div>
						<ul className="row">
							{members.map((member, index) => {
								return (
									<li className="col-12 col-md-6 col-lg-3" key={index}>
										<div
											className="cnt-block equal-hight"
											style="height: 349px;"
										>
											<figure>
												<img
													src={member.imgURL}
													className="img-responsive"
													alt={member.name}
												/>
											</figure>
											<h3>
												<a href="http://www.link.com/">{member.name}</a>
											</h3>
											<p>{member.description}</p>
											<ul className="follow-us clearfix">
												<li>
													<a href="#">
														<i className="fa fa-facebook" />
													</a>
												</li>
												<li>
													<a href="#">
														<i className="fa fa-twitter" />
													</a>
												</li>
												<li>
													<a href="#">
														<i className="fa fa-linkedin" />
													</a>
												</li>
											</ul>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</section>
			</div>
		);
	}
});
