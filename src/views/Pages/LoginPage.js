import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../stores';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Col,
} from 'react-bootstrap';
import Swal from "sweetalert2";

function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [cardClasses, setCardClasses] = React.useState('card-hidden');
  React.useEffect(() => {
    setTimeout(function () {
      setCardClasses('');
    }, 1000);
  });
  return (
    <>
      <div
        className='full-page section-image'
        data-color='black'
        data-image={require('assets/img/full-screen-image-2.jpg').default}
      >
        <div className='content d-flex align-items-center p-0'>
          <Container>
            <Col className='mx-auto' lg='4' md='8'>
              <Form action='' className='form' method=''>
                <Card className={'card-login ' + cardClasses}>
                  <Card.Header>
                    <h3 className='header text-center'>Login</h3>
                  </Card.Header>
                  <Card.Body>
                    <Card.Body>
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                          placeholder='Enter email'
                          type='email'
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          placeholder='Password'
                          type='password'
                        ></Form.Control>
                      </Form.Group>
                    </Card.Body>
                  </Card.Body>
                  <Card.Footer className='ml-auto mr-auto'>
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        {username==="" || password ===""?Swal.fire({
                          position: 'center',
                          icon: 'error',
                          title: 'Email atau password tidak boleh kosong',
                          showConfirmButton: false,
                          timer: 1500
                        }): login(dispatch, { username, password }, history);}
                       
                      }}
                      className='btn-wd'
                      type='submit'
                      variant='warning'
                    >
                      Login
                    </Button>
                  </Card.Footer>
                </Card>
              </Form>
            </Col>
          </Container>
        </div>
        <div
          className='full-page-background'
          style={{
            backgroundImage:
              'url(' +
              require('assets/img/bgnew.jpeg').default +
              ')',
          }}
        ></div>
      </div>
    </>
  );
}

export default LoginPage;
