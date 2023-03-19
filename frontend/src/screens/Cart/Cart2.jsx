import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "./../../components/Message/Message";
import { addToCart, removeFromCart } from "./../../actions/cartActions";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Form,
  Container,
  Card,
} from "react-bootstrap";
import Meta from "../../components/Helmet/Meta";

const Cart = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cartSeed = useSelector((state) => state.cartSeed);
  const { cartItems } = cartSeed;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const iframe =
    '<iframe src="http://127.0.0.1:5001/" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;">Your browser doesn</iframe>';

  function Iframe(props) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
      />
    );
  }

  return (
    <div>
      <Iframe iframe={iframe} />,
    </div>
  );
};

export default Cart;
