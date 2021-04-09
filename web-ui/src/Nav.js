import { Nav, Row, Col, Form,
    Button, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState } from 'react';

import { api_login } from './api';

function LoginForm() {
const [name, setName] = useState("");
const [pass, setPass] = useState("");

function on_submit(ev) {
ev.preventDefault();
api_login(name, pass);
}

return (
<Form onSubmit={on_submit} inline>
 <Form.Control name="name"
               type="text"
               onChange={(ev) => setName(ev.target.value)}
               value={name} />
 <Form.Control name="password"
               type="password"
               onChange={(ev) => setPass(ev.target.value)}
               value={pass} />
 <Button variant="secondary" type="submit">
   Login
 </Button>
</Form>
);
}

let SessionInfo = connect()(({session, dispatch}) => {
function logout() {
dispatch({type: 'session/clear'});
}
return (
<p>
 Logged in as {session.name} &nbsp;
 <Button onClick={logout}>Logout</Button>
</p>
);
});

function LOI({session}) {
if (session) {
return <SessionInfo session={session} />;
}
else {
return <LoginForm />;
}
}

const LoginOrInfo = connect(
({session}) => ({session}))(LOI);

function Link({to, children}) {
return (
<Nav.Item>
 <NavLink to={to} exact className="nav-link"
          activeClassName="active">
   {children}
 </NavLink>
</Nav.Item>
);
}

function AppNav({error}) {
let error_row = null;

if (error) {
error_row = (
 <Row>
   <Col>
     <Alert variant="danger">{error}</Alert>
   </Col>
 </Row>
);
}

return (
<div>
 {/* <Row>
   <Col> */}
   <Nav class="navbar navbar-light" style={{backgroundColor: '#fc5d35'}}
     variant="pills">
       <Link to="/">Home</Link>
       <Link to="/users">Users</Link>
       <Link to="/recipes">Recipe Search</Link>
       <Link to="/video">Live Stream</Link>
       <Link to="/profile">My Stuff</Link>
     </Nav>
     <LoginOrInfo />
   {/* </Col>
 </Row> */}
 { error_row }
</div>
);
}

export default connect(({error}) => ({error}))(AppNav);