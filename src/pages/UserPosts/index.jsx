import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {fetchUserPosts} from "../../store/slices/posts";
import ButtonBack from "../../components/ButtonBack";
import MyHelmet from "../../components/MyHelmet";

export default function UserPosts() {
  const { userId } = useParams()
  const dispatch = useDispatch();

  const {
    userPosts,
    postsFetchStatus,
  } = useSelector((state) => state.posts)

  useEffect(() => {
      dispatch(fetchUserPosts(userId));
  }, [dispatch, userId])

  const renderPosts = () => {
      if (postsFetchStatus === 'loading') return <p className="text-center">Loading posts ...</p>
      if (userPosts.length === 0) return <p className="text-center">No posts found</p>

      return userPosts.map(post => (
          <div key={post.id} className="mb-2 border-b-[1px] pb-1">
              <p>post #{post.id}</p>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
          </div>
      ))
  }

  return (
    <div>
      <MyHelmet title={'User posts page'}
                description={'User page where you can see his posts'}
                keywords={'posts users pages react'}/>
      <h1 className="mb-4 text-center text-2xl">Posts</h1>
      {renderPosts()}
      <ButtonBack/>
    </div>
  )
}