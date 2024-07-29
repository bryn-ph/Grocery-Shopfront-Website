import './styles/GrowingVegetablesData.css';

export function LocationSelection() {
    return (
        <div className='sectionInfo'>
            <h2>Location Selection</h2>
            <p>The first step in establishing a thriving vegetable garden is choosing the perfect location.
                Consider the amount of sunlight your chosen spot receives throughout the day, as this will influence the types of plants you can grow.
                Aim for areas with at least six hours of sunlight daily, although partial sunlight or shade-tolerant varieties can expand your options.
                Equally crucial is the quality of the soil, as nutrient-rich earth with good water retention capabilities lays the foundation for healthy plant growth.
                Access to a nearby water source simplifies the watering process, ensuring your garden remains hydrated.</p>

        </div>
    );
}

// Component for choosing a suitable vegetable
export function VegetableSelection() {
    return (
        <div className='sectionInfo'>
            <h2>Choosing Suitable Vegetables</h2>
            <p>Choose what you (and your family) like to eat. If no one likes Brussels sprouts, don’t bother planting them! But if your kids love green beans, put more effort into growing a big crop of beans.
                Be realistic about how many vegetables your family will eat. Be careful not to overplant, as you will only stretch yourself thin by trying to take care of tons of plants! (You could always give excess veggies away to friends, family, or the local soup kitchen.)
                Consider the availability of veggies at your grocery store. Maybe you want to grow tomatillos instead of cabbage or carrots, which are readily available in your area. Also, certain veggies are so far superior when homegrown that it’s almost a shame not to consider them (we’re thinking of garden lettuce and tomatoes). Also, homegrown herbs are far less expensive than grocery-store herbs.
                Be prepared to take care of your plants throughout the growing season. Going on a summer vacation? Remember that tomatoes and zucchinis grow strongest in the middle of summer. If you’ll be gone for part of the summer, you need someone to look after the crops, or they will suffer. Or, you could just grow cool-season crops such as lettuce, kale, peas, and root veggies during the cooler months of late spring and early fall.
                Use high-quality seeds. Seed packets are less expensive than individual plants, but if seeds don’t germinate, your money—and time—are wasted. A few extra cents spent in spring for that year’s seeds will pay off in higher yields at harvest time.</p>

        </div>
    );
}
export function EasyVegetableSelection() {
    return (
        <div className='sectionInfo'>
            <h2>Easiest Vegetables To Start with</h2>
            <ul>
                <li>Tomatoes</li>
                <li>Zucchini</li>
                <li>Peppers</li>
                <li>Green Beans</li>
                <li>Lettuce</li>
                <li>Carrots</li>
                <li>Spinach</li>
            </ul>
        </div>
    );
}

// Component for selecting a garden layout
export function LayoutSelection() {
    return (
        <div className='sectionInfo'>
            <h2>Garden Layout</h2>
            <p> Designing the layout of your vegetable garden is essential for optimizing space and sunlight exposure. Sketch out a rough plan, incorporating existing structures and noting sunlight patterns across different areas. This strategic approach enables you to position each plant for optimal growth.</p>
            <p>There are several garden layouts to choose from, depending on the size and shape of your garden. Some common layouts include:</p>
            <ul>
                <li>Row cropping: Vegetables are planted in rows, with paths between each row for easy access.</li>
                <li>Intensive cropping: Vegetables are planted in blocks or squares, with no paths between the plants. This layout maximizes space and reduces water loss.</li>
                <li>Vertical gardening: Vegetables are grown on trellises or other vertical structures to save space and provide support for vining plants.</li>
                <li>Container gardening: Vegetables are grown in containers such as pots, buckets, or raised beds. This layout is ideal for small spaces or areas with poor soil.</li>
            </ul>

        </div>
    );
}

export function PlantingTechniques() {
    return (
        <div className='sectionInfo'>
            <h2>Planting Techniques</h2>
            <p>Once you have selected your vegetables and designed your garden layout, it&apos;s time to start planting! Here are some planting techniques to help you get started:</p>
            <ul>
                <li>Prepare the soil: Before planting, prepare the soil by removing weeds, rocks, and debris. Loosen the soil to a depth of 6-8 inches and add organic matter
                    such as compost or aged manure to improve soil fertility and structure.</li>
                <li>Plant at the right time: Plant vegetables at the appropriate time based on their growing season and climate. Consult a planting calendar or local gardening guide for specific planting dates in your area.</li>
                <li>Follow spacing guidelines: Plant vegetables at the recommended spacing to ensure they have enough room to grow and receive adequate sunlight and nutrients. Overcrowding can lead to poor growth and disease.</li>
                <li>Water regularly: Water newly planted vegetables thoroughly to help establish their root systems. Monitor soil moisture levels and water as needed to prevent wilting and stress.</li>
                <li>Mulch the soil: Mulch around plants with organic materials such as straw, wood chips, or leaves to conserve moisture, suppress weeds, and regulate soil temperature.</li>
                <li>Provide support: Install stakes, cages, or trellises to support vining or tall plants such as tomatoes, cucumbers, and beans. This will help prevent damage and improve air circulation.</li>
                <li>Monitor for pests and diseases: Keep an eye out for common garden pests and diseases that can damage your vegetables. Use organic pest control methods and practice good garden hygiene to prevent infestations.</li>
                <li>Harvest regularly: Harvest vegetables when they are ripe to encourage continuous production and prevent overripening. Use sharp pruners or scissors to avoid damaging the plant.</li>
            </ul>
        </div>
    );
}

export function Composting() {
    return (
        <div className='sectionInfo'>
            <h2>How Composting Works</h2>
            <p>Once you have selected your vegetables and designed your garden layout, it&apos;s time to start planting! Here are some planting techniques to help you get started:</p>
            Composting is a way of recycling your organic waste – such as vegetable scraps and leaves – by mixing them in a compost bin and leaving them to break down naturally. The end product is a brown-black substance that looks like soil and is rich in nitrogen.

            It&apos;s a great way to improve your soil, as it helps build structure and retain moisture and provides nutrients for all types of soils. Local councils often run free composting workshops, which are good for getting started.

            Composting tips
            If your compost bin smells, add more dry material such as newspapers or leaf litter.
            Avoid meat scraps, as they attract vermin.
            To accelerate the composting process, add air by turning it over with a fork.
            For those who are space-poor but still want to take advantage of the fertiliser available to you in your food scraps, try a worm farm or bokashi bucket.
        </div>
    );
}

export function Conclusion() {
    return (
        <div className='sectionInfo'>
            <h2>Conclusion</h2>
            <p>By following these steps diligently,
                you can cultivate a vibrant vegetable garden that yields bountiful harvests throughout the year.
                For more insights and expert tips,
                continue exploring our comprehensive gardening resources or Check out tips and advice on gardening from
                <a href="https://www.bunnings.com.au/diy-advice/garden" target="_blank"> Bunnings</a> and
                <a href="https://www.almanac.com/vegetable-growing-guide" target="_blank"> Almanac</a>.
                </p>
        </div>
    );
}

// Main component that uses the above components
export function GrowingVegetablesData() {
    return (
        <div>

            <LocationSelection />
            <VegetableSelection />
            <EasyVegetableSelection />
            <LayoutSelection />
            <PlantingTechniques />
            <Composting />
            <Conclusion />

        </div>
    );
}