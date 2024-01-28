import {Link, useParams} from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchUser} from "../../store/slices/users";
import ButtonBack from "../../components/ButtonBack";
import MyHelmet from "../../components/MyHelmet";

export default function UserPage() {
    const { userId } = useParams()
    const {
        user,
        userFetchStatus,
    } = useSelector((state) => state.users)
    const dispatch = useDispatch()

    const imageSrc = `https://api.slingacademy.com/public/sample-photos/${userId}.jpeg`

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [dispatch, userId]);

    if (userFetchStatus === 'loading') {
        return <div className="text-center">Loading...</div>;
    }

    if (!user || userFetchStatus === 'error') return <p className="text-center">Error loading</p>

    return (
        <div className="">
            <MyHelmet title={'User page'}
                      description={'User page with detailed information'}
                      keywords={'users page information'}/>
            <h1 className="text-center text-2xl mb-5">{user.name}</h1>
            <div className="flex justify-between items-center">
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Website: {user.website}</p>
                    <p>Address: {user.address.city}, {user.address.street}, {user.address.suite}</p>
                    <p>Zipcode: {user.address.zipcode}</p>
                    <p>Company: {user.company.name}. {user.company.catchPhrase}</p>
                    <h3 className="text-xl my-4">User Posts</h3>
                    <div className="gap-2 flex">
                        <Link to={`/users/${userId}/posts`} className="border rounded-xl py-2 px-4 hover:bg-slate-200">Posts</Link>
                        <Link to={`/users/${userId}/albums`} className="border rounded-xl py-2 px-4 hover:bg-slate-200">Albums</Link>
                    </div>
                </div>
                <img className="mx-auto w-[300px]" src={imageSrc} alt={user.username}/>
            </div>
            <ButtonBack/>
        </div>
    );
}
