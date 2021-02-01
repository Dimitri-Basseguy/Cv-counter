import React from 'react';
import PropTypes from 'prop-types';
import './form.scss';

const Form = ({ link, setLink, handleClicButton }) => (
  <form className="form" action="submit">
    <p>Lien de l'annonce</p>
    <input
      className="form__input"
      type="url"
      name="inputUrl"
      id="inputUrl"
      value={link}
      required
      placeholder="url ici"
      onChange={(e) => {
        setLink(e.target.value);
      }}
    />
    <button type="submit" className="btn-grad" onClick={handleClicButton}>
      +1
    </button>
  </form>
);

Form.propTypes = {
  handleClicButton: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
  setLink: PropTypes.func.isRequired,
};

export default Form;
