'use strict';

import React from 'react';
import classNames from 'classnames';
import {CSSTransitionGroup as Animation} from 'react-transition-group';
import PropTypes from 'prop-types';

export default class TabGroup extends React.Component {
	constructor(props) {
		super();

		this.state = {
			'selected': props.selected
		}
	}

	componentDidMount() {
		this.props.children.forEach((child, i) => {
			setTimeout(() => {
				this.selectTab(i);
			});
		});
		setTimeout(() => {
			this.selectTab(this.props.selected);
		});
	}

	selectTab(index) {
		this.setState({
			'selected': index
		})
	}

	// TODO: Move nested form logic into this component and add a prop option to wrap the tab content in a form
	render() {
		return (
			<div className="tab-group">
				<div className="tabs-menu">
					<ul>
						{this.props.children.map((tab, i) =>
							<li className={this.state.selected === i ? 'active' : ''} key={i} onClick={this.selectTab.bind(this, i)}>{tab.props.title}
								{
									tab.props.errorCount > 0 &&
									<span className="error-count">{tab.props.errorCount}</span>
								}
							</li>
						)}
					</ul>
				</div>
				<div className="tabs-container">
					{this.props.children.map((tab, i) =>
						this.state.selected === i &&
						<div className="tab-content" key={i}>{tab.props.children}</div>
					)}
				</div>
			</div>
		)
	}
}

TabGroup.propTypes = {
	'selected': PropTypes.number,
	'formName': PropTypes.string
}

TabGroup.defaultProps = {
	'selected': 0
}
