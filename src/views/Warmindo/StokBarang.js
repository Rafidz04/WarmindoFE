import React from "react";
import Select from "react-select";
import { addStok, deleteStok, editStok, getAllStock } from "../../stores";
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
  ModalBody,
} from "react-bootstrap";
import ReactTable from "components/ReactTable/ReactTable.js";
import CurrencyFormat from "react-currency-format";
import Swal from 'sweetalert2'

function StokBarang() {
  //2
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);
  // console.log(">>>>>>>>>>>>>>.",auth.listStock)
  const history = useHistory();

  const [modal, setModal] = React.useState(false);
  const [modalEdit, setModalEdit] = React.useState(false);
  const [harga, setHarga] = React.useState(0);
  const [totalStock, setTotalStock] = React.useState(0);
  const [kategori, setKategori] = React.useState("");
  const [namaBarang, setNamaBarang] = React.useState("");
  const [validasi, setValidasi] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const notificationAlertRef = React.useRef(null);
  const [foto, setFoto] = React.useState(null);
  const [idStock, setIdStock] = React.useState("");

  //3
  const [listStock, setListStock] = React.useState([]);
  const dataTable = [];

  //1
  React.useEffect(() => {
    getAllStock(dispatch);
  }, []);

  //5
  React.useEffect(() => {
    let tmp = [];
    auth.listStock &&
      auth.listStock.map((val) => {
          tmp.push({
            ...val,
            harga: (
              <CurrencyFormat
                thousandSeparator={true}
                prefix={"Rp "}
                displayType={"text"}
                value={val.harga}
              />
            ),
            //harga:`Rp ${val.harga}`,
            image: <img src={val.fotoProduk}></img>,
            actions: <div className="actions-right">
                <Button
                  onClick={() => {
                    console.log(val);
                    setIdStock(val._id);
                    setTotalStock(val.totalStock);
                    setHarga(val.harga);
                    setModalEdit(!modalEdit);
                  }}
                  size="sm"
                  className="primary"
                >
                  Edit
                  {/* <i className='fa fa-edit' /> */}
                </Button>{" "}
                <Button
                onClick={() => {
                  Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteStok(dispatch,val._id).then((response)=>{
                        getAllStock(dispatch);
                        Swal.fire(
                          'Deleted!',
                          'Stok berhasil dihapus!',
                          'success'
                        )
                      })
                      
                    }
                  })
                 
                }}
                size="sm"
                variant="danger"
                className="danger"
              >
                Delete
                {/* <i className='fa fa-edit' /> */}
              </Button>{" "}
              </div>
            
          })
       
      }, []);
    setListStock(tmp);
  }, [auth.listStock]);
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card.Header>
            <Card.Title as="h4">
              List Stok{" "}
              {auth.role===1?<Button
                className="btn-wd mr-1"
                variant="primary"
                style={{ marginLeft: 25 }}
                onClick={() => setModal(!modal)}
              >
                Add Stok
              </Button>:null}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <ReactTable
              //6
              data={listStock}
              columns={[
                {
                  Header: "Nama Barang",
                  accessor: "namaBarang",
                },

                {
                  Header: "Harga",
                  accessor: "harga",
                },
                {
                  Header: "Total Stock Barang",
                  accessor: "totalStock",
                },
                {
                  Header: "Kategori",
                  accessor: "kategori",
                },
                {
                  Header: "Foto Produk",
                  accessor: "image",
                },
                {
                  Header: `${auth.role===1?"Aksi":""}`,
                  accessor: `${auth.role===1?"actions":"action"}`,
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
                      <Card.Title as="h4">Add Stok</Card.Title>
                    </Card.Header>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col sm="12">
                        <Form.Group>
                          <label>Nama Barang</label>
                          <Form.Control
                            onChange={(e) => {
                              setNamaBarang(e.target.value);
                              // setDataBaru({
                              //   ...dataBaru,
                              //   gedung: e.target.value,
                              // });
                            }}
                            // placeholder="Masukan Nama Gedung"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <Form.Group>
                          <label>Total Stock</label>
                          <Form.Control
                            onChange={(e) => {
                              setTotalStock(e.target.value);
                              // setDataBaru({
                              //   ...dataBaru,
                              //   gedung: e.target.value,
                              // });
                            }}
                            // placeholder="Masukan Nama Gedung"
                            type="number"
                            min={0}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <Form.Group>
                          <label>Harga</label>
                          <Form.Control
                            onChange={(e) => {
                              setHarga(e.target.value);
                              // setDataBaru({
                              //   ...dataBaru,
                              //   gedung: e.target.value,
                              // });
                            }}
                            // placeholder="Masukan Nama Gedung"
                            type="number"
                            min={0}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <Form.Group>
                          <label>Status</label>
                          <Select
                            className="react-select primary"
                            classNamePrefix="react-select"
                            name="singleSelect"
                            value={kategori}
                            onChange={(value) => setKategori(value)}
                            options={[
                              { value: "makanan", label: "Makanan" },
                              { value: "minuman", label: "Minuman" },
                            ]}
                            placeholder="Pilih"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <input
                      type={"file"}
                      onChange={(e) => {
                        setFoto(e.target.files[0]);
                      }}
                    />
                    <p>
                      {validasi ? (
                        <label style={{ color: "red" }}>{message}</label>
                      ) : null}
                    </p>

                    <p>
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                        onClick={(e) => {
                          e.preventDefault();

                          addStok(dispatch, {
                            namaBarang: namaBarang,
                            harga: harga,
                            totalStock: totalStock,
                            kategori: kategori,
                            fotoProduk: foto,
                          }).then((val) => {
                            if (val.status === 200) {
                              //7
                              setModal(!modal);
                              // window.location.reload();
                              getAllStock(dispatch);
                              setValidasi(false);
                            } else {
                              setValidasi(true);
                              setMessage(val.data.message);
                            }
                          });
                        }}
                      >
                        Submit
                      </Button>
                    </p>

                    <div className="clearfix"></div>
                  </Card.Body>
                </Card>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={modalEdit}
        onHide={() => setModalEdit(!modalEdit)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title> */}
        </Modal.Header>
        <ModalBody>
          <Row>
            <Col md="12">
              <Form action="" className="form" method="">
                <Card.Title as="h5">Edit Stok</Card.Title>
                <Row>
                  <Col sm="12">
                    <Form.Group>
                      <label>Total Stock</label>
                      <Form.Control
                        value={totalStock}
                        onChange={(e) => {
                          setTotalStock(e.target.value);
                          // setDataBaru({
                          //   ...dataBaru,
                          //   gedung: e.target.value,
                          // });
                        }}
                        // placeholder="Masukan Nama Gedung"
                        type="number"
                        min={0}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <Form.Group>
                      <label>Harga</label>
                      <Form.Control
                        value={harga}
                        onChange={(e) => {
                          setHarga(e.target.value);
                          // setDataBaru({
                          //   ...dataBaru,
                          //   gedung: e.target.value,
                          // });
                        }}
                        // placeholder="Masukan Nama Gedung"
                        type="number"
                        min={0}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <p>
            <Button
              className="btn-fill pull-right"
              type="submit"
              variant="info"
              onClick={(e) => {
                e.preventDefault();
                editStok(dispatch, {
                  idStock: idStock,
                  totalStock: totalStock,
                  harga: harga,
                }).then((respon) => {
                  if (respon.status === 200) {
                    setModalEdit(!modalEdit);
                    getAllStock(dispatch);
                    setIdStock("");
                    setTotalStock(0);
                    setHarga(0);
                  }
                });
                // console.log(idStock, totalStock, harga);
              }}
            >
              Submit
            </Button>
          </p>
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default StokBarang;
