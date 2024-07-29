import { GrowingVegetablesData } from "../components/GrowingVegetablesData.jsx"
import './styles/GrowingVegetables.css';

function GrowingVegetables() {
    return (
        <div>
            <div className="headingForVeg">
                <h1>Growing Your Own Vegetables</h1>
                <p>
                    <em>Information Provided by Bunnings & Almanac</em>
                </p>
            </div>
            <div className="pageInfo">
                <GrowingVegetablesData />

            </div>
        </div>
    );
}

export default GrowingVegetables;