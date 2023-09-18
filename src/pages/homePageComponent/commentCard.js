import React from 'react';
import styled from 'styled-components';


const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 33vw;
  max-width: 341px;
  padding: 20px;
  @media (max-width: 767px) {
    width: 95vw;
  }
`;

const CommentCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 280px;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 5px 5px 20px grey;
    height: auto;
    @media (max-width: 767px) {
    width: 95vw;
}
`;

const CommentName = styled.h3`
  margin: 10px 0;
  font-family: 'Montserrat', sans-serif;
  color: #2B2D42;
`;

const CommentScore = styled.span`
  margin-bottom: 10px;
`;

const CommentText = styled.p`
  text-align: center;
`;

const CommentAnswer = styled.p`
  text-align: center;
  color: #0077b6;
`;

const CommentCard = ({ comment }) => {
    return (
        <Card>
            <CommentCardContainer>
                <CommentName>{comment.name}</CommentName>
                <CommentScore>{'⭐'.repeat(comment.score)}</CommentScore>
                <CommentText>{comment.comment}</CommentText>
                {comment.answer && <CommentAnswer>Response: {comment.answer}</CommentAnswer>}
            </CommentCardContainer>
        </Card>
    );
};

export default CommentCard;
