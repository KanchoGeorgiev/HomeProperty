import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Contacts from "./pages/Contacts";
import Calendar from "./pages/Calendar";
import LoginPage from "./pages/Login";
import Edit from "./pages/Edit";
import ListingItemDetail from "./pages/ListingItemDetail";
import NewListing from "./pages/NewListing";
import Appointment from "./pages/Appointment";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";
import PrivateRoutesAgent from "./components/common/PrivateRoutesAgent";
import PrivateRoutesCommon from "./components/common/PrivateRoutesCommon";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ListingContextProvider } from "./contexts/ListingContext";
import LoadingComponent from "./components/UI/LoadingComponent";
import { lazy, Suspense } from "react";
const UserSettings = lazy(() => import("./pages/UserSettings"));
const Register = lazy(() => import("./pages/Register"));
const NewAgent = lazy(() => import("./pages/NewAgent"));

function App() {
    return (
        <AuthContextProvider>
            <Header />

            <ListingContextProvider>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/register"
                        element={
                            <Suspense fallback={<LoadingComponent />}>
                                <Register />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/newagent"
                        element={
                            <Suspense fallback={<LoadingComponent />}>
                                <NewAgent />
                            </Suspense>
                        }
                    />
                    <Route path="/contacts" element={<Contacts />} />

                    <Route path="/home" element={<Home />} />
                    <Route path="/listings" element={<Listings />} />
                    <Route element={<PrivateRoutesCommon />}>
                        <Route
                            path="/listings/:detailId"
                            element={<ListingItemDetail />}
                        />
                        <Route
                            path="/listings/:detailId/appointment"
                            element={<Appointment />}
                        />
                        <Route
                            path="/settings"
                            element={
                                <Suspense fallback={<LoadingComponent />}>
                                    <UserSettings />
                                </Suspense>
                            }
                        />
                    </Route>
                    <Route element={<PrivateRoutesAgent />}>
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/newlisting" element={<NewListing />} />
                        <Route
                            path="/listings/:detailId/edit"
                            element={<Edit />}
                        />
                    </Route>
                    <Route path="/forbidden" element={<Forbidden />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ListingContextProvider>

            <Footer />
        </AuthContextProvider>
    );
}

export default App;
