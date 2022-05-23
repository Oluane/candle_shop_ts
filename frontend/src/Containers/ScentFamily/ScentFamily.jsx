import "./ScentFamily.scss";

import { Link, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import IconSvg from "../../Components/IconSvg/IconSvg";
import SkeletonItem from "../../Components/SkeletonItem/SkeletonItem";
import apiInstance from "../../services/api/api";
import { viewportContext } from "../../Components/ViewportProvider/ViewportProvider";

const ScentFamily = (props) => {
	const [currentFamily, setCurrentFamily] = useState(null);
	const [scents, setScents] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const { catId } = useParams();
	const { deviceWidth } = useContext(viewportContext);

	useEffect(() => {
		apiInstance
			.get("/scents_families/" + catId)
			.then(({ data }) => {
				setCurrentFamily(data[0]);
				return apiInstance.get("/scents_families/" + catId + "/scents").then(({ data }) => {
					setScents(data);
					setSelectedScent(data[0]);
					setIsLoading(false);
				});
			})
			.catch((err) => console.log(err));
	}, [catId]);

	const [scrollIndex, setScrollIndex] = useState(0);
	const [isScrollMax, setIsScrollMax] = useState(false);

	useEffect(() => {
		if (scents !== null && scents.length <= getRatio()) {
			setIsScrollMax(true);
		}
	}, [scents]);

	const getRatio = () => {
		const elementW = 300 + 41;
		const ratio = (window.innerWidth - 40) / elementW;
		return ratio;
	};

	const scrollToNextElements = (direction) => {
		let index = scrollIndex,
			ratio = getRatio();

		const elementW = 300 + 41;

		if (direction === "right") index += 1;
		else if (direction === "left") index -= 1;
		setScrollIndex(index);

		document.getElementById("scrollContainer").scrollTo({
			top: 0,
			left: elementW * Math.floor(ratio) * index,
			behavior: "smooth",
		});

		if (Math.floor(index * ratio + ratio) >= scents.length) {
			setIsScrollMax(true);
		} else {
			setIsScrollMax(false);
		}
	};

	const [selectedScent, setSelectedScent] = useState(null);

	const [candleTypes, setCandleTypes] = useState(null);

	useEffect(() => {
		apiInstance
			.get("/candles/types")
			.then(({ data }) => {
				setCandleTypes(data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="scentFamilyContainer fadeIn">
			{!isLoading ? (
				<>
					<header className="familyHeader">
						<div className="imageWrapper">
							<img
								src={`/images/scents_categories/banner_${currentFamily.id}.jpg`}
								alt={`${currentFamily.enName} family`}
							/>
						</div>

						<h1 className="sectionTitle familyTitle ">
							<span className="titleSpan">{currentFamily.enName}</span> SCENTS
						</h1>

						<div className="familyDesc usualText alignJustify">
							{currentFamily.enDesc}
						</div>
					</header>

					<section className="scentWrapper bgSecondary">
						<h4>Choose a fragrance :</h4>
						<div className="scrollWrapper">
							<div id="scrollContainer">
								{scents !== null &&
									scents.map((scent, i) => {
										return (
											<React.Fragment key={"scentItem" + i}>
												<div
													className={
														"scentItem " +
														(selectedScent.id === scent.id
															? "active"
															: "")
													}
													onClick={() => setSelectedScent(scent)}
												>
													<img
														src={`/images/scents/thumbnail_${scent.id}.jpg`}
														alt={`${scent.enName} perfume`}
														className="scentThumbnail"
													/>
													<h4 className="usualText">{scent.enName}</h4>
												</div>
												{i < scents.length - 1 && (
													<div className="separation"></div>
												)}
											</React.Fragment>
										);
									})}
							</div>
							{scrollIndex > 0 && deviceWidth > 688 && (
								<div
									className="leftArrowContainer"
									onClick={() => scrollToNextElements("left")}
								>
									<div className="directionArrow">
										<IconSvg iconName="leftArrow" />
									</div>
								</div>
							)}
							{!isScrollMax && deviceWidth > 688 && (
								<div
									className="rightArrowContainer"
									onClick={() => scrollToNextElements("right")}
								>
									<div className="directionArrow">
										<IconSvg iconName="rightArrow" />
									</div>
								</div>
							)}
						</div>

						<div className="scentInfoWrapper">
							<div className="scentDesc">
								<h3 className="sectionTitle">{selectedScent.enName}</h3>
								<p className="usualText alignJustify">{selectedScent.enDesc}</p>
							</div>
							<div className="scentComplementary">
								<ul className="mediumText complementaryList">
									<li>
										{selectedScent.isEssentialOil
											? "With essential oils"
											: "No essential oils"}
									</li>
									<li>Natural origins</li>
									<li>Artisan expertise</li>
								</ul>
								<div className="candleTypesWrapper">
									<h4>Choose a candle type & start shopping :</h4>
									{candleTypes !== null && (
										<div className="candleTypesContainer">
											{candleTypes.map((type, i) => {
												return (
													<Link
														to={{
															pathname: `/candles`,
															state: {
																preSelectedTypeId: type.id,
																preSelectedScentId:
																	selectedScent.id,
															},
														}}
														className="typeCard"
														key={i}
													>
														<div className="typeIcon">
															<IconSvg
																iconName={"candleType" + type.id}
															/>
														</div>
														<p className="usualText alignCenter">
															{type.enName}
														</p>
													</Link>
												);
											})}
										</div>
									)}
								</div>
							</div>
						</div>
					</section>
				</>
			) : (
				<>
					<header className="familyHeader">
						<SkeletonItem
							style={{ width: "100%", height: "330px", backgroundColor: "#cecece" }}
						/>
						<SkeletonItem
							style={{
								width: "200px",
								height: "38px",
								margin: "75px auto 50px auto",
								display: "block",
							}}
						/>
						<SkeletonItem
							style={{
								width: "82%",
								height: "70px",
								display: "block",
								margin: "auto",
								marginBottom: "25px",
							}}
						/>
						<SkeletonItem
							style={{ width: "100%", height: "415px", backgroundColor: "#cecece" }}
						/>
					</header>
				</>
			)}
		</div>
	);
};

export default ScentFamily;
