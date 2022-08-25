import {useMemo, useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {BASE_URL, configToken} from '../../utils/api';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableComponent from '../../components/Table';
import { SelectColumnFilter } from '../../components/Table';
import Button from '@mui/material/Button';
import { addToast } from "../../redux/features/toast/toastSlice";

const SendEmail = () => {
    const[teachersData, setTeachersData] = useState([]);
    const[isLoading, setIsLoading] = useState(false); 
    
    const dispatch = useDispatch();

    const { isLoggedIn, token, isAdmin } = useSelector((state) => state.auth);
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

    const sendEmail = (profileId, isInProcess, setIsInProcess) =>{
      const emailData = {
        vacancyId : jobId,
        profileIdList : [profileId]
      }
      setIsInProcess(true);
      axios.post(`${BASE_URL}admin/mail/invite`, emailData, configToken(token))
        .then(response =>{
          console.log(response);
          setIsInProcess(false);
          dispatch(addToast({type: 'success', message: 'Successfully sent email!'}));
        })
        .catch(err => {
          console.error(err);
          setIsInProcess(false);
          dispatch(addToast({type: 'error', message: 'Could not send email!'}));
        });
    }

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
              const[isInProcess, setIsInProcess] = useState(false);
              return (
                  <Button variant="contained" disabled={isInProcess} color="primary" size="small" onClick={()=> sendEmail(d.row.original.profileId, isInProcess, setIsInProcess)}>
                    Send Email
                  </Button>
              );
            },
            customWidth: "15%"
          }
        ],
    []);
        
  const initialState = {hiddenColumns: ['firstName', 'lastName', 'isOpenToWork'], pageSize: 5 };

  if(!isLoggedIn || !isAdmin){
    return(
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          You are not Authorized!
        </Typography>
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="lg">
        {jobId}
        <TableComponent columns={columns} data={teachersData} initialState={initialState} isLoading={isLoading} />
    </Container>
  )
}

export default SendEmail;