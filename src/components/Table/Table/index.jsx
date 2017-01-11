import React from 'react';

import { Tr } from '../';

const Table = (props) => <table {...props}>
  {(() => {
    const rows = [];
    const createCellsInRow = rowIdx => {
      const cells = [];
      for (const colIdx of Array(props.colCount).keys()) {
        cells.push(props.children(rowIdx, colIdx));
      }
      return cells;
    };
    for (const rowIdx of Array(props.rowCount).keys()) {
      rows.push(<Tr>
        {createCellsInRow(rowIdx)}
      </Tr>);
    }
    return rows;
  })()}
</table>;

Table.propTypes = {
  rowCount: React.PropTypes.bool.isRequired,
  colCount: React.PropTypes.bool.isRequired,
  children: React.PropTypes.func.isRequired,
};

export default Table;
