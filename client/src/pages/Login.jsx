import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";



const Login = () => {
       const { loginUser,
              loginError,
              loginInfo,
              isLoginloading,
              updateLoginInfo } = useContext(AuthContext);
       return <>
              <Form onSubmit={loginUser}>
                     <Row style={{
                            height: "100vh",
                            justifyContent: "center",
                            paddingTop: "10%"
                     }}>
                            <Col xs={6}>
                                   <Stack gap={3}>
                                          <h2>Login</h2>

                                          <Form.Control type="email" placeholder="Email" onChange={(e)=>updateLoginInfo({...loginInfo,email:e.target.value})}/>
                                          <Form.Control type="password" placeholder="Password"  onChange={(e)=>updateLoginInfo({...loginInfo,password:e.target.value})}/>
                                          <Button varient="primary" type="submit">
                                                 {
                                                        isLoginloading?  "Getting You In....":"Login"
                                                 }
                                                 
                                                 
                                                 </Button>
                                                 {
                                                        loginError?.error &&  <> <Alert varient="danger"><p>
                                                       {loginError?.message}
                                                        </p></Alert></>
                                                 }
                                         

                                   </Stack>
                            </Col>
                     </Row>
              </Form>
       </>;
}

export default Login;