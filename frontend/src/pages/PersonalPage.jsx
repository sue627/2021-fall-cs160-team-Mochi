import Template from "../components/template";
import ModalHeader from "../components/modalHeader.jsx";
import SectionTitle from "../components/sectionTitle.jsx";
import LeftPanel from "../components/leftPanel";
import Button from "../components/button";
import { useState, React, useEffect } from "react";
import AddFriendWindow from "../components/addFriendWindow";
import CreateGroupWindow from "../components/createGroupWindow";
import "../css/personalPage.css";
import UploadNotesWindow from "../components/uploadNotesWindow";
import { Link } from "react-router-dom";
import PDFViewer from "../components/PDFViewer";

function PersonalPage(props) {
    const [buttonAddFriend, setButtonAddFriend] = useState(false);
    const [buttonGroup, setButtonGroup] = useState(false);
    const [buttonPersonalProfile, setButtonPersonalProfile] = useState(false);
    const [friends, setFriends] = useState([]);
    const [groups, setGroups] = useState([]);
    const [notes, setNotes] = useState([]);
    const [buttonUpload, setButtonUpload] = useState(false);
    const [user, setUser] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [pdf, setPDF] = useState({});

    const getUserInfo = async () => {
        let success = true;
        const userInfoResponse = await fetch("http://localhost:3000/v1/user/", {
            method: "GET",
            headers: {
                Authorization:
                    "bearer " + window.localStorage.getItem("authToken"),
            },
        }).catch((err) => {
            console.error(err);
            success = false;
        });

        if (success) {
            const userInfoResponseJSON = await userInfoResponse.json();
            if (userInfoResponseJSON.username) {
                setUser(userInfoResponseJSON.username);
                setUserDescription(userInfoResponseJSON.description);
            } else {
                console.error("Could not get user information.");
            }
        }
    };

    const getMyFriends = async () => {
        let success = true;
        const friendsResponse = await fetch(
            "http://localhost:3000/v1/friends/",
            {
                method: "GET",
                headers: {
                    Authorization:
                        "bearer " + window.localStorage.getItem("authToken"),
                },
            }
        ).catch((err) => {
            console.error(err);
            success = false;
        });

        if (success) {
            const friendResponseJSON = await friendsResponse.json();
            if (friendResponseJSON.friends) {
                setFriends(friendResponseJSON.friends);
            }
        }
    };

    const getMyGroups = async () => {
        let success = true;
        const groupsResponse = await fetch("http://localhost:3000/v1/groups/", {
            method: "GET",
            headers: {
                Authorization:
                    "bearer " + window.localStorage.getItem("authToken"),
            },
        }).catch((err) => {
            console.error(err);
            success = false;
        });

        if (success) {
            const groupResponseJSON = await groupsResponse.json();
            if (groupResponseJSON.allGroups) {
                setGroups(groupResponseJSON.allGroups);
            }
        }
    };

    const getUserNotesRef = async () => {
        let success = true;
        const userNotesResponse = await fetch(
            "http://localhost:3000/v1/notes/username/",
            {
                method: "GET",
                headers: {
                    Authorization:
                        "bearer " + window.localStorage.getItem("authToken"),
                },
            }
        ).catch((err) => {
            console.error(err);
            success = false;
        });

        if (success) {
            const userNoteResponseJSON = await userNotesResponse.json();
            if (userNoteResponseJSON.notes) {
                setNotes(userNoteResponseJSON.notes);

                const pdfResponse = await fetch(
                    "http://localhost:3000/v1/notes/file/" +
                        notes[0].note_reference,
                    {
                        method: "GET",
                        headers: {
                            Authorization:
                                "bearer " +
                                window.localStorage.getItem("authToken"),
                        },
                    }
                ).catch((err) => {
                    console.error(err);
                    success = false;
                });

                if (success) {
                    const pdfResponseJSON = await pdfResponse.json();
                    if (pdfResponseJSON.pdf_data) {
                        setPDF(pdfResponseJSON.pdf_data);
                    } else {
                        console.error("Could not load note pdf.");
                    }
                }
            } else {
                console.error("Could not load note.");
            }
        }
    };

    useEffect(() => {
        getUserInfo();
        getMyFriends();
        getMyGroups();
        // getUserNotesRef();
    }, []);

    return (
        <>
            <Template
                showSearch={true}
                showProfile={true}
                body={
                    <div className="d-flex flex-column left-side">
                        <ModalHeader title={`Hi ${user}`} />
                        <div className="d-flex flex-column align-items-left">
                            <LeftPanel
                                body={
                                    <div className="flex-row">
                                        <ModalHeader title="My Friends" />
                                        <div className="d-flex row agenda">
                                            {friends.map((friend) => (
                                                <h3>{friend.username}</h3>
                                            ))}
                                        </div>
                                        <div className="flex-row">
                                            <Button
                                                small
                                                title="ADD FRIEND"
                                                type="primary"
                                                clicked={() =>
                                                    setButtonAddFriend(true)
                                                }
                                            />
                                        </div>
                                        <ModalHeader title="My Groups" />
                                        <div className="flex-column agenda">
                                            {groups.map((group) => (
                                                <Link
                                                    to={
                                                        "/group/" +
                                                        group.group_id
                                                    }
                                                    style={{
                                                        color: "inherit",
                                                        textDecoration:
                                                            "inherit",
                                                    }}
                                                >
                                                    <h3>{group.group_name}</h3>{" "}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="flex-row">
                                            <Button
                                                small
                                                title="CREATE GROUP"
                                                type="primary"
                                                clicked={() =>
                                                    setButtonGroup(true)
                                                }
                                            />
                                        </div>
                                        <div className="flex-row">
                                            <Button
                                                small
                                                title="EDIT PROFILE"
                                                type="secondary"
                                                clicked={() =>
                                                    setButtonPersonalProfile(
                                                        true
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                        <div className="d-flex flex-column right-side-top">
                            <SectionTitle title="Biography" />
                            <div className="agenda big">{userDescription}</div>
                        </div>

                        <div className="d-flex column right-side-middle">
                            <SectionTitle title="My Notes" />
                            {/* <PDFViewer thumbnail pdf={pdf} /> */}
                            <div className="d-flex flex-row right-side-down">
                                <Button
                                    title="UPLOAD"
                                    type="primary"
                                    clicked={() => setButtonUpload(true)}
                                />
                            </div>
                        </div>
                        <AddFriendWindow
                            friends={friends}
                            setFriends={setFriends}
                            trigger={buttonAddFriend}
                            setTrigger={setButtonAddFriend}
                        />
                        <CreateGroupWindow
                            groups={groups}
                            setGroups={setGroups}
                            trigger={buttonGroup}
                            setTrigger={setButtonGroup}
                        />
                        <UploadNotesWindow
                            trigger={buttonUpload}
                            setTrigger={setButtonUpload}
                        />
                    </div>
                }
            />
        </>
    );
}

export default PersonalPage;
