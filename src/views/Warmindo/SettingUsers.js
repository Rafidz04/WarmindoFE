import React from "react";
import Select from "react-select";
import { addUser, getAllUser } from "../../stores";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
} from "react-bootstrap";
import ReactTable from "components/ReactTable/ReactTable.js";
import NotificationAlert from "react-notification-alert";

function SettingUsers() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);
  console.log("<<<<<<<<<<",auth.listUser)
  const history = useHistory();

  const [modal, setModal] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [nama, setNama] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [validasi, setValidasi] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [singleSelect, setSingleSelect] = React.useState("");
  const notificationAlertRef = React.useRef(null);

  const [listUser, setListUser] = React.useState([])
  const dataTable = [];

  React.useEffect(() => {
    getAllUser(dispatch)
   }, []);

  React.useEffect(()=>{
    let tmp = []
    auth.listUser 
    && auth.listUser.map((val)=>{
      tmp.push({
        ...val,
        status:val.role===1?"owner":"kasir",
        // image:<img src={val.fotoProduk}></img>
      })
    },[])
    setListUser(tmp)
  },[auth.listUser])
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card.Header>
            <Card.Title as="h4">
              List User{" "}
              <Button
                className="btn-wd mr-1"
                variant="primary"
                style={{ marginLeft: 25 }}
                onClick={() => setModal(!modal)}
              >
                Add User
              </Button>
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
                  Header: "",
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
                              window.location.reload()
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
    </Container>
  );
}

export default SettingUsers;

