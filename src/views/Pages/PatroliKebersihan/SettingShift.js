import React from 'react';

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import { getShift, daftarShift, deleteShift } from '../../../stores';
import { useDispatch, useSelector } from 'react-redux';

function RegularTables() {
  const dispatch = useDispatch();
  const [shift, setShift] = React.useState({});
  const monitoring = useSelector((state) => state.monitoringReducer);
  React.useEffect(() => {
    getShift(dispatch);
  }, []);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md='6'>
            <Card className='strpied-tabled-with-hover'>
              <Card.Header>
                <Card.Title as='h4'>Shift Monitoring</Card.Title>
              </Card.Header>
              <Card.Body className='table-responsive p-0'>
                <Table className='table-hover table-striped w-full'>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Jam Selesai</th>
                      <th>Durasi</th>
                      <th>hapus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monitoring.jamLaporan.map((val, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{val.jam}</td>
                          <td>{val.durasi}</td>
                          <td>
                            <Button
                              onClick={() => {
                                deleteShift(val._id);
                              }}
                              variant='danger'
                              size='sm'
                              className='btn-link remove text-danger'
                            >
                              <i className='fa fa-times' />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md='6'>
            <Card className='stacked-form'>
              <Card.Header>
                <Card.Title as='h4'>Tambahkan Shift</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form action='#' method='#'>
                  <Form.Group>
                    <label>Jam Selesai</label>
                    <Form.Control
                      placeholder='Masukan Jam 0 - 24'
                      max={24}
                      min={0}
                      type='number'
                      onChange={(e) => {
                        setShift({
                          ...shift,
                          jam: e.target.value,
                        });
                      }}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <label>Durasi</label>
                    <Form.Control
                      placeholder='Durasi pengerjaan'
                      type='text'
                      onChange={(e) => {
                        setShift({
                          ...shift,
                          durasi: e.target.value,
                        });
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Footer>
                <Button
                  onClick={() => {
                    daftarShift(shift);
                  }}
                  className='btn-fill'
                  type='submit'
                  variant='info'
                >
                  Submit
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RegularTables;
