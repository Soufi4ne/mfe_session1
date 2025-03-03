import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./styles.css";

// Données statiques pour la démo
const commentsData = [
  {
    id: 1,
    author: "Sophie Martin",
    date: "2 mars 2025",
    content: "Cette série est incroyable ! Les personnages sont attachants et l'intrigue est captivante. J'ai regardé toute la saison en un week-end !",
    likes: 42,
    replies: 3,
  },
  {
    id: 2,
    author: "Thomas Dubois",
    date: "28 février 2025",
    content: "Je suis un peu déçu par cette saison. L'intrigue est moins prenante que les précédentes et certains personnages sont sous-exploités.",
    likes: 8,
    replies: 5,
  },
  {
    id: 3,
    author: "Emma Leroy",
    date: "25 février 2025",
    content: "Les effets spéciaux sont impressionnants ! On voit que le budget a augmenté. Par contre, j'ai trouvé que certaines scènes traînaient en longueur.",
    likes: 17,
    replies: 2,
  },
  {
    id: 4,
    author: "Lucas Bernard",
    date: "20 février 2025",
    content: "Meilleure série de l'année sans hésiter ! Le casting est parfait et la réalisation au top. Vivement la prochaine saison !",
    likes: 53,
    replies: 7,
  },
];

// Composants stylisés
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 24px;
  color: #fff;
  font-weight: 600;
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CommentItem = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 16px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const CommentAuthor = styled.span`
  font-weight: 600;
  color: #e50914;
`;

const CommentDate = styled.span`
  font-size: 0.8rem;
  color: #999;
`;

const CommentContent = styled.p`
  line-height: 1.5;
  color: #ccc;
  margin-bottom: 12px;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 16px;
`;

const CommentAction = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.3s ease;

  &:hover {
    color: #e50914;
  }
`;

const CommentForm = styled.form`
  margin-top: 32px;
  margin-bottom: 32px;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: #fff;
  padding: 12px;
  font-family: 'Montserrat', sans-serif;
  resize: vertical;
  min-height: 80px;
  margin-bottom: 16px;

  &:focus {
    outline: none;
    border-color: #e50914;
  }
`;

const SubmitButton = styled.button`
  background-color: #e50914;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b20710;
  }
`;

const Comments = () => {
  const [comments, setComments] = useState(commentsData);
  const [newComment, setNewComment] = useState("");
  const [currentMovieId, setCurrentMovieId] = useState(1);

  // Écouter les événements de communication inter-MFE
  useEffect(() => {
    const handleMovieChange = (event) => {
      console.log("Événement reçu: Changement de film", event.detail);
      // Dans un cas réel, on chargerait les commentaires du film sélectionné
      setCurrentMovieId(event.detail.movieId);
    };

    window.addEventListener('efreiflix:movieSelected', handleMovieChange);
    
    return () => {
      window.removeEventListener('efreiflix:movieSelected', handleMovieChange);
    };
  }, []);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // Ajouter un nouveau commentaire
    const newCommentObj = {
      id: comments.length + 1,
      author: "Vous",
      date: new Date().toLocaleDateString('fr-FR'),
      content: newComment,
      likes: 0,
      replies: 0,
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment("");
    
    // Émission d'un événement custom pour communication inter-MFE
    const event = new CustomEvent('efreiflix:commentAdded', {
      detail: {
        movieId: currentMovieId,
        commentId: newCommentObj.id,
        author: newCommentObj.author
      }
    });
    window.dispatchEvent(event);
    console.log(`Événement émis: Nouveau commentaire ajouté pour le film ID ${currentMovieId}`);
  };

  const handleLike = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
    
    // Émission d'un événement custom pour communication inter-MFE
    const event = new CustomEvent('efreiflix:commentLiked', {
      detail: {
        movieId: currentMovieId,
        commentId: commentId
      }
    });
    window.dispatchEvent(event);
    console.log(`Événement émis: Commentaire ${commentId} aimé`);
  };

  return (
    <Container>
      <Title>Commentaires</Title>
      
      <CommentForm onSubmit={handleSubmitComment}>
        <CommentTextarea
          placeholder="Ajouter un commentaire..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <SubmitButton type="submit">Publier</SubmitButton>
      </CommentForm>
      
      <CommentsList>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentHeader>
              <CommentAuthor>{comment.author}</CommentAuthor>
              <CommentDate>{comment.date}</CommentDate>
            </CommentHeader>
            <CommentContent>{comment.content}</CommentContent>
            <CommentActions>
              <CommentAction onClick={() => handleLike(comment.id)}>
                👍 {comment.likes}
              </CommentAction>
              <CommentAction>
                💬 {comment.replies} réponses
              </CommentAction>
            </CommentActions>
          </CommentItem>
        ))}
      </CommentsList>
    </Container>
  );
};

export default Comments; 