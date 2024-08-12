// 게시글 ID, 사용자 ID로 좋아요 상태 저장
export const saveLikeStatus = (
  postId: string,
  userId: string,
  liked: boolean
) => {
  const likes = JSON.parse(localStorage.getItem("likes") || "{}");
  if (!likes[postId]) {
    likes[postId] = {};
  }
  if (liked) {
    likes[postId][userId] = true;
  } else {
    delete likes[postId][userId];
  }
  localStorage.setItem("likes", JSON.stringify(likes));
};

// 게시글 ID로 좋아요 상태 불러오기
export const loadLikeStatus = (postId: string) => {
  const likes = JSON.parse(localStorage.getItem("likes") || "{}");
  return likes[postId] || {};
};

// 게시글 ID와 사용자 ID로 좋아요 여부 확인
export const hasUserLiked = (postId: string, userId: string) => {
  const postLikes = loadLikeStatus(postId);
  return postLikes[userId] === true;
};

// 게시글 ID로 좋아요 수 계산
export const getLikeCount = (postId: string) => {
  const postLikes = loadLikeStatus(postId);
  return Object.keys(postLikes).length;
};
