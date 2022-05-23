import "./Candles.scss";

import React, { useEffect, useState } from "react";

import CandleSheet from "../../Components/CandleSheet/CandleSheet";
import CandleTypes from "../../Components/CandleTypes/CandleTypes";
import SkeletonItem from "../../Components/SkeletonItem/SkeletonItem";
import apiInstance from "../../services/api/api";
import { useLocation } from "react-router-dom";

const Candles = () => {
	const location = useLocation();
	const [isLoading, setIsLoading] = useState(true);
	const [types, setTypes] = useState([]);

	useEffect(() => {
		apiInstance
			.get("/candles/types")
			.then(({ data }) => {
				setTypes(data);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	const [isPreSelected, setIsPreSelected] = useState(false);
	const [selectedType, setSelectedType] = useState(null);
	const [selectedScentId, setSelectedScentId] = useState(null);

	useEffect(() => {
		if (location.state !== undefined) {
			const typeId = location.state.preSelectedTypeId;
			const scentId = location.state.preSelectedScentId;
			if (typeId && scentId) {
				setIsPreSelected(true);
				setSelectedType(typeId);
				setSelectedScentId(scentId);
			}
		}
	}, [location.state]);

	return (
		<>
			<header className="candlesHeader">
				<h1 className="sectionTitle">
					<span className="titleSpan">Customize</span> your candles{" "}
				</h1>
				<div className="pageDesc alignCenter usualText">
					Here at Candle Shop, we propose 3 differents types of candles, in several sizes
					to fit all your needs.{" "}
				</div>
			</header>
			{!isPreSelected && !selectedType ? (
				!isLoading ? (
					<CandleTypes types={types} setSelectedType={setSelectedType} />
				) : (
					<div>
						<SkeletonItem
							style={{
								width: "350px",
								height: "18px",
								display: "block",
								margin: "30px auto 75px auto ",
							}}
						/>
						<div style={{ marginBottom: "25px" }}>
							<SkeletonItem
								style={{ width: "33%", height: "170px", marginRight: "1px" }}
							/>
							<SkeletonItem
								style={{ width: "33%", height: "170px", marginRight: "1px" }}
							/>
							<SkeletonItem style={{ width: "33%", height: "170px" }} />
						</div>
					</div>
				)
			) : (
				<CandleSheet
					types={types}
					selectedType={selectedType}
					setSelectedType={setSelectedType}
					selectedScentId={selectedScentId}
					setSelectedScentId={setSelectedScentId}
				/>
			)}
		</>
	);
};

export default Candles;
