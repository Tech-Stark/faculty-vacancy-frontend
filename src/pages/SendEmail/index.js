import {useMemo, useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {BASE_URL, configToken} from '../../utils/api';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableComponent from '../../components/Table';
import { SelectColumnFilter } from '../../components/Table';
import Button from '@mui/material/Button';

const SendEmail = () => {
    const[teachersData, setTeachersData] = useState([]);
    const[isLoading, setIsLoading] = useState(false);    

    const { isLoggedIn, token } = useSelector((state) => state.auth);
    const { jobId } = useParams();

    useEffect(() =>{
        if(isLoggedIn){
          setIsLoading(true);
            axios
                .get(`${BASE_URL}admin/getallteachers`, configToken(token))
                .then((response) => {
                  console.log(response.data);
                  setTeachersData(response.data);
                  setIsLoading(false);
                })
                .catch(err => {
                  setIsLoading(false);
                  setTeachersData([]);
                });
        }
    }, [isLoggedIn, token]);

    const columns = useMemo(
        () => [
          {
            Header: 'Name',
            id: 'name',
            Cell: (d) => {
              return (
                <Typography variant="body1">
                  {d.row.original.firstName}{" "}{d.row.original.lastName}
                </Typography>
              );
            },
            customWidth: "15%"
          },
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
          {
            Header: 'Email',
            accessor: 'email',
            customWidth: "15%"
          },
          {
            Header: 'Available to Work',
            id: "isOpenToWork",
            Cell: (d) => {
              return (
                <Typography variant="body1">
                  {d.row.original.isOpenToWork ? 'Yes': 'No'}
                </Typography>
              );
            },
          },
          {
            Header: 'College',
            accessor: 'collegeName',
            customWidth: '20%',
            Filter: SelectColumnFilter,
          },
          {
            Header: 'Department',
            accessor: 'department',
            customWidth: '20%',
            Filter: SelectColumnFilter,
          },
          {
            Header: 'Role',
            accessor: 'position',
            customWidth: '15%',
            Filter: SelectColumnFilter,
          },
          {
            Header: '',
            id: "button",
            Cell: (d) => {
              return (
                  <Button variant="contained" color="primary" size="small">
                    Send Email
                  </Button>
              );
            },
            customWidth: "15%"
          }
        ],
    []);
        
  const initialState = {hiddenColumns: ['firstName', 'lastName', 'isOpenToWork'], pageSize: 5 };
  return (
    <Container component="main" maxWidth="lg">
        {jobId}
        <TableComponent columns={columns} data={teachersData} initialState={initialState} isLoading={isLoading} />
    </Container>
  )
}

export default SendEmail;