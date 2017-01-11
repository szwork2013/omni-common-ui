import React from 'react';

import { Tr } from '../';

const Table = (props) => <table {...props}>
  {
    Array(props.rowCount).map((_item, rowIdx) => <Tr key={rowIdx}>
      {Array(props.colCount).map((__item, colIdx) => props.children(rowIdx, colIdx))}
    </Tr>)
  }
</table>;

Table.propTypes = {
  rowCount: React.PropTypes.number.isRequired,
  colCount: React.PropTypes.number.isRequired,
  children: React.PropTypes.func.isRequired,
};

export default Table;
