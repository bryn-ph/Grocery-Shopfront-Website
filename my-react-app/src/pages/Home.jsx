import Specials from "../components/Specials";
import LinkCards from "../components/LinkCards";
import './styles/Home.css';
import { useContext } from "react";
import UserContext from "../data/UserContext";
import { Link } from 'react-router-dom';
import foodBanner from '../assets/foodBanner.jpeg';
import seedBanner from '../assets/seedBanner.jpeg';
import niceFoodBanner from '../assets/niceFoodBanner.jpeg';
import footerImage from '../assets/footerImage.jpeg';

function Home() {
    let user;
    // Gets logged in status
    const { loggedIn } = useContext(UserContext);
    if (localStorage.getItem('loggedIn') === 'true') {
        user = JSON.parse(localStorage.getItem('user'));
    }

    // Gets time of day to get correct welcome message
    const currentHour = new Date().getHours();
    let timeOfDay;

    if (currentHour < 12) {
        timeOfDay = "Good morning";
    } else if (currentHour < 18) {
        timeOfDay = "Good afternoon";
    } else {
        timeOfDay = "Good evening";
    }


    return (
        <div>
            {/* <h1>Home</h1> */}

            <div className="mainBanner">
                {/* CHANGE THIS OUT FOR A BANNER WITH TEXT OVER IT */}
                <div className="userBannerMessage">
                    {user && user.firstName && <h4>{timeOfDay} {user.firstName}!</h4>}
                </div>
                <h2 className="mainBannerTitle">Welcome to the Organic Farming Website</h2>
                <p className="mainBannerMessage">Discover the benefits of organic farming and how it can improve your well-being.</p>
                <img className="mainBannerImage" src={niceFoodBanner} alt="Organic Farming Banner" />
            </div>
            <Specials />
            <Link to="/Catalogue" className="catalogueButton">
                Go to Catalogue &#8594;
            </Link>
            <img className="normalBannerImage" src={seedBanner} alt="Food Banner" />
            <div className="homeInfoSection">
                <h2 className="homeSectionTitle">Useful Information & Advice</h2>
                <div className="homeInfoSectionCards">
                    <LinkCards
                        title="Learn How To Grow Your Own Vegetables"
                        message="Discover the joy and benefits of growing your own vegetables. Get started today!"
                        bgImageLink="https://as1.ftcdn.net/v2/jpg/06/05/48/20/1000_F_605482051_wxKnTX90TA2rlncq9DwxjNQl7Ry1fb8t.jpg"
                        navLink="/GrowingVegetables"
                    />
                    <LinkCards
                        title="Learn About Healthy Eating"
                        message="Explore the world of healthy eating and learn how it can improve your well-being."
                        bgImageLink="https://as1.ftcdn.net/v2/jpg/01/90/34/54/1000_F_190345434_MAXQYfP0cBSDQUZXP2UQ4iYadiA5Pdmb.jpg"
                        navLink="/NutritionalAdvice"
                    />
                </div>
            </div>
            {loggedIn && (
                <div className="mealPlannerSection">
                    <img className="normalBannerImage" src={foodBanner} alt="Food Banner" />
                    <h2 className="homeSectionTitle">Our Services</h2>
                    <div className="mealPlannerSectionCards">
                        <LinkCards
                            title="Meal Planner"
                            message="Plan your meals for the week with our meal planner services."
                            bgImageLink="https://as1.ftcdn.net/v2/jpg/01/72/85/96/1000_F_172859640_bRsvnGxfEr2LUmN1Mrr3XJbOfWm2Akib.jpg"
                            navLink="/planner"
                        />
                    </div>
                </div>
            )}
            <img className="normalBannerImage" src={footerImage} alt="Organic Plant Banner" />
        </div>
    );
}

export default Home;
