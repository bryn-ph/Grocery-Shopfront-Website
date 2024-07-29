import { NutritionalData } from "../components/NutritionalData.jsx"
import './styles/NutritionalAdvice.css';
function NutritionalAdvice() {
    return (
        <div>
            <div className="headingForNutrition">
                <h1>Healthy Living and Nutrition</h1>
                <p>
                    <em>Information Provided by World Health Organization (WHO)</em>
                </p>
            </div>
            <div className="pageInfo">
                <NutritionalData />
            </div>
        </div>
    );
}

export default NutritionalAdvice;