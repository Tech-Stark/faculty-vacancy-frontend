import {useMemo} from 'react';
import TableComponent from '../../components/Table';
import { SelectColumnFilter } from '../../components/Table';

const getData = () => [
    {
      name: 'Suvam Septimus',
      email: 'example@email.com',
      role: 'Director',
      isAdmin: true,
      monthly: '400',
      annually: '435,364',
    },
    {
      name: 'Divas Lodu Septimus',
      email: 'example@email.com',
      role: 'Director',
      isAdmin: false,
      monthly: '400',
      annually: '435,364',
    },
    {
      name: 'Justin Septimus',
      email: 'example@email.com',
      role: 'Staff',
      isAdmin: false,
      monthly: '400',
      annually: '435,364',
    },
    {
      name: 'Laudu Septimus',
      email: 'examplelaudu@email.com',
      role: 'Worker',
      isAdmin: true,
      monthly: '400',
      annually: '4355,364',
    },
];

const Dashboard = () => {
    const columns = useMemo(
        () => [
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Role',
            accessor: 'role',
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: 'Credits Monthly Usage',
            accessor: 'monthly',
          },
          {
            Header: 'Credits Annual Usage',
            accessor: 'annually',
          },
        ],
        []
      );
    
      const data = useMemo(() => getData(), []);
      const initialState = { pageSize: 5 };
  return (
    <div>
        <TableComponent columns={columns} data={data} initialState={initialState} />
    </div>
  )
}

export default Dashboard;