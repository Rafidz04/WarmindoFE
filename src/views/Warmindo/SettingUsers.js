import React from "react";
import Select from "react-select";
import {
  addUser,
  deleteUser,
  editPassword,
  getAllUser,
  logout,
} from "../../stores";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Modal,
  Pagination,
  Container,
  Row,
  Col,
  ModalBody,
} from "react-bootstrap";
import ReactTable from "components/ReactTable/ReactTable.js";
import NotificationAlert from "react-notification-alert";

function SettingUsers() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);

  const history = useHistory();

  const [modal, setModal] = React.useState(false);
  const [modalEdit, setModalEdit] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [nama, setNama] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [validasi, setValidasi] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [idUser, setIdUser] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [singleSelect, setSingleSelect] = React.useState("");
  const notificationAlertRef = React.useRef(null);

  const [listUser, setListUser] = React.useState([]);
  const dataTable = [];

  React.useEffect(() => {
    getAllUser(dispatch);
  }, []);

  React.useEffect(() => {
    console.log(auth.role);
    let tmp = [];
    auth.listUser &&
      auth.listUser.map((val) => {
        tmp.push({
          ...val,
          status: val.role === 1 ? "owner" : "kasir",
          actionss:
          val.email===localStorage.getItem("email")?
          (<div className="actions-right">
          <Button
            variant="warning"
            onClick={() => {
              setIdUser(val._id);
              setModalEdit(!modalEdit);
            }}
            size="sm"
            className="warning"
            style={{width:150}}
          >
            Edit Password
            {/* <i className='fa fa-edit' /> */}
          </Button></div>):null,
          actions: (
            <div className="actions-right">
              <Button
                variant="warning"
                onClick={() => {
                  setIdUser(val._id);
                  setModalEdit(!modalEdit);
                }}
                size="sm"
                className="warning"
              >
                Edit Password
                {/* <i className='fa fa-edit' /> */}
              </Button>{" "}
              {val.role === 1 ? null : (
                <Button
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteUser(dispatch, val._id).then((response) => {
                          getAllUser(dispatch);
                          Swal.fire(
                            "Deleted!",
                            "User berhasil dihapus!",
                            "success"
                          );
                        });
                      }
                    });
                  }}
                  size="sm"
                  variant="danger"
                  className="danger"
                >
                  Delete
                  {/* <i className='fa fa-edit' /> */}
                </Button>
              )}
            </div>
          ),
          // image:<img src={val.fotoProduk}></img>
        });
      }, []);
    setListUser(tmp);
  }, [auth.listUser]);
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card.Header>
            <Card.Title as="h4">
              List User{" "}
              {auth.role === 1 ? (
                <Button
                  className="btn-wd mr-1"
                  variant="primary"
                  style={{ marginLeft: 25 }}
                  onClick={() => setModal(!modal)}
                >
                  Add User
                </Button>
              ) : null}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <ReactTable
              data={listUser}
              columns={[
                {
                  Header: "Email",
                  accessor: "email",
                },
                {
                  Header: "Nama",
                  accessor: "nama",
                },
                {
                  Header: "Status",
                  accessor: "status",
                },
                {
                  Header: `${auth.role === 2 ? "Aksi" : ""}`,
                  accessor: `${auth.role === 2 ? "actionss" : "actionsss"}`,
                  sortable: false,
                  filterable: false,
                },
                {
                  Header: `${auth.role === 2 ? "" : "Aksi"}`,
                  accessor: `${auth.role === 2 ? "action" : "actions"}`,
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
                      <Card.Title as="h4">Add User</Card.Title>
                    </Card.Header>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col sm="12">
                        <Form.Group>
                          <label>Email</label>
                          <Form.Control
                            onChange={(e) => {
                              setEmail(e.target.value);
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
                          <label>Nama</label>
                          <Form.Control
                            onChange={(e) => {
                              setNama(e.target.value);
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
                          <label>Password</label>
                          <Form.Control
                            onChange={(e) => {
                              setPassword(e.target.value);
                              // setDataBaru({
                              //   ...dataBaru,
                              //   gedung: e.target.value,
                              // });
                            }}
                            // placeholder="Masukan Nama Gedung"
                            type="password"
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
                            value={role}
                            onChange={(value) => setRole(value)}
                            options={[
                              { value: "1", label: "Owner" },
                              { value: "2", label: "Kasir" },
                            ]}
                            placeholder="Pilih"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {validasi ? (
                      <label style={{ color: "red" }}>{message}</label>
                    ) : null}
                    <p>
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                        onClick={(e) => {
                          e.preventDefault();
                          //console.log({email:email,password:password,nama:nama,role:role})
                          addUser(
                            dispatch,
                            {
                              email: email,
                              password: password,
                              nama: nama,
                              role: role,
                            },
                            history
                          ).then((val) => {
                            if (val.status === 200) {
                              // window.location.reload()
                              getAllUser(dispatch);
                              setValidasi(false);
                              Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "User berhasil ditambahkan!",
                                showConfirmButton: false,
                                timer: 1500,
                              });
                              setModal(!modal);
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
        <Modal.Header closeButton></Modal.Header>
        <ModalBody>
          <Row>
            <Col md="12">
              <Form action="" className="form" method="">
                <Card.Title as="h5">Edit Password</Card.Title>
                <Row>
                  <Col sm="12">
                    <Form.Group>
                      <label>Password Baru</label>
                      <Form.Control
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                        }}
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
                console.log(newPassword, idUser);
                editPassword(dispatch, {
                  idUser: idUser,
                  password: newPassword,
                }).then((respon) => {
                  if (respon.status === 200) {
                    // setModalEdit(!modalEdit);
                    // getAllUser(dispatch);
                    // setIdUser("");
                    // setNewPassword("")
                    logout();
                  }
                });
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

export default SettingUsers;
