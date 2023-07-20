import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Rating } from "react-simple-star-rating";
import { IoPersonCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";

const ProductReview = ({
  token,
  setRating,
  productId,
  setgetLatestProductUpdate,
}) => {
  const [reviews, setReviews] = useState([]);
  const [updateReviews, setUpdateReviews] = useState(false);
  const [isReviewAdded, setIsReviewAdded] = useState(false);
  const [review, setReview] = useState({});

  const handleRating = (newRating) => {
    setReview({ ...review, stars: newRating });
  };

  const handleReviewText = ({ target: { value } }) => {
    setReview({ ...review, text: value });
  };

  useEffect(() => {
    const getReviews = async () => {
      try {
        const headerConfig = token
          ? {
              headers: {
                Authorization: `bearer ${token}`,
              },
            }
          : {};
        const { data: { data, hasReviewAdded } = [] } = await axios.get(
          `http://localhost:1337/api/reviews?productId=${productId}`,
          headerConfig
        );

        let averageRating =
          data.reduce((acc, value) => {
            return acc + Number(value.stars);
          }, 0) / data.length;
        averageRating = Number(
          averageRating > 0 ? averageRating.toFixed(1) : averageRating
        );
        setRating(averageRating);
        setReviews(data);
        setIsReviewAdded(hasReviewAdded);
        setUpdateReviews(false);
        setgetLatestProductUpdate(true);
        setReview({});
      } catch (error) {
        console.log({ error });
      }
    };
    getReviews();
  }, [productId, setRating, setgetLatestProductUpdate, token, updateReviews]);

  const handleSubmit = async () => {
    if (!review.text || !review.stars) {
      toast.error("Both review stars and text are required*", {
        hideProgressBar: true,
      });
      return;
    }
    if (review.text && review.stars && productId) {
      try {
        axios.post(
          `http://localhost:1337/api/reviews`,
          {
            ...review,
            productId,
          },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        setUpdateReviews(true);
      } catch (error) {
        toast.error("There is an error occured!", {
          hideProgressBar: true,
        });
        console.log({ error });
      }
    } else {
      toast.error("There is an error occured!", {
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="product-reviews">
      {isReviewAdded || !token ? null : (
        <div>
          <h2>Create review:</h2>
          <Form>
            <FormGroup>
              <Label for="exampleText">Overall rating</Label>
              <div>
                <Rating
                  onClick={handleRating}
                  initialValue={review.stars}
                  size={24}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="reviewText">Leave your review here</Label>
              <Input
                type="textarea"
                name="reviewText"
                id="reviewText"
                onChange={handleReviewText}
              />
            </FormGroup>
            <Button color="info" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </div>
      )}

      {reviews.length ? (
        <div className="reviews">
          <h2>Customer reviews:</h2>
          {reviews.map(({ text, stars, createdAt }) => (
            <div className="review">
              <div className="customer">
                <IoPersonCircleOutline className="icon" />
                <span>Customer name</span>
              </div>
              <Rating size={24} readonly initialValue={stars} />
              <p>Reviewed at: {new Date(createdAt).toLocaleDateString()}</p>
              <p>{text}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ProductReview;
