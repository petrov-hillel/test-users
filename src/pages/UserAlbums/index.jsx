import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {fetchUserAlbums} from "../../store/slices/albums";
import ButtonBack from "../../components/ButtonBack";
import MyHelmet from "../../components/MyHelmet";

export default function UserAlbums() {
  const { userId } = useParams()
  const dispatch = useDispatch();

  const {
    userAlbums,
    albumsFetchStatus,
  } = useSelector((state) => state.albums)

  useEffect(() => {
      dispatch(fetchUserAlbums(userId));
  }, [dispatch, userId])

  const renderAlbums = () => {
      if (albumsFetchStatus === 'loading') return <p className="text-center">Loading albums ...</p>
      if (userAlbums.length === 0) return <p className="text-center">No albums found</p>

      return userAlbums.map(album => (
          <div key={album.id} className="mb-2 border-b-[1px] pb-1">
              <p>Album #{album.id}</p>
              <h4>{album.title}</h4>
          </div>
      ))
  }

  return (
    <div>
      <MyHelmet title={'User albums page'}
                description={'User page where you can see his albums'}
                keywords={'users albums pages react'}/>
      <h1 className="mb-4 text-center text-2xl">Albums</h1>
      {renderAlbums()}
      <ButtonBack/>
    </div>
  )
}