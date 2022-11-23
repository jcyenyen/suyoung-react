import React from 'react'
import Card from 'react-credit-cards'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/Credit-Card.scss'
import { motion } from 'framer-motion'

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from './utils'

import 'react-credit-cards/es/styles-compiled.css'
import { clearConfigCache } from 'prettier'

export default class App extends React.Component {
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
  }

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer })
    }
  }

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    })
  }

  autoInput = ({ target }) => {
    this.props.setInputs({
      number: '5568 8556 8855 6885',
      name: 'bearbear',
      expiry: '1227',
      cvc: '688',
    });
    this.setState({
      number: '5568 8556 8855 6885',
      name: 'bearbear',
      expiry: '12/27',
      cvc: '688',
    })
  }

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value)
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value)
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value)
    }

    //console.log(this.props)
    this.props.setInputs({ ...this.props.inputs, [target.name]: target.value })
    // console.log(this.props.inputs)
    this.setState({ [target.name]: target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { issuer } = this.state
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value
        return acc
      }, {})

    this.setState({ formData })
    this.form.reset()
  }

  render(props) {
    const { name, number, expiry, cvc, focused, issuer } = this.state
    const { handleSubmit } = this.props

    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div key="Payment">
            <h1 className="first_component_title">信用卡付款</h1>
            <div className="App-payment">
              <div className="card_flex">
                <Card
                  number={number}
                  name={name}
                  expiry={expiry}
                  cvc={cvc}
                  focused={focused}
                  callback={this.handleCallback}
                />
                <form ref={(c) => (this.form = c)} onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="number"
                      className="form-control"
                      placeholder="卡號"
                      pattern="[\d| ]{16,22}"
                      maxLength="19"
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                      value={this.state.number}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="姓名"
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                      value={this.state.name}
                    />
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <input
                        type="tel"
                        name="expiry"
                        className="form-control"
                        placeholder="Valid Thru"
                        pattern="\d\d/\d\d"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        value={this.state.expiry}
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="tel"
                        name="cvc"
                        className="form-control"
                        placeholder="卡片背後三碼"
                        maxLength="3"
                        pattern="\d{3,4}"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        value={this.state.cvc}
                      />
                    </div>
                  </div>
                  <input type="hidden" name="issuer" value={issuer} />
                </form>
              </div>
              <div className="form-actions submit">
                <button className="btn" onClick={handleSubmit}>
                  送出
                </button>
                <button className="btn" onClick={this.autoInput}>
                  自動填入
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )
  }
}
