import React from 'react';

// react-bootstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
  Form,
} from 'react-bootstrap';

// core components
import ReactTable from 'components/ReactTable/ReactTable.js';
import { getAreaNonGroup, daftarlokasi, deleteArea } from '../../../stores';
import { useDispatch, useSelector } from 'react-redux';

function ReactTables() {
  const dispatch = useDispatch();
  const monitoring = useSelector((state) => state.monitoringReducer);
  const [data, setData] = React.useState([]);
  const [dataBaru, setDataBaru] = React.useState({});
  const [modal, setModal] = React.useState(false);

  React.useEffect(() => {
    let tmp = monitoring.listArea.map((val, index) => {
      return {
        ...val,
        actions: (
          // we've added some custom button actions
          <div className='actions-right'>
            <Button
              onClick={() => {
                deleteArea(val._id);
              }}
              variant='danger'
              size='sm'
              className='btn-link remove text-danger'
            >
              <i className='fa fa-times' />
            </Button>{' '}
          </div>
        ),
      };
    });
    setData(tmp);
  }, [monitoring.listArea]);
  React.useEffect(() => {
    getAreaNonGroup(dispatch);
  }, []);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md='12'>
            <h4 className='title'>Gedung dan Ruangan</h4>
            <Button
              className='btn-wd mr-1'
              onClick={() => {
                setModal(true);
              }}
              variant='primary'
            >
              Tambah Area
            </Button>
            <Card>
              <Card.Body>
                <ReactTable
                  data={data}
                  columns={[
                    {
                      Header: 'Nama Gedung',
                      accessor: 'gedung',
                    },
                    {
                      Header: 'Nama Ruangan',
                      accessor: 'area',
                    },
                    {
                      Header: 'Actions',
                      accessor: 'actions',
                      sortable: false,
                      filterable: false,
                    },
                  ]}
                  className='-striped -highlight primary-pagination'
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal
        size='lg'
        show={modal}
        onHide={() => {
          setModal(false);
        }}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md='12'>
              <Form action='' className='form' method=''>
                <Card>
                  <Card.Header>
                    <Card.Header>
                      <Card.Title as='h4'>Tambah Ruangan</Card.Title>
                    </Card.Header>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col sm='12'>
                        <Form.Group>
                          <label>Gedung</label>
                          <Form.Control
                            onChange={(e) => {
                              setDataBaru({
                                ...dataBaru,
                                gedung: e.target.value,
                              });
                            }}
                            placeholder='Masukan Nama Gedung'
                            type='text'
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm='12'>
                        <Form.Group>
                          <label>Ruangan</label>
                          <Form.Control
                            onChange={(e) => {
                              setDataBaru({
                                ...dataBaru,
                                area: e.target.value,
                              });
                            }}
                            placeholder='Masukan Nama Ruangan'
                            type='text'
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button
                      className='btn-fill pull-right'
                      type='submit'
                      variant='info'
                      onClick={(e) => {
                        e.preventDefault();
                        daftarlokasi(dataBaru);
                      }}
                    >
                      Tambah Area
                    </Button>
                    <div className='clearfix'></div>
                  </Card.Body>
                </Card>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ReactTables;
