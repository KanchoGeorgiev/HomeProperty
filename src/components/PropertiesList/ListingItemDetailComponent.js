import React, { useEffect, useState, useContext } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import WrapperCard from "../cards/WrapperCard";
import BackgroundCard from "../cards/BackgroundCard";
import Map from "../UI/Map";
import CommentList from "../commnets/CommentList";
import { useParams, Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import {
    deleteListingService,
    fetchOneSevice,
} from "../../services/listingService";
import NewComment from "../commnets/NewComment";
import parser from "html-react-parser";
import { FaMapMarkerAlt } from "react-icons/fa";

const ListingItemDetailComponent = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [phone, setPhone] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [single, setSingle] = useState({});
    const [imageDataset, setImageDataset] = useState([]);
    const { userData } = useContext(AuthContext);
    const fetchOne = async () => {
        const response = await fetchOneSevice(params.detailId);
        if (response.ok) {
            const data = await response.json();

            const images = await fetch(`/property/images/${params.detailId}`, {
                headers: {
                    "X-Api-Key": userData.token,
                    "Content-Type": "application/json",
                },
            });
            if (images.ok) {
                const imageData = await images.json();

                setImageDataset(imageData);
                const modifiedData = {
                    ...data,
                    usePhone: false,
                    phone: "0889682321",
                };
                setSingle(modifiedData);
            }
        }
    };

    const fetchComments = async () => {
        const comments = await fetch(`/property/comments/${params.detailId}`, {
            headers: {
                "X-Api-Key": userData.token,
                "Content-Type": "application/json",
            },
        });
        if (comments.ok) {
            const commentsData = await comments.json();
            setComments(commentsData);
        }
    };
    useEffect(() => {
        fetchOne();
        fetchComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const deleteListingHandler = async () => {
        const response = await deleteListingService(single.id);
        if (response.ok) {
            navigate("/listings");
        }
    };

    const openModalHandler = () => {
        setShowModal(true);
    };
    const closeModalHandler = () => {
        setShowModal(false);
    };
    const addCommentHandler = async (data) => {
        console.log(data);
        console.log(single.id);
        const readyValue = {
            message: data,
            property_id: single.id,
        };
        const response = await fetch("/property/add-comment", {
            method: "POST",
            headers: {
                "X-Api-Key": userData.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(readyValue),
        });
        if (response.ok) {
            setShowModal(false);
            setShowComments(true);
            fetchComments();
        } else {
            console.log(response);
        }
    };
    const showCommentsHandler = () => {
        setShowComments((prevState) => !prevState);
    };
    let commentNumber;
    if (comments.length === 0) {
        commentNumber = "Add comment";
    } else if (comments.length === 1) {
        commentNumber = "Show 1 comment";
    } else {
        commentNumber = `Show ${comments.length} comments`;
    }

    const revealPhoneHandler = () => {
        setPhone((prevState) => !prevState);
    };

    return (
        <>
            {showModal && (
                <NewComment
                    onClose={closeModalHandler}
                    onAddNewComment={addCommentHandler}
                />
            )}
            <WrapperCard>
                <div className="flex">
                    <div className="basis-2/3">
                        <BackgroundCard>
                            <Carousel
                                useKeyboardArrows={true}
                                showStatus={false}
                                infiniteLoop={true}
                            >
                                {imageDataset.map((x) => {
                                    return (
                                        <div key={x.id}>
                                            <img src={x.image} alt={x.id} />
                                        </div>
                                    );
                                })}
                            </Carousel>
                            <div>
                                <p className="ml-6 text-2xl font-bold tracking-tight text-gray-900">
                                    {single.price}lv.{" "}
                                    <span className="text-2xl">
                                        | {single.area} m<sup>2</sup>
                                    </span>
                                </p>
                                <p className=" ml-6 mb-2 text-3xl font-bold tracking-tight text-gray-900">
                                    {single.headline}
                                </p>
                                <p className="mb-10 font-normal text-gray-700 px-6">
                                    {single.description
                                        ? parser(single.description)
                                        : single.description}
                                </p>
                            </div>
                        </BackgroundCard>
                    </div>
                    <div className="mx-4 basis-1/3">
                        <BackgroundCard>
                            {userData.type === 2 && (
                                <div className="flex flex-col grow-1">
                                    {!single.usePhone && (
                                        <>
                                            <Link
                                                to={`/listings/${params.detailId}/appointment`}
                                                state={{ id: single.owner_id }}
                                                className="p-3 text-md font-semibold text-white rounded-lg hover:bg-amber-700 bg-stone-400 text-center"
                                            >
                                                Make an Appointment
                                            </Link>
                                            <div className="mt-4 p-3 text-xl text-white rounded-lg bg-stone-400 text-center">
                                                XXXXXXXXXX
                                            </div>
                                        </>
                                    )}

                                    {single.usePhone && (
                                        <>
                                            <div className="p-3 text-md font-semibold text-white rounded-lg bg-stone-400 text-center">
                                                Make an Appointment
                                            </div>
                                            <div
                                                onClick={revealPhoneHandler}
                                                className="mt-4 p-3 text-xl text-white rounded-lg hover:bg-amber-700 bg-stone-400 cursor-pointer text-center"
                                            >
                                                {phone
                                                    ? "XXXXXXXXXX"
                                                    : single.phone}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                            {userData.id === single.owner_id && (
                                <div className="flex flex-col">
                                    <Link
                                        to={`/listings/${params.detailId}/edit`}
                                        className="p-3 my-2 text-xl font-semibold text-center text-white rounded-lg hover:bg-amber-700 bg-stone-400"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={deleteListingHandler}
                                        className="p-3 my-2 text-xl font-semibold text-center text-white rounded-lg hover:bg-amber-700 bg-stone-400"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </BackgroundCard>
                        <div className="mt-4">
                            <BackgroundCard>
                                <div className="flex flex-col">
                                    <div className="font-semibold text-gray-700">
                                        Locale:
                                    </div>
                                    <Map
                                        name="map-container-small"
                                        lng={Number(single.lng)}
                                        lat={Number(single.lat)}
                                    />
                                    <div className="flex">
                                        <div className="m-2 px-4">
                                            <FaMapMarkerAlt className="h-10 text-gray-700" />
                                        </div>
                                        <div>
                                            <p className="mt-2 px-2 text-2xl font-semibold text-gray-900">
                                                {single.street}
                                            </p>
                                            <p className="mt-1 px-2 text-xl text-gray-900">
                                                {single.city}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </BackgroundCard>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => {
                        if (comments.length >= 1) {
                            showCommentsHandler();
                        } else {
                            openModalHandler();
                        }
                    }}
                    className=" my-4 mx-auto block items-center py-3 px-24 text-xl font-bold text-center text-white rounded-lg hover:bg-amber-700 bg-stone-400"
                >
                    {showComments ? "Hide Comments " : commentNumber}
                </button>
                {showComments && (
                    <BackgroundCard>
                        <CommentList comments={comments} />
                        <button
                            type="button"
                            onClick={openModalHandler}
                            className=" mt-4 mx-auto block items-center py-3 px-24 text-xl font-bold text-center text-white rounded-lg hover:bg-amber-700 bg-stone-400"
                        >
                            Add Comment
                        </button>
                    </BackgroundCard>
                )}
            </WrapperCard>
        </>
        // <>
        //     {showModal && (
        //         <NewComment
        //             onClose={closeModalHandler}
        //             onAddNewComment={addCommentHandler}
        //         />
        //     )}
        //     <WrapperCard>
        //         <BackgroundCard>
        //             <div className="grid-row-2">
        //                 <div className="grid grid-cols-2 gap-4 place-items-center">
        //                     <Carousel
        //                         useKeyboardArrows={true}
        //                         showStatus={false}
        //                         infiniteLoop={true}
        //                     >
        //                         {imageDataset.map((x) => {
        //                             return (
        //                                 <div key={x.id}>
        //                                     <img src={x.image} alt={x.id} />
        //                                 </div>
        //                             );
        //                         })}
        //                     </Carousel>
        //                     <div className="ml-4 place-self-stretch">
        //                         <Map
        //                             name="map-container"
        //                             lng={Number(single.lng)}
        //                             lat={Number(single.lat)}
        //                         />
        //                     </div>
        //                 </div>
        //                 <div className="flex justify-around">
        //                     <div>
        //                         <p className=" ml-6 mb-2 text-3xl font-bold tracking-tight text-gray-900">
        //                             {single.headline}
        //                         </p>
        //                         <p className="mb-10 font-normal text-gray-700 px-6">
        //                             {single.description
        //                                 ? parser(single.description)
        //                                 : single.description}
        //                         </p>
        //                     </div>
        //                     <div>
        //                         <p className="mb-2 text-5xl font-bold tracking-tight text-gray-900">
        //                             {single.price}lv.{" "}
        //                             <span className="text-3xl">
        //                                 | {single.area} m<sup>2</sup>
        //                             </span>
        //                         </p>
        //                         <p className="mb-2 text-xl tracking-tight text-gray-900">
        //                             {single.city}, {single.street}
        //                         </p>
        //                     </div>
        //                 </div>
        //                 {userData.type === 2 && (
        //                     <div className="flex justify-around ">
        //                         <div className="inline-flex items-center text-xl font-bold text-center">
        //                             {!single.usePhone && (
        //                                 <Link
        //                                     to={`/listings/${params.detailId}/appointment`}
        //                                     state={{ id: single.owner_id }}
        //                                     className="py-3 px-24 text-xl text-white rounded-lg hover:bg-amber-700 bg-stone-400"
        //                                 >
        //                                     Make an Appointment
        //                                 </Link>
        //                             )}
        //                             {single.usePhone && (
        //                                 <div
        //                                     onClick={revealPhoneHandler}
        //                                     className={`py-3 ${
        //                                         !phone ? "px-22" : "px-10"
        //                                     } text-xl text-white rounded-lg hover:bg-amber-700 bg-stone-400 cursor-pointer`}
        //                                 >
        //                                     {phone
        //                                         ? "Make an Appointment"
        //                                         : single.phone}
        //                                 </div>
        //                             )}
        //                         </div>
        //                         <Link
        //                             to="/Contacts"
        //                             className="inline-flex items-center py-3 px-48 text-xl font-bold text-center text-white rounded-lg hover:bg-amber-700 bg-stone-400"
        //                         >
        //                             Contact Us
        //                         </Link>
        //                     </div>
        //                 )}
        //                 {userData.id === single.owner_id && (
        //                     <div className="flex justify-around ">
        //                         <Link
        //                             to={`/listings/${params.detailId}/edit`}
        //                             className="inline-flex items-center py-3 px-24 text-xl font-bold text-center text-white rounded-lg hover:bg-amber-700 bg-stone-400"
        //                         >
        //                             Edit
        //                         </Link>
        //                         <button
        //                             type="button"
        //                             onClick={deleteListingHandler}
        //                             className="inline-flex items-center py-3 px-24 text-xl font-bold text-center text-white rounded-lg hover:bg-amber-700 bg-stone-400"
        //                         >
        //                             Delete
        //                         </button>
        //                     </div>
        //                 )}
        //             </div>
        //         </BackgroundCard>
        //     </WrapperCard>
        //     <button
        //         type="button"
        //         onClick={() => {
        //             if (comments.length >= 1) {
        //                 showCommentsHandler();
        //             } else {
        //                 openModalHandler();
        //             }
        //         }}
        //         className=" mt-4 mx-auto block items-center py-3 px-24 text-xl font-bold text-center text-white rounded-lg hover:bg-amber-700 bg-stone-400"
        //     >
        //         {showComments ? "Hide Comments " : commentNumber}
        //     </button>
        //     {showComments && (
        //         <WrapperCard>
        //             <BackgroundCard>
        //                 <CommentList comments={comments} />
        //                 <button
        //                     type="button"
        //                     onClick={openModalHandler}
        //                     className=" mt-4 mx-auto block items-center py-3 px-24 text-xl font-bold text-center text-white rounded-lg hover:bg-amber-700 bg-stone-400"
        //                 >
        //                     Add Comment
        //                 </button>
        //             </BackgroundCard>
        //         </WrapperCard>
        //     )}
        // </>
    );
};

export default ListingItemDetailComponent;
