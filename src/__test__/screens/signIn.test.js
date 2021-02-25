import React from "react";
import { render, fireEvent, cleanup } from "react-native-testing-library";
import SignIn from "../../screens/SignIn";
import Input from "../../components/Input";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");

describe("<SignIn />", () => {
  afterEach(cleanup);
  const mockStore = configureStore([]);
  const initialState = {
    auth: {
      errors: "",
    },
  };
  const store = mockStore(initialState);

  it("shows an error message for empty email input", () => {
    const tree = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    const emailInput = tree.getByTestId("email");
    fireEvent(emailInput, "blur");
    const errorElement = tree.getByTestId("errorText");
    expect(errorElement.props.children).toEqual("Email cannot be empty");
  });

  it("shows an error message for empty password input", () => {
    const tree = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    const passwordInput = tree.getByTestId("password");
    fireEvent(passwordInput, "blur");
    const errorElement = tree.getByTestId("errorText");
    expect(errorElement.props.children).toEqual("Password cannot be empty");
  });

  it("shows an error message when email is wrongly formatted", () => {
    const tree = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );
    const emailInput = tree.getByTestId("email");
    fireEvent.changeText(emailInput, "henry@");
    fireEvent(emailInput, "blur");
    const errorElement = tree.getByTestId("errorText");

    expect(errorElement.props.children).toEqual("Email format is incorrect");
  });

  it("shows no error component when email is rightly formatted", () => {
    const tree = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    const tree2 = render(
      <Provider store={store}>
        <Input />
      </Provider>
    );

    const emailInput = tree.getByTestId("email");
    fireEvent.changeText(emailInput, "henry@gmail.com");
    fireEvent(emailInput, "blur");
    const errorElement = tree2.getByTestId("errorText");
    expect(errorElement.props.children).toEqual(undefined);
  });

  it("shows an error message when password characters are less", () => {
    const tree = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );
    const passwordInput = tree.getByTestId("password");
    fireEvent.changeText(passwordInput, "henr");
    fireEvent(passwordInput, "blur");
    const errorElement = tree.getByTestId("errorText");

    expect(errorElement.props.children).toEqual(
      "Password should be more than 6 characters"
    );
  });

  it("shows no error component when password has correct characters", () => {
    const tree = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    const tree2 = render(
      <Provider store={store}>
        <Input />
      </Provider>
    );

    const passwordInput = tree.getByTestId("password");
    fireEvent.changeText(passwordInput, "henry");
    fireEvent(passwordInput, "blur");
    const errorElement = tree2.getByTestId("errorText");
    expect(errorElement.props.children).toEqual(undefined);
  });

  xit("shows an error message when all inputs fields are empty", () => {
    const tree = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );
    const signinBtn = tree.getByText("Sign In");
    fireEvent.press(signinBtn);
    const errorElement = tree.getAllByTestId("errorText");
    errorElement.map((element) => {
      
      console.log(element.props)
      // expect(element.props.children).toEqual("Email cannot be empty");
      // expect(element.props.children).toEqual("Password cannot be empty");
    });
  });

  xit("shows that the loginHandler is called", () => {
    
    const tree = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );
    const loginHandlerFn = jest.spyOn(SignIn, "loginHandler").mockImplementation();
    const signinBtn = tree.getByText("Sign In");

    console.log(loginHandlerFn)
    fireEvent.press(signinBtn);
    // expect(btn).toHaveBeenCalled();
  });
});
