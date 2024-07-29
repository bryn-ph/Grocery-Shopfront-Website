import '../pages/styles/Planner.css';
import PropTypes from 'prop-types';
// Pagination is a functional component that displays pagination buttons.
function Pagination({ totalPages, currentPage, handlePageChange }) {
    return (
        <div className="pageButtons">
            {/* // An array of size totalPages is created and mapped to buttons.
            // The spread operator (...) is used to convert the array-like object returned by Array(totalPages) into an array. */}
            {[...Array(totalPages)].map((_, index) => (
                // Each button has a key prop set to 'page-' followed by the index.
                // When a button is clicked, handlePageChange is called with the index + 1 (because index is 0-based and pages are 1-based).
                // The class of the button is 'pageButton'. If the button corresponds to the current page, the 'active' class is also added.
                <button
                    key={`page-${index}`}
                    onClick={() => handlePageChange(index + 1)}
                    className={`pageButton ${currentPage === index + 1 ? 'active' : ''}`}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
}
Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired
};
export default Pagination;