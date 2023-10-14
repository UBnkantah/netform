import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const ContactForm = () => {

    const encode = (data) => {
        return Object.keys(data).map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join("&")
    }

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

    const contactInfo = {name, email, address}

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        fetch("/", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: encode({"form-name": "contact", ...contactInfo})
        }).then(() => alert("Success!"))
        .catch(err => alert(err));
      setLoading(false)
      setName('')
      setAddress('')
      setEmail('')
    }


  return (
    <div style={{width: "500px"}}>
<Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Full Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="number" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
      </Form.Group>

      <Button variant="primary" type="submit">
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </Form>
    </div>
    
  )
}

export default ContactForm;