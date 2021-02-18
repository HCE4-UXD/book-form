import "./App.scss";
import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: "",
    };
  }

  submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }

  render() {
    const { status } = this.state;
    return (
      <form
        action="https://formspree.io/f/mdopvzye"
        onSubmit={this.submitForm}
        method="POST"
      >
        <div className="firstname-lastname">
          <div className="input name">
            <label>First Name</label>
            <input type="text" name="firstName" required />
          </div>
          <div className="input name">
            <label>Last Name</label>
            <input type="text" name="lastName" required />
          </div>
        </div>

        <div className="input email">
          <label>Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="input email phone">
          <label>Phone Number (with area code/country code)</label>
          <input type="tel" name="phone" required />
        </div>
        <div className="disclaimer">
          <p>
            The purposes of data protection laws, HCE 4. Located at 11 avenue
            Rossellini, 69100 Villeurbanne, France, is the 'data controller' of
            your information collected in connection with the HCE Services 4.
          </p>
          <p>
            Your data is stored in the Wix data storage system and databases,
            and in the general Wix application. Your data is kept on a secure
            server protected by a firewall.
          </p>
          <p>
            To protect your personal data, we take reasonable precautions and
            follow industry best practices to ensure that it is not
            inappropriately lost, misused, accessed, disclosed, altered or
            destroyed.
          </p>
        </div>
        {status === "SUCCESS" ? (
          <p>
            Thank you for your interest in our book! We will get in touch with
            you shortly.
          </p>
        ) : (
          <button className="btn">Submit</button>
        )}
        {status === "ERROR" && <p>Ooops! There was an error.</p>}
      </form>
    );
  }
}
