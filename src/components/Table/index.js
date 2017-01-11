import _Table from './Table';
import _Tr from './Tr';
import _Th from './Th';
import _Td from './Td';

export const Table = _Table;
export const Tr = _Tr;
export const Th = _Th;
export const Td = _Td;

Table.Tr = Tr;
Table.Th = Th;
Table.Td = Td;

export default Table;
