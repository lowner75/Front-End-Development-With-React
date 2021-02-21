import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Col, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";

// Validators ...
const required  = (value)  => value && value.length;
const minLength = (minlen) => (value) => value && value.length >= minlen;
const maxLength = (maxlen) => (value) => !value || value.length <= maxlen;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
    // event.preventDefault();
  }

  render() {
    
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row>
                <Col className="mb-3">
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select model=".rating" name="rating" className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row>
                <Col className="mb-3">
                  <Label htmlFor="author">Your Name</Label>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                    }} />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mb-3">
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={this.toggleModal}
        >
          <i className="fa fa-pencil"></i> Submit Comment
        </button>
      </div>
    );
  }
}

// function RenderDish () ...
function RenderDish({dish}) {

  if (dish != null) {

    return (
      <div>
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>
              <h4>{dish.name}</h4>
            </CardTitle>
            <CardText> {dish.description} </CardText>
          </CardBody>
        </Card>
      </div>
    );

  } else {

    // Else, if dish is empty ...
    return (
      <div></div>
    );

  }
}

// function RenderComments () ...
function RenderComments({comments}) {

  if (comments != null) {

    const cmnts = comments.map((item) => {
    return (
      <ul key={item.id} className="list-unstyled">
        <li>
          <p> {item.comment} </p>
          <p>
            {" "}
            -- {item.author}, &nbsp;{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(item.date)))}
          </p>
        </li>
      </ul>
    );
    });

    return (
      <div>
        <h4> Comments </h4>
        {cmnts}
        <CommentForm />
      </div>
    );  

  // Else, if comments are empty ...
  } else {
    return (
      <div></div>
    );
  }

}

const DishDetail = (props) => {

  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }

}
    
export default DishDetail;