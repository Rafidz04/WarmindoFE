import React from "react";
// react component used to create charts
import ChartistGraph from "react-chartist";
// react components used to create a SVG / Vector map
import { VectorMap } from "react-jvectormap";
import CurrencyFormat from "react-currency-format";
import Select from "react-select";

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
  ModalBody,
  Modal,
  ModalTitle,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBowlFood,
  faMoneyBill1Wave,
  faMugHot,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllStock } from "stores";
import { getAllOrder } from "stores";
import { getAllTotalPendapatan } from "stores";
import { getGrafikPenghasilan } from "stores";
import { getGrafikPelanggan } from "stores";
import { getHarusOrder } from "stores";

function Dashboard() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);
  const [jumlahMakanan, setJumlahMakanan] = React.useState(0);
  const [jumlahMinuman, setJumlahMinuman] = React.useState(0);
  const [jumlahPelanggan, setJumlahPelanggan] = React.useState(0);
  const [pendapatan, setPendapatan] = React.useState(0);
  const [totalPelanggan, setTotalPelanggan] = React.useState(0);
  const [listPenghasilan, setListPenghasilan] = React.useState([]);
  const [listPelanggan, setListPelanggan] = React.useState([]);
  const [listHarusOrder, setListHarusOrder] = React.useState([]);
  const [tahun, setTahun] = React.useState(new Date().getFullYear().toString());
  const [singleSelect, setSingleSelect] = React.useState(
    new Date().getFullYear().toString()
  );
  const [listYear, setListYear] = React.useState([]);
  const max = Math.max(...listPenghasilan);
  const maxPel = Math.max(...listPelanggan);
  const [modal, setModal] = React.useState(false);

  React.useEffect(() => {
    getAllStock(dispatch);
    getAllOrder(dispatch);
    getAllTotalPendapatan(dispatch);
    getHarusOrder(dispatch);
  }, []);

  React.useEffect(() => {
    getGrafikPenghasilan(dispatch, { tahun });
    getGrafikPelanggan(dispatch, { tahun });
  }, [singleSelect]);

  React.useEffect(() => {
    let tmpMakanan = [];
    let tmpMinuman = [];
    let penghasilan = 0;
    auth.listStock &&
      auth.listStock.map((val) => {
        if (val.kategori === "makanan") {
          tmpMakanan.push(val);
        } else {
          tmpMinuman.push(val);
        }
        setJumlahMakanan(tmpMakanan.length);
        setJumlahMinuman(tmpMinuman.length);
      });
    setJumlahPelanggan(auth.listOrder && auth.listOrder.length);
    auth.listPendapatan &&
      auth.listPendapatan.map((val) => {
        penghasilan += val.totalKuantitas;
      });

    // setPendapatan(penghasilan);
    setListPenghasilan(auth.grafikPenghasilan);
    setListPelanggan(auth.grafikPelanggan);
    setPendapatan(auth.totalPenghasilan);
    setTotalPelanggan(auth.totalPelanggan);
    setListHarusOrder(auth.listHarusOrder);
  }, [
    auth.listStock,
    auth.listOrder,
    auth.listPendapatan,
    auth.grafikPenghasilan,
    auth.totalPenghasilan,
    auth.totalPelanggan,
    auth.listHarusOrder,
  ]);

  let year = new Date().getFullYear();

  const getYear = () => {
    let tmp = [];
    for (let i = 3; i >= 0; i--) {
      let years = year--;
      tmp.push({
        value: years,
        label: years,
      });
    }
    setListYear(tmp);
  };
  React.useEffect(() => {
    getYear();
  }, []);

  return (
    <>
      <Container fluid>
        <Row style={{ marginBottom: 20 }}>
          <Col md="8"></Col>
          <Col md="3">
            <Select
              className="react-select primary"
              classNamePrefix="react-select"
              name="singleSelect"
              value={singleSelect}
              onChange={(value) => {
                setTahun(value.value);
                setSingleSelect(value);
              }}
              options={listYear}
              placeholder="Tahun"
            />
          </Col>
          <Col md="1">
            <Button
              // disabled
              variant={listHarusOrder.length > 0 ? "danger" : "success"}
              onClick={() => {
                listHarusOrder.length > 0
                  ? setModal(!modal)
                  : alert("Seluruh Stock Tercukupi!!!");
              }}
              size="md"
              className="primary"
            >
              <FontAwesomeIcon icon={faBell} color={"#FFFFFF"} />
              {/* <i className="fa fa-edit" /> */}
            </Button>{" "}
          </Col>
        </Row>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <FontAwesomeIcon icon={faBowlFood} color={"blue"} />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Jenis Makanan</p>
                      <Card.Title as="h4">{jumlahMakanan} Makanan</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  {/* <i className="fas fa-redo mr-1"></i> */}
                  Detail
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <FontAwesomeIcon icon={faMugHot} color={"red"} />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Jenis Minuman</p>
                      <Card.Title as="h4">{jumlahMinuman} Minuman</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  {/* <i className="far fa-calendar-alt mr-1"></i> */}
                  Detail
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <FontAwesomeIcon icon={faUsers} color={"black"} />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Pembeli</p>
                      <Card.Title as="h4">{totalPelanggan}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  {/* <i className="far fa-clock-o mr-1"></i> */}
                  Detail
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <FontAwesomeIcon
                        icon={faMoneyBill1Wave}
                        color={"green"}
                      />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Pendapatan</p>
                      <Card.Title as="h4">
                        <CurrencyFormat
                          thousandSeparator={true}
                          prefix={"Rp "}
                          displayType={"text"}
                          value={pendapatan}
                        />
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">Detail</div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">
                  <b>Grafik Penjualan Tahun {tahun}</b>
                </Card.Title>
                {/* <p className="card-category">24 Hours performance</p> */}
              </Card.Header>
              <Card.Body>
                <ChartistGraph
                  data={{
                    labels: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "Mei",
                      "Jun",
                      "Jul",
                      "Agust",
                      "Sept",
                      "Okt",
                      "Nov",
                      "Des",
                    ],
                    series: [listPenghasilan],
                  }}
                  type="Line"
                  options={{
                    low: 0,
                    high: max,
                    showArea: false,
                    height: "245px",
                    axisX: {
                      showGrid: false,
                    },
                    lineSmooth: true,
                    showLine: true,
                    showPoint: true,
                    fullWidth: true,
                    chartPadding: {
                      right: 50,
                      left: 50,
                    },
                  }}
                  responsiveOptions={[
                    [
                      "screen and (max-width: 640px)",
                      {
                        axisX: {
                          labelInterpolationFnc: function (value) {
                            return value[0];
                          },
                        },
                      },
                    ],
                  ]}
                />
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle mr-1 text-info"></i>
                  Pendapatan tiap bulan
                </div>
                <hr></hr>
                {/* <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div> */}
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">
                  <b>Grafik Pelanggan Tahun {tahun}</b>
                </Card.Title>
                {/* <p className="card-category">24 Hours performance</p> */}
              </Card.Header>
              <Card.Body>
                <ChartistGraph
                  data={{
                    labels: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "Mei",
                      "Jun",
                      "Jul",
                      "Agust",
                      "Sept",
                      "Okt",
                      "Nov",
                      "Des",
                    ],
                    series: [listPelanggan],
                  }}
                  type="Line"
                  options={{
                    low: 0,
                    high: maxPel,
                    showArea: false,
                    height: "245px",
                    axisX: {
                      showGrid: false,
                    },
                    lineSmooth: true,
                    showLine: true,
                    showPoint: true,
                    fullWidth: true,
                    chartPadding: {
                      right: 50,
                      left: 50,
                    },
                  }}
                  responsiveOptions={[
                    [
                      "screen and (max-width: 640px)",
                      {
                        axisX: {
                          labelInterpolationFnc: function (value) {
                            return value[0];
                          },
                        },
                      },
                    ],
                  ]}
                />
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle mr-1 text-info"></i>
                  Pelanggan tiap bulan
                </div>
                <hr></hr>
                {/* <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div> */}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          {/* <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">2017 Sales</Card.Title>
                <p className="card-category">All products including Taxes</p>
              </Card.Header>
              <Card.Body>
                <ChartistGraph
                  data={{
                    labels: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "Mai",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    series: [
                      [
                        542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756,
                        895,
                      ],
                      [
                        412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636,
                        695,
                      ],
                    ],
                  }}
                  type="Bar"
                  options={{
                    seriesBarDistance: 10,
                    axisX: {
                      showGrid: false,
                    },
                    height: "245px",
                  }}
                  responsiveOptions={[
                    [
                      "screen and (max-width: 640px)",
                      {
                        seriesBarDistance: 5,
                        axisX: {
                          labelInterpolationFnc: function (value) {
                            return value[0];
                          },
                        },
                      },
                    ],
                  ]}
                />
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle mr-1 text-info"></i>
                  Tesla Model S{" "}
                  <i className="fas fa-circle mr-1 text-danger"></i>
                  BMW 5 Series
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col> */}
          {/* <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Tasks</Card.Title>
                <p className="card-category">Backend development</p>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Sign contract for "What are conference organizers
                          afraid of?"
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-688296980">
                                Edit Task..
                              </Tooltip>
                            }
                            placement="top"
                          >
                            <Button
                              className="btn-simple btn-link"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-202192706">Remove..</Tooltip>
                            }
                            placement="top"
                          >
                            <Button
                              className="btn-simple btn-link"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Lines From Great Russian Literature? Or E-mails From
                          My Boss?
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-746544352">
                                Edit Task..
                              </Tooltip>
                            }
                            placement="top"
                          >
                            <Button
                              className="btn-simple btn-link"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-743037005">Remove..</Tooltip>
                            }
                            placement="top"
                          >
                            <Button
                              className="btn-simple btn-link"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Flooded: One year later, assessing what was lost and
                          what was found when a ravaging rain swept through
                          metro Detroit
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-855684210">
                                Edit Task..
                              </Tooltip>
                            }
                            placement="top"
                          >
                            <Button
                              className="btn-simple btn-link"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-242945902">Remove..</Tooltip>
                            }
                            placement="top"
                          >
                            <Button
                              className="btn-simple btn-link"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Create 4 Invisible User Experiences you Never Knew
                          About
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-488557184">
                                Edit Task..
                              </Tooltip>
                            }
                            placement="top"
                          >
                            <Button
                              className="btn-simple btn-link"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-789597281">Remove..</Tooltip>
                            }
                            placement="top"
                          >
                            <Button
                              className="btn-simple btn-link"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Read "Following makes Medium better"</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-521344137">
                                Edit Task..
                              </Tooltip>
                            }
                            placement="top"
                          >
                            <Button
                              className="btn-simple btn-link"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-934093947">Remove..</Tooltip>
                            }
                            placement="top"
                          >
                            <Button
                              className="btn-simple btn-link"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Unfollow 5 enemies from twitter</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-97404283">
                                Edit Task..
                              </Tooltip>
                            }
                            placement="top"
                          >
                            <Button
                              className="btn-simple btn-link"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-888894273">Remove..</Tooltip>
                            }
                            placement="top"
                          >
                            <Button
                              className="btn-simple btn-link"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col> */}
        </Row>

        <Modal
          size="lg"
          show={modal}
          onHide={() => setModal(!modal)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              <b>List Stock Harus Order</b>
            </Modal.Title>
          </Modal.Header>
          <ModalBody>
            {listHarusOrder.map((val) => {
              return (
                <>
                  <div>
                    <p>Nama Barang : {val.namaBarang}</p>
                    <p>Stock : {val.totalStock}</p>
                    <p>Minimal Stock : {val.minimStock}</p>
                  </div>
                  <hr></hr>
                </>
              );
            })}
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
}

export default Dashboard;
