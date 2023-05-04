import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../app/store";
import styled from "styled-components";
import Navbar from "../components/Homepage/Navbar.jsx";

const FormContainer = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.body};
`;

const Form = styled.form`
  max-width: 300px;
  padding: 70px;
  margin-left: auto;
  margin-right: auto;
  background: ${(props) => props.theme.thirdBg};
  display: grid;
  flex-direction: column;
  border-radius: 5px;
`;

const Input = styled.input`
  padding: 10px;
  outline-width: 1px;
  height: 40px;
  margin-bottom: 14px;
  border-radius: 5px;
  border: none;
  padding: 5px 15px;
`;
const Select = styled.select`
  outline-width: 0;
  height: 40px;
  margin-bottom: 14px;
  border-radius: 5px;
  border: none;
  padding: 5px 15px;
`;

const Button = styled.button`
  padding: 16px 20px;
  background-color: #e50914;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 2px;
  color: #fff;
`;

const Link = styled.span`
  margin: 0 5px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const AuthForm = ({ name, displayName }) => {
  const error = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    if (!username || !password) {
      alert("Please fill out all fields");
      return;
    }

    dispatch(authenticate({ username, password, method: formName }));

    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <FormContainer>
        <Form onSubmit={handleSubmit} name={name}>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            {displayName}
          </h1>
          <Input placeholder="Username" name="username" type="text" />
          <Input placeholder="Password" name="password" type="password" />

          <Button type="submit">{displayName}</Button>

          <div style={{ marginTop: "10px" }}>
            New to Rentility?
            <Link href="/login" onClick={() => navigate("/signup")}>
              Sign Up
            </Link>
          </div>
          {error && <div style={{ color: "red" }}>{error.error}</div>}
        </Form>
      </FormContainer>
    </>
  );
};

export default AuthForm;
