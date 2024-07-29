import "./styles/NutritionalData.css";

export function NutritionalData() {
  return (
    <div className="container">
      <div className="section">
        <h2>Overview</h2>
        <div className="overview">
          <p>
            Consuming a healthy diet throughout the life-course helps to prevent
            malnutrition in all its forms as well as a range of noncommunicable
            diseases (NCDs) and conditions. However, increased production of
            processed foods, rapid urbanization and changing lifestyles have led
            to a shift in dietary patterns. People are now consuming more foods
            high in energy, fats, free sugars and salt/sodium, and many people
            do not eat enough fruit, vegetables and other dietary fibre such as
            whole grains. The exact make-up of a diversified, balanced and healthy
            diet will vary depending on individual characteristics (e.g. age,
            gender, lifestyle and degree of physical activity), cultural context,
            locally available foods and dietary customs. However, the basic
            principles of what constitutes a healthy diet remain the same.
          </p>
        </div>
      </div>

      <div className="section">
        <h2>Practical Advice</h2>
        <div className="advice-container">
          <div>
            <br />
            <h3>Fruit and Vegetables</h3>
            <p>
              Eating at least 400 g, or five portions, of fruit and vegetables
              per day reduces the risk of NCDs and helps to ensure an adequate
              daily intake of dietary fibre.
            </p>
            <p>Fruit and vegetable intake can be improved by:</p>
            <ul>
              <li>Always including vegetables in meals</li>
              <li>Eating fresh fruit and raw vegetables as snacks</li>
              <li>Eating fresh fruit and vegetables that are in season</li>
              <li>Eating a variety of fruit and vegetables</li>
            </ul>
          </div>
          <div>
            <br />
            <h3>Fats</h3>
            <p>
              Reducing the amount of total fat intake to less than 30% of total
              energy intake helps to prevent unhealthy weight gain in the adult
              population.
            </p>
            <p>The risk of developing NCDs is lowered by:</p>
            <ul>
              <li>
                Reducing saturated fats to less than 10% of total energy intake
              </li>
              <li>
                Reducing trans-fats to less than 1% of total energy intake
              </li>
              <li>
                Replacing both saturated fats and trans-fats with unsaturated
                fats
              </li>
            </ul>
          </div>
          <div>
            <br />
            <h3>Salt, Sodium, and Potassium</h3>
            <p>
              Most people consume too much sodium through salt and not enough
              potassium. High sodium intake and insufficient potassium intake
              contribute to high blood pressure, which increases the risk of
              heart disease and stroke.
            </p>
            <br />
            <p>Salt intake can be reduced by:</p>
            <br />
            <ul>
              <li>
                Limiting the amount of salt and high-sodium condiments when
                cooking
              </li>
              <li>Not having salt or high-sodium sauces on the table</li>
              <li>Limiting the consumption of salty snacks</li>
              <li>Choosing products with lower sodium content</li>
            </ul>
            <p>
              Increasing potassium intake can mitigate the negative effects of
              elevated sodium consumption. Potassium intake can be increased by
              consuming fresh fruit and vegetables.
            </p>
          </div>
          <div>
            <br />
            <h3>Sugars</h3>
            <p>
              In both adults and children, the intake of free sugars should be
              reduced to less than 10% of total energy intake. A reduction to
              less than 5% of total energy intake would provide additional
              health benefits.
            </p>
            <br />
            <p>Sugars intake can be reduced by:</p>
            <br />
            <ul>
              <li>
                Limiting the consumption of foods and drinks containing high
                amounts of sugars
              </li>
              <li>
                Eating fresh fruit and raw vegetables as snacks instead of
                sugary snacks
              </li>
            </ul>
          </div>
        </div>
      </div>


      <div className="section">
        <h2>Extra Tips</h2>
        <div className="advice-container">
          <div>
            <h3>For Adults</h3>
            <p>A healthy diet for adults includes:</p>
            <ul>
              <li>Fruit, vegetables, legumes, nuts, and whole grains</li>
              <li>
                At least 400 g (i.e. five portions) of fruit and vegetables per
                day
              </li>
              <li>Less than 10% of total energy intake from free sugars</li>
              <li>Less than 30% of total energy intake from fats</li>
              <li>Less than 5 g of salt per day</li>
            </ul>
            <p>Advice on maintaining a healthy diet for adults:</p>
            <ul>
              <li>
                Limiting intake of processed foods high in sugars, fats, and
                salt
              </li>
              <li>
                Choosing unsaturated fats over saturated fats and trans-fats
              </li>
              <li>Reducing consumption of high-sodium foods</li>
            </ul>
          </div>

          <div>
            <h3>For Infants and Young Children</h3>
            <p>Advice on a healthy diet for infants and children includes:</p>
            <ul>
              <li>Exclusive breastfeeding during the first 6 months of life</li>
              <li>Continued breastfeeding until 2 years of age and beyond</li>
              <li>
                Complementing breast milk with a variety of nutrient-dense foods
              </li>
              <li>Avoiding adding salt and sugars to complementary foods</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
