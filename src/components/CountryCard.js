import React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

const CountryCard = ({ name, capital, languages, population, flags }) => {
	return (
		<Link to={`${capital}`}>
			<div className="country" key={name}>
				<h2>{name}</h2>
				<p>
					<strong>Capital:</strong> {capital}
				</p>
				<p>
					<strong>Population:</strong>{' '}
					<NumberFormat
						value={population}
						displayType={'text'}
						thousandSeparator={true}
					/>
				</p>
				<p>
					<strong>Language(s):</strong>
					{languages?.map((lang, i) => (
						<span key={i}> {lang.name} </span>
					))}
				</p>
				<img src={flags.svg} alt={name} className="flag" />
			</div>
		</Link>
	);
};

export default CountryCard;
