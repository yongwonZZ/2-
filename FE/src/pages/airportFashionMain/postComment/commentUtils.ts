// 댓글 저장하기
export const saveComments = (
  postId: string,
  comments: { userName: string; text: string }[]
) => {
  localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
};

// 댓글 불러오기
export const loadComments = (
  postId: string
): { userName: string; text: string }[] => {
  const comments = localStorage.getItem(`comments_${postId}`);
  return comments ? JSON.parse(comments) : [];
};
