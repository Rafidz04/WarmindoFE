import React from 'react';
// react component used to create charts
import ChartistGraph from 'react-chartist';
import {
  getvisitproblemtotal,
  getvisittotalhariini,
  getKpiMonitoring1,
  getKpiMonitoring2,
} from '../../../stores';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
// react components used to create a SVG / Vector map
import { VectorMap } from 'react-jvectormap';
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
  OverlayTrigger,
  Table,
  Tooltip,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

function Dashboard() {
  const dispatch = useDispatch();
  const monitoring = useSelector((state) => state.monitoringReducer);
  const [filter, setFilter] = React.useState({
    mulai: '',
    selesai: '',
  });

  const [kpi2Option, setKpi2Option] = React.useState({
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
      curve: 'straight',
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: 'series-2',
        data: [35, 10, 45, 50, 40, 60, 80, 91],
      },
    ],
  });

  React.useEffect(() => {
    let tmp = {
      options: {
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
        curve: 'straight',
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
        {
          name: 'series-2',
          data: [35, 10, 45, 50, 40, 60, 80, 91],
        },
      ],
    };
    tmp.options.xaxis.categories = monitoring.kpi2.categories;
    tmp.series = monitoring.kpi2.series;
    setKpi2Option(tmp);
  }, [monitoring.kpi2]);
  React.useEffect(() => {
    getKpiMonitoring1(dispatch, filter);
    getKpiMonitoring2(dispatch, filter);
  }, [filter]);

  React.useEffect(() => {
    getvisitproblemtotal(dispatch);
    getvisittotalhariini(dispatch);
  }, []);
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg='3' sm='6'>
            <Card className='card-stats'>
              <Card.Body>
                <Row>
                  <Col xs='5'>
                    <div className='icon-big text-center icon-warning'>
                      <i className='nc-icon nc-chart text-warning'></i>
                    </div>
                  </Col>
                  <Col xs='7'>
                    <div className='numbers'>
                      <p className='card-category'>
                        Total Kunjungan Monitoring
                      </p>
                      <Card.Title as='h4'>
                        {monitoring.totalVisitHariIni}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className='stats'>Hari ini</div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg='3' sm='6'>
            <Card className='card-stats'>
              <Card.Body>
                <Row>
                  <Col xs='5'>
                    <div className='icon-big text-center icon-warning'>
                      <i className='nc-icon nc-light-3 text-success'></i>
                    </div>
                  </Col>
                  <Col xs='7'>
                    <div className='numbers'>
                      <p className='card-category'>Total Problem</p>
                      <Card.Title as='h4'>{monitoring.totalProblem}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className='stats'>Problem belum selesai</div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
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
                setFilter({
                  mulai: '',
                  selesai: '',
                });
              }}
              variant='warning'
            >
              Reset Filter
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md='12'>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Total Temuan Masalah</Card.Title>
                <p className='card-category'>Periode sesuai filter</p>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md='6'>
                    <Table responsive>
                      <tbody>
                        {monitoring.kpi1.map((val, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{val._id}</td>
                              <td className='text-right'>{val.count}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md='12'>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Pencapaian Kunjungan</Card.Title>
                <p className='card-category'>Periode berdasarkan filter</p>
              </Card.Header>
              <Card.Body>
                <Chart
                  options={kpi2Option.options}
                  series={kpi2Option.series}
                  type='line'
                  width='100%'
                  height='400px'
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
