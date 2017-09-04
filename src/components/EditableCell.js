import React, { PropTypes } from 'react';
import { Input, Icon } from 'antd';

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: false,
      modifiedStyle: 'editable-cell-text-wrapper',
    };
    this.check = this.check.bind(this);
    this.edit = this.edit.bind(this);
  }
  componentWillReceiveProps() {
    if (this.cacheValue !== this.state.value) {
      this.setState({ modifiedStyle: 'editable-cell-text-wrapper' });
    } else {
      this.setState({ modifiedStyle: 'editable-cell-text-wrapper' });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
           nextState.value !== this.state.value;
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  check() {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit() {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable, modifiedStyle } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={(e) => { this.handleChange(e); }}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className={modifiedStyle}>
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}
EditableCell.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};
export default EditableCell;
