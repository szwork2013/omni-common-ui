import 'rc-tooltip/assets/bootstrap.css';

import React from 'react';
import RcTooltip from 'rc-tooltip';
import is from 'is_js';

const Tooltip = (props) => {
  if (is.not.string(props.text) || is.empty(props.text)) {
    return <div className={props.className}>props.children</div>;
  }

  return <RcTooltip placement="top"
      trigger={['hover']}
      destroyPopupOnHide
      overlay={<span>{props.text}</span>}>
    <div className={props.className}>{props.children}</div>
  </RcTooltip>;
};

Tooltip.propTypes = {
  children: React.PropTypes.node,
  text: React.PropTypes.string,
  className: React.PropTypes.string,
};

export default Tooltip;