import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

// function RenderDish(props) ...
function RenderDish({dish}) {
    if (dish != null) {

        return (
          <div className="col-12 col-md-5 m-1">
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

        return (
            <div></div>
        );

    }
}

// function RenderComments(props) ...
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
            <div className="col-12 col-md-5 m-1 mt-3">
                <h4> Comments </h4>
                {cmnts}
            </div>
        );  

    // Else, if comments is empty ...
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
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.dish.comments} />
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