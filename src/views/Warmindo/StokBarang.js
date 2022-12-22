import React from "react";
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

function StokBarang() {
  const dataTable = [
    ["Tiger Nixon", "System Architect", "Edinburgh", "61"],
    ["Garrett Winters", "Accountant", "Tokyo", "63"],
    ["Ashton Cox", "Junior Technical Author", "San Francisco", "66"],
    ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "22"],
    ["Airi Satou", "Accountant", "Tokyo", "33"],
    ["Brielle Williamson", "Integration Specialist", "New York", "61"],
    ["Herrod Chandler", "Sales Assistant", "San Francisco", "59"],
    ["Rhona Davidson", "Integration Specialist", "Tokyo", "55"],
    ["Colleen Hurst", "Javascript Developer", "San Francisco", "39"],
    ["Sonya Frost", "Software Engineer", "Edinburgh", "23"],
    ["Jena Gaines", "Office Manager", "London", "30"],
    ["Quinn Flynn", "Support Lead", "Edinburgh", "22"],
    ["Charde Marshall", "Regional Director", "San Francisco", "36"],
    ["Haley Kennedy", "Senior Marketing Designer", "London", "43"],
    ["Tatyana Fitzpatrick", "Regional Director", "London", "19"],
    ["Michael Silva", "Marketing Designer", "London", "66"],
    ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "64"],
    ["Gloria Little", "Systems Administrator", "New York", "59"],
    ["Bradley Greer", "Software Engineer", "London", "41"],
    ["Dai Rios", "Personnel Lead", "Edinburgh", "35"],
    ["Jenette Caldwell", "Development Lead", "New York", "30"],
    ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "40"],
    ["Caesar Vance", "Pre-Sales Support", "New York", "21"],
    ["Doris Wilder", "Sales Assistant", "Sidney", "23"],
    ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "47"],
    ["Gavin Joyce", "Developer", "Edinburgh", "42"],
    ["Jennifer Chang", "Regional Director", "Singapore", "28"],
    ["Brenden Wagner", "Software Engineer", "San Francisco", "28"],
    ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "48"],
    ["Shou Itou", "Regional Marketing", "Tokyo", "20"],
    ["Michelle House", "Integration Specialist", "Sidney", "37"],
    ["Suki Burks", "Developer", "London", "53"],
    ["Prescott Bartlett", "Technical Author", "London", "27"],
    ["Gavin Cortez", "Team Leader", "San Francisco", "22"],
    ["Martena Mccray", "Post-Sales support", "Edinburgh", "46"],
    ["Unity Butler", "Marketing Designer", "San Francisco", "47"],
    ["Howard Hatfield", "Office Manager", "San Francisco", "51"],
    ["Hope Fuentes", "Secretary", "San Francisco", "41"],
    ["Vivian Harrell", "Financial Controller", "San Francisco", "62"],
    ["Timothy Mooney", "Office Manager", "London", "37"],
    ["Jackson Bradshaw", "Director", "New York", "65"],
    ["Olivia Liang", "Support Engineer", "Singapore", "64"],
  ];

  const [data, setData] = React.useState(
    dataTable.map((prop, key) => {
      return {
        id: key,
        name: prop[0],
        position: prop[1],
        office: prop[2],
        age: prop[3],
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a like kind of action */}
            <Button
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                alert(
                  "You've clicked LIKE button on \n{ \nName: " +
                    obj.name +
                    ", \nposition: " +
                    obj.position +
                    ", \noffice: " +
                    obj.office +
                    ", \nage: " +
                    obj.age +
                    "\n}."
                );
              }}
              variant="info"
              size="sm"
              className="text-info btn-link like"
            >
              <i className="fa fa-heart" />
            </Button>{" "}
            {/* use this button to add a edit kind of action */}
            <Button
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                alert(
                  "You've clicked EDIT button on \n{ \nName: " +
                    obj.name +
                    ", \nposition: " +
                    obj.position +
                    ", \noffice: " +
                    obj.office +
                    ", \nage: " +
                    obj.age +
                    "\n}."
                );
              }}
              variant="warning"
              size="sm"
              className="text-warning btn-link edit"
            >
              <i className="fa fa-edit" />
            </Button>{" "}
            {/* use this button to remove the data row */}
            <Button
              onClick={() => {
                var newData = data;
                newData.find((o, i) => {
                  if (o.id === key) {
                    // here you should add some custom code so you can delete the data
                    // from this component and from your server as well
                    newData.splice(i, 1);
                    return true;
                  }
                  return false;
                });
                setData([...newData]);
              }}
              variant="danger"
              size="sm"
              className="btn-link remove text-danger"
            >
              <i className="fa fa-times" />
            </Button>{" "}
          </div>
        ),
      };
    })
  );
  const [modal, setModal] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [nama, setStok] = React.useState("");
  const notificationAlertRef = React.useRef(null);
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card.Header>
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
          </Card.Header>
          <Card.Body>
            <ReactTable
              data={data}
              columns={[
                {
                  Header: "Name",
                  accessor: "name",
                },
                {
                  Header: "Position",
                  accessor: "position",
                },
                {
                  Header: "Office",
                  accessor: "office",
                },
                {
                  Header: "Age",
                  accessor: "age",
                },
                {
                  Header: "Actions",
                  accessor: "actions",
                  sortable: false,
                  filterable: false,
                },
              ]}
              /*
                    You can choose between primary-pagination, info-pagination, success-pagination, warning-pagination, danger-pagination or none - which will make the pagination buttons gray
                  */
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
                          <label>Nama</label>
                          <Form.Control
                            onChange={(e) => {
                              setStok(e.target.value);
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
                      <Col md="3"></Col>
                      <Col md="9">
                        <Form.Check>
                          <Form.Check.Label>
                            <Form.Check.Input
                              defaultValue=""
                              type="checkbox"
                            ></Form.Check.Input>
                            <span className="form-check-sign"></span>
                            Remember me
                          </Form.Check.Label>
                        </Form.Check>
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col sm="12">
                        <Form.Group>
                          <label>Description</label>
                          <Form.Control
                            onChange={(e) => {
                              setDeskripsiTraining(e.target.value);
                              // setProject({
                              //   ...project,
                              //   deskripsi: e.target.value,
                              // });
                            }}
                            // placeholder="Tuliskan Deskripsi Project"
                            as="textarea"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row> */}
                    {/* <Row>
                      <Col sm="6">
                        <label>Start Date</label>
                        <Form.Group>
                          <ReactDatetime
                            inputProps={{
                              className: "form-control",
                              placeholder: "Date Picker Here",
                            }}
                            onChange={(e) => {
                              setDariTgl(e.toDate().setHours(7, 0, 0, 0));
                            }}
                            value={dariTgl}
                            initialValue={dariTgl}
                            timeFormat={false}
                          ></ReactDatetime>
                        </Form.Group>
                      </Col>
                      <Col sm="6">
                        <label>End Date</label>
                        <Form.Group>
                          <ReactDatetime
                            inputProps={{
                              className: "form-control",
                              placeholder: "Date Picker Here",
                            }}
                            onChange={(e) => {
                              setSmpTgl(e.toDate().setHours(23, 59, 0, 0));
                            }}
                            value={smpTgl}
                            initialValue={smpTgl}
                            timeFormat={false}
                          ></ReactDatetime>
                        </Form.Group>
                      </Col>
                    </Row> */}

                    <Button
                      className="btn-fill pull-right"
                      type="submit"
                      variant="info"
                      onClick={modal}
                    >
                      Submit
                    </Button>
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

export default StokBarang;
