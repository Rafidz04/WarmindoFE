import React from "react";
import Select from "react-select";
import { addOrder, getAllOrder } from "../../stores";
//4
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Form,
  Modal,
  InputGroup,
  Navbar,
  Nav,
  Pagination,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import ReactTable from "components/ReactTable/ReactTable.js";
import CurrencyFormat from "react-currency-format";

function Penjualan() {
  //2
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);
  // console.log(">>>>>>>>>>>>>>.",auth.listStock)
  const history = useHistory();

  const [modal, setModal] = React.useState(false);
  const [idStock, setIdStock] = React.useState(0);
  const [namaPelanggan, setNamaPelanggan] = React.useState("");
  const [kuantitas, setKuantitas] = React.useState("");
  const [totalKuantitas, setTotalKuantitas] = React.useState("");
  const [validasi, setValidasi] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const notificationAlertRef = React.useRef(null);
  const [foto, setFoto] = React.useState(null);
  const [dataUser, setDataUser] = React.useState({});
  const [totalHarga, setTotalHarga] = React.useState(0);

  //3
  const [listOrder, setListOrder] = React.useState([]);
  const dataTable = [];

  //1
  React.useEffect(() => {
    getAllOrder(dispatch);
  }, []);

  //5
  React.useEffect(() => {
    let tmp = [];
    auth.listOrder &&
      auth.listOrder.map((val) => {
        let harga = 0;
        val.items.map((value) => {
          harga += value.totalKuantitas;
        });
        tmp.push({
          ...val,
          totalHarga: (
            <CurrencyFormat
              thousandSeparator={true}
              prefix={"Rp "}
              displayType={"text"}
              value={harga}
            />
          ),
          actions: (
            <div className="actions-right">
              <Button
                className="btn-wd btn-outline mr0"
                type="button"
                variant="info"
                onClick={() => {
                  console.log(val);
                  setModal(!modal);
                  setDataUser(val);
                  setTotalHarga(harga);
                }}
              >
                <span className="btn-label">
                  <i className="fas fa-exclamation"></i>
                </span>
                Info
              </Button>{" "}
              {/* <Button
                onClick={() => {
                  console.log(val);
                  setModal(!modal);
                  setDataUser(val);
                  setTotalHarga(harga);
                }}
                size="sm"
                className="primary"
              >
                Detail
              </Button>{" "} */}
            </div>
          ),
        });
      }, []);
    setListOrder(tmp);
  }, [auth.listOrder]);
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          {/* <Card.Header>
            <Card.Title as="h4">
              List Stok{" "}
              <Button
                className="btn-wd mr-1"
                variant="primary"
                style={{ marginLeft: 25 }}
                onClick={() => setModal(!modal)}
              >
                Add Stok
              </Button>
            </Card.Title>
          </Card.Header> */}
          <Card.Body>
            <ReactTable
              data={listOrder}
              columns={[
                {
                  Header: "Nama Pelanggan",
                  accessor: "namaPelanggan",
                },
                {
                  Header: "Total Pembayaran",
                  accessor: "totalHarga",
                },
                {
                  Header: "Aksi",
                  accessor: "actions",
                  sortable: false,
                  filterable: false,
                },
              ]}
              className="-striped -highlight primary-pagination"
            />
          </Card.Body>
        </Col>
      </Row>
      <Modal
        size="lg"
        show={modal}
        onHide={() => setModal(!modal)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md="12">
              <Form action="" className="form" method="">
                <Card>
                  <Card.Header>
                    <Card.Header>
                      <Card.Title as="h4">
                        <b>Detail</b>
                      </Card.Title>
                    </Card.Header>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col sm="3">
                        <label style={{ textTransform: "none", fontSize: 14 }}>
                          Nama Pelanggan
                        </label>
                      </Col>
                      <Col sm="0.5">
                        <label style={{ textTransform: "none", fontSize: 14 }}>
                          :
                        </label>
                      </Col>
                      <Col sm="8">
                        <label style={{ textTransform: "none", fontSize: 14 }}>
                          {dataUser.namaPelanggan}
                        </label>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3">
                        <label style={{ textTransform: "none", fontSize: 14 }}>
                          Total Harga
                        </label>
                      </Col>
                      <Col sm="0.5">
                        <label style={{ textTransform: "none", fontSize: 14 }}>
                          :
                        </label>
                      </Col>
                      <Col sm="8">
                        <label style={{ textTransform: "none", fontSize: 14 }}>
                          <CurrencyFormat
                            thousandSeparator={true}
                            prefix={"Rp "}
                            displayType={"text"}
                            value={totalHarga}
                          />
                        </label>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                      <Col sm="12">
                        <label style={{ textTransform: "none", fontSize: 14 }}>
                          <b>List Barang</b>
                        </label>
                      </Col>
                      <Col sm="12">
                        <table
                          style={{ width: "100%", borderCollapse: "collapse" }}
                        >
                          <tr
                            style={{
                              border: "1px solid #dddddd",
                              padding: "10px",
                            }}
                          >
                            <th>Nama Barang</th>
                            <th>Harga Satuan</th>
                            <th>Jumlah</th>
                            <th>Total Harga</th>
                          </tr>

                          {dataUser.items &&
                            dataUser.items.map((val) => {
                              return (
                                <tr
                                  style={{
                                    border: "1px solid #dddddd",
                                    padding: "10px",
                                  }}
                                >
                                  <td>{val.namaBarang}</td>
                                  <td>{val.hargaBarang}</td>
                                  <td>{val.kuantitas}</td>
                                  <td>{val.totalKuantitas}</td>
                                </tr>
                              );
                            })}
                        </table>
                      </Col>
                    </Row>

                    <div className="clearfix"></div>
                  </Card.Body>
                </Card>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Penjualan;
