import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, searchUser } from "../../store/slices/users";
import UserItem from "../../components/UserItem";
import MyHelmet from "../../components/MyHelmet";

export default function MainPage() {
    const [sort, setSort] = useState('')
    const { allUsers, usersFetchStatus, searchUserText } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const searchHandler = (event) => {
        dispatch(searchUser(event.target.value))
    }

    if (usersFetchStatus === 'error') return <p className="text-center">Error loading</p>

    const filteredUsers = () => {
        const filteredBySearch = allUsers.filter(({ username }) =>
          username.toLowerCase().includes(searchUserText.toLowerCase())
        )

        if (sort === 'asc') {
            return  filteredBySearch.slice().sort((a, b) => a.username.localeCompare(b.username))
        } else if( sort === 'desc'){
            return  filteredBySearch.slice().sort((a, b) => b.username.localeCompare(a.username))
        } else {
            return filteredBySearch
        }
    }

    const renderUsers = filteredUsers()

    return (
        <div className="">
            <MyHelmet title={'Main page'}
                      description={'This is the main page where you can select a user and go to their page with detailed information'}
                      keywords={'users main page react redux search sorting'}/>

            <header className="border-b-2 pb-4 mb-4">
                <label htmlFor="text"
                       className="relative cursor-pointer">
                    Search:
                    <input type="text"
                           id="text"
                           onChange={searchHandler}
                           value={searchUserText}
                           placeholder="Enter username"
                           className="py-1 px-3 ml-1 border rounded w-[16rem]"
                    />
                    <span className="absolute top-[-7px] right-[6px] text-2xl cursor-pointer text-gray-700"
                          onClick={() => dispatch(searchUser(""))}>&times;</span>
                </label>

                <label htmlFor="sort" className="ml-4">
                    Sorting user name:
                    <select name="sort"
                            id="sort"
                            onChange={e => setSort(e.target.value)}
                            className="ml-1 py-1 px-3 rounded">
                        <option value="">Sorting</option>
                        <option value="asc">A_Z</option>
                        <option value="desc">Z_A</option>
                    </select>
                </label>
            </header>

            <h1 className="text-2xl text-center mb-4">Users list</h1>

            {usersFetchStatus === 'loading'
                ? (<div className="text-center">Loading users ...</div>)
                : (renderUsers.map((users) => (
                    <UserItem key={users.id} {...users} />
            )))}

            {renderUsers.length === 0 && (<div>No users found</div>)}
        </div>
    );
}
