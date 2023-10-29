import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from '../../carousel';
import CommentCard from './commentCard';
import API_BASE_URL from '../../apiConfig';

const CommentCarousel = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
          const response = await axios.get(`${API_BASE_URL}comments`);
          const approvedComments = response.data.filter(comment => comment.approved === 1);
          setComments(approvedComments);
      } catch (error) {
          console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <Carousel>
      {comments.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </Carousel>
  );
};

export default CommentCarousel;
