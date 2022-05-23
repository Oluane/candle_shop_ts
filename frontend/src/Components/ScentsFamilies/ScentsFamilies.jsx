import "./ScentsFamilies.scss";

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import apiInstance from "../../services/api/api";

const ScentsFamilies = () => {
	const [scentsFamilies, setScentsFamilies] = useState([]);

	useEffect(() => {
		apiInstance
			.get("/scents_families")
			.then(({ data }) => {
				setScentsFamilies(data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<section className="scentsSection">
			<h3 className="sectionTitle">
				<span className="titleSpan">Explore </span>
				OUR SCENTS UNIVERSES
			</h3>
			<p className="usualText alignCenter">
				Check our differents scents universes and find the one that fits you best{" "}
			</p>
			<div className="categoriesItemsWrapper">
				{scentsFamilies.length > 0 &&
					scentsFamilies.map((cat, key) => {
						return (
							<Link
								to={`/scents_families/${cat.id}`}
								className="scentsItems"
								style={{
									backgroundImage: `url("/images/scents_categories/normal_${cat.id}.jpg")`,
								}}
								key={key}
							>
								<div className="scentsNameWrapper">
									<h4 className="alignCenter scentsName">
										{cat.enName.toUpperCase()}
									</h4>
								</div>
							</Link>
						);
					})}
			</div>
		</section>
	);
};

export default ScentsFamilies;
