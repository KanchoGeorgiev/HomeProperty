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

const DUMMY_DATA = [
    {
        name: "Kancho Georgiev",
        text: "This is a test, but still let's try something a bit longer, so I can be sure everyting is in order",
        id: 1,
        listing_id: 29,
    },
];

const ListingItemDetailComponent = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState(DUMMY_DATA);
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
                setSingle(data);
            }
        }
    };
    useEffect(() => {
        fetchOne();
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
    const addCommentHandler = (data) => {
        const readyValue = {
            ...data,
            id: Math.random(),
            listing_id: single.id,
        };
        setComments((prevComments) => {
            return [...prevComments, readyValue];
        });
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
                <BackgroundCard>
                    <div className="grid-row-2">
                        <div className="grid grid-cols-2 gap-4 place-items-center">
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
                            <div className="ml-4 place-self-stretch">
                                <Map
                                    name="map-container"
                                    lng={Number(single.lng)}
                                    lat={Number(single.lat)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-around">
                            <div>
                                <p className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
                                    {single.headline}
                                </p>
                                <p className="mb-3 font-normal text-gray-700 px-6">
                                    {single.description}
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-5xl font-bold tracking-tight text-gray-900">
                                    {single.price}lv.{" "}
                                    <span className="text-3xl">
                                        | {single.area} m<sup>2</sup>
                                    </span>
                                </p>
                                <p className="mb-2 text-xl tracking-tight text-gray-900">
                                    {single.city}, {single.street}
                                </p>
                            </div>
                        </div>
                        {userData.type === 2 && (
                            <div className="flex justify-around ">
                                <Link
                                    to={`/listings/${params.detailId}/appointment`}
                                    className="inline-flex items-center py-3 px-24 text-xl font-bold text-center text-white rounded-lg hover:bg-amber-700 bg-stone-400"
                                >
                                    Make an Appointment
                                </Link>
                                <Link
                                    to="/Contacts"
                                    className="inline-flex items-center py-3 px-48 text-xl font-bold text-center text-white rounded-lg hover:bg-amber-700 bg-stone-400"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        )}
                        {userData.id === single.owner_id && (
                            <div className="flex justify-around ">
                                <Link
                                    to={`/listings/${params.detailId}/edit`}
                                    className="inline-flex items-center py-3 px-24 text-xl font-bold text-center text-white rounded-lg hover:bg-amber-700 bg-stone-400"
                                >
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    onClick={deleteListingHandler}
                                    className="inline-flex items-center py-3 px-24 text-xl font-bold text-center text-white rounded-lg hover:bg-amber-700 bg-stone-400"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </BackgroundCard>
            </WrapperCard>
            <WrapperCard>
                <BackgroundCard>
                    <CommentList comments={comments}/>
                    <button
                        type="button"
                        onClick={openModalHandler}
                        className=" mt-4 mx-auto block items-center py-3 px-24 text-xl font-bold text-center text-white rounded-lg hover:bg-amber-700 bg-stone-400"
                    >
                        Add Comment
                    </button>
                </BackgroundCard>
            </WrapperCard>
        </>
    );
};

export default ListingItemDetailComponent;
