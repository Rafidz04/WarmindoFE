import React from 'react';
import ReactDatetime from 'react-datetime';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Modal,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

// core components
import ReactTable from 'components/ReactTable/ReactTable.js';

import { getLaporanRekap, laporkanSelesai } from '../../../stores';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
const RegularMap = (props) => {
  const mapRef = React.useRef(null);
  React.useEffect(() => {
    let google = window.google;
    let map = mapRef.current;
    let lat = props.laporan.latitude;
    let lng = props.laporan.longitude;
    const myLatlng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 18,
      center: myLatlng,
      scrollwheel: true,
    };

    map = new google.maps.Map(map, mapOptions);

    const marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Lokasi Laporan',
    });

    const contentString =
      '<div class="info-window-content"><h2>Lokasi Laporan</h2>';

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker);
    });
  }, []);
  return (
    <>
      <div className='map' id='regularMap' ref={mapRef} />
    </>
  );
};
function ReactTables() {
  const [data, setData] = React.useState([]);
  const monitoring = useSelector((state) => state.monitoringReducer);
  const [modal, setModal] = React.useState(false);
  const [laporan, setLaporan] = React.useState({});
  const [filter, setFilter] = React.useState({
    mulai: '',
    selesai: '',
  });
  const dispatch = useDispatch();
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  React.useEffect(() => {
    let tmp = monitoring.listLaporan.map((val, index) => {
      return {
        ...val,
        tanggal: moment(val.createdAt).format('DD MMMM YYYY'),
        kondisi: val.status ? 'Selesai' : 'Belum',
        actions: (
          <div className='actions-right'>
            <Button
              onClick={() => {
                setLaporan(val);
                setModal(true);
              }}
              size='sm'
              className={`text-${
                val.status ? 'primary' : 'danger'
              } btn-link edit`}
            >
              <i className='fa fa-edit' />
            </Button>{' '}
          </div>
        ),
      };
    });
    setData(tmp);
  }, [monitoring.listLaporan]);
  React.useEffect(() => {
    getLaporanRekap(dispatch, filter);
  }, []);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md='12'>
            <h4 className='title'>Rekap Laporan Monitoring</h4>
          </Col>
          <Col md='2'>
            <Form.Group>
              <ReactDatetime
                dateFormat='DD MMMM YY'
                value={filter.mulai}
                onChange={(e) => {
                  setFilter({ ...filter, mulai: e.toDate(), selesai: '' });
                }}
                renderInput={(props) => {
                  return (
                    <input {...props} value={filter.mulai ? props.value : ''} />
                  );
                }}
                inputProps={{
                  className: 'form-control',
                  placeholder: 'Pilih tanggal mulai',
                }}
                timeFormat={false}
              ></ReactDatetime>
            </Form.Group>
          </Col>
          <Col md='2'>
            <Form.Group>
              <ReactDatetime
                dateFormat='DD MMMM YY'
                value={filter.selesai}
                renderInput={(props) => {
                  return (
                    <input
                      {...props}
                      value={filter.selesai ? props.value : ''}
                    />
                  );
                }}
                inputProps={{
                  className: 'form-control',
                  placeholder: 'Pilih tanggal sampai',
                }}
                onChange={(e) => {
                  setFilter({ ...filter, selesai: e.toDate() });
                }}
                timeFormat={false}
              ></ReactDatetime>
            </Form.Group>
          </Col>
          <Col md='1'>
            <Button
              className='btn-wd mr-1'
              onClick={() => {
                getLaporanRekap(dispatch, filter);
              }}
              variant='primary'
            >
              Apply Filter
            </Button>
          </Col>
          <Col md='1' className='ml-md-2'>
            <Button
              className='btn-wd mr-1'
              onClick={() => {
                setFilter({
                  mulai: '',
                  selesai: '',
                });
                getLaporanRekap(dispatch, {
                  mulai: '',
                  selesai: '',
                });
              }}
              variant='warning'
            >
              Reset Filter
            </Button>
          </Col>
          <Col md='12'>
            <Card>
              <Card.Body>
                <ReactTable
                  data={data}
                  columns={[
                    {
                      Header: 'Gedung',
                      accessor: 'gedung',
                    },
                    {
                      Header: 'Ruangan',
                      accessor: 'area',
                    },
                    {
                      Header: 'kategori',
                      accessor: 'kategory',
                    },
                    {
                      Header: 'Masalah',
                      accessor: 'problem',
                    },
                    {
                      Header: 'Tindaklanjut',
                      accessor: 'tindakLanjut',
                    },
                    {
                      Header: 'Lembaga Terkait',
                      accessor: 'lembagaTerkait',
                    },
                    {
                      Header: 'Tanggal Dilaporkan',
                      accessor: 'tanggal',
                    },
                    {
                      Header: 'Status',
                      accessor: 'kondisi',
                    },
                    {
                      Header: 'Aksi',
                      accessor: 'actions',
                      sortable: false,
                      filterable: false,
                    },
                  ]}
                  /*
                    You can choose between primary-pagination, info-pagination, success-pagination, warning-pagination, danger-pagination or none - which will make the pagination buttons gray
                  */
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
          setLaporan({});
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
                      <Card.Title as='h4'>Laporan</Card.Title>
                    </Card.Header>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col sm='6'>
                        <Form.Group>
                          <label>Gedung</label>
                          <Form.Control
                            disabled={true}
                            placeholder='Masukan Nama Gedung'
                            value={laporan.gedung}
                            type='text'
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col sm='6'>
                        <Form.Group>
                          <label>Ruangan</label>
                          <Form.Control
                            disabled={true}
                            value={laporan.area}
                            placeholder='Masukan Nama Ruangan'
                            type='text'
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm='6'>
                        <Form.Group>
                          <label>Dilaporkan Oleh</label>
                          <Form.Control
                            disabled={true}
                            value={laporan.namaPelapor}
                            type='text'
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col sm='6'>
                        <Form.Group>
                          <label>Tanggal dan Jam Pelaporan</label>
                          <Form.Control
                            disabled={true}
                            value={new Date(laporan.createdAt).toString()}
                            type='text'
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm='2'>
                        <Form.Group>
                          <label>Kategory</label>
                          <Form.Control
                            disabled={true}
                            value={laporan.kategory}
                            type='text'
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col sm='2'>
                        <Form.Group>
                          <label>Status</label>
                          <Form.Control
                            disabled={true}
                            value={laporan.valid ? 'Valid' : 'Kadaluarsa'}
                            type='text'
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      {laporan.kategory !== 'Baik' && (
                        <Col sm='8'>
                          <Form.Group>
                            <label>Uraian Masalah</label>
                            <Form.Control
                              disabled={true}
                              value={laporan.problem}
                              placeholder='Masukan Nama Ruangan'
                              type='text'
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      )}
                    </Row>
                    {laporan.kategory !== 'Baik' && (
                      <Row>
                        <Col sm='6'>
                          <Form.Group>
                            <label>Tindak Lanjut</label>
                            <Form.Control
                              disabled={true}
                              value={laporan.tindakLanjut}
                              type='text'
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col sm='6'>
                          <Form.Group>
                            <label>Lembaga Terkait</label>
                            <Form.Control
                              disabled={true}
                              value={laporan.lembagaTerkait}
                              placeholder='Masukan Nama Ruangan'
                              type='text'
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                    )}
                    <Row className='mb-4'>
                      <Col sm='6'>
                        <label>Dokumentasi laporan</label>
                        <img
                          className='w-100'
                          style={{
                            borderRadius: '5px',
                            boxShadow: '4px 4px 8px 0px rgba(0,0,0,0.75)',
                            height: '400px',
                            objectFit: 'cover',
                            objectPosition: 'center',
                          }}
                          src={laporan.fotoSebelum}
                        ></img>
                      </Col>
                      <Col sm='6'>
                        <label>Kordinat dokumentasi</label>
                        <div
                          style={{
                            width: '100%',
                            height: '400px',
                          }}
                        >
                          <RegularMap laporan={laporan} />
                        </div>
                      </Col>
                    </Row>
                    {laporan.kategory !== 'Baik' ? (
                      !laporan.status ? (
                        <>
                          <Row className='mb-3'>
                            <Col sm='6'>
                              <Form.Group>
                                <label>Upload Foto Sesudah</label>
                                {laporan.image && (
                                  <img
                                    className='w-100 mb-3'
                                    style={{
                                      borderRadius: '5px',
                                      boxShadow:
                                        '4px 4px 8px 0px rgba(0,0,0,0.75)',
                                      height: '400px',
                                      objectFit: 'cover',
                                      objectPosition: 'center',
                                    }}
                                    src={URL.createObjectURL(laporan.image)}
                                  ></img>
                                )}

                                <div>
                                  <label
                                    className='label-input-file btn btn-success   mr-1'
                                    for='import2'
                                  >
                                    <input
                                      id='import2'
                                      type='file'
                                      onClick={(e) => {
                                        e.target.value = '';
                                      }}
                                      accept='image/png, image/gif, image/jpeg'
                                      onChange={(e) => {
                                        setLaporan({
                                          ...laporan,
                                          image: e.target.files[0],
                                        });
                                      }}
                                    />
                                  </label>
                                </div>
                              </Form.Group>
                            </Col>
                          </Row>

                          <Button
                            className='btn-fill pull-right'
                            type='submit'
                            variant='danger'
                            disabled={laporan.image ? false : true}
                            onClick={(e) => {
                              e.preventDefault();
                              let formData = new FormData();
                              formData.append('idLaporan', laporan._id);
                              formData.append('fotoSesudah', laporan.image);
                              laporkanSelesai(formData);
                            }}
                          >
                            Laporkan Selesai
                          </Button>
                        </>
                      ) : (
                        <Row className='mb-3'>
                          <Col sm='6'>
                            <label>Dokumentasi Penyelesaian</label>
                            <img
                              className='w-100'
                              style={{
                                borderRadius: '5px',
                                boxShadow: '4px 4px 8px 0px rgba(0,0,0,0.75)',
                                height: '400px',
                                objectFit: 'cover',
                                objectPosition: 'center',
                              }}
                              src={laporan.fotoSesudah}
                            ></img>
                          </Col>
                          <Col sm='6'>
                            <Form.Group>
                              <label>Tanggal dan Jam Dilaporkan Selesai</label>
                              <Form.Control
                                disabled={true}
                                value={new Date(
                                  laporan.tanggalSelesai
                                ).toString()}
                                placeholder='Masukan Nama Ruangan'
                                type='text'
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>
                      )
                    ) : null}
                    {}

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
