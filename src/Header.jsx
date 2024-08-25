import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

/* eslint-disable react/prop-types */
export default function Header({ darkMode, toggleDarkMode }) {
    return (
        <header>
            <h1>Where in the world?</h1>
            <button onClick={toggleDarkMode}>
                {darkMode ? (
                    <>
                        <FontAwesomeIcon icon={faSun} fixedWidth /> Light Mode
                    </>
                ) : (
                    <>
                        <FontAwesomeIcon icon={faMoon} fixedWidth /> Dark Mode
                    </>
                )}
            </button>
        </header>
    );
}