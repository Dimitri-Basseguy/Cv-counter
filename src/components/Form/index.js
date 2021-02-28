import React from 'react';
import PropTypes from 'prop-types';
import './form.scss';

const Form = ({ link, setLink, handleClicButton }) => (
  <form className="form" action="submit" onSubmit={handleClicButton}>
    <p>Ajoutez votre annonce ici</p>
    <input
      className="form__input"
      type="text"
      name="inputTitle"
      id="inputTitle"
      value={link.title}
      required
      placeholder="Titre du poste"
      onChange={(e) => {
        setLink({ ...link, title: e.target.value });
      }}
    />
    <input
      className="form__input"
      type="url"
      name="inputUrl"
      id="inputUrl"
      value={link.url}
      required
      placeholder="Url de l'annonce"
      onChange={(e) => {
        setLink({ ...link, url: e.target.value });
      }}
    />
    <button type="submit" className="btn-grad">
      +1
    </button>
  </form>
);

Form.propTypes = {
  handleClicButton: PropTypes.func.isRequired,
  link: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  setLink: PropTypes.func.isRequired,
};

export default Form;
