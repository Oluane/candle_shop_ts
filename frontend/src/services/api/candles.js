import apiInstance from "../../services/api/api";

//TODO handling errors

export const fetchCandleIdFromTypeSizeScent = (typeSize, scent) => {
  const { price, sizeEnName, typeEnName, typeId } = typeSize;
  const { enName } = scent;

  return apiInstance
    .get(`/candles/type_size/${typeSize.typeSizeId}/scent/${scent.id}`)
    .then(({ data }) => {
      const product = {
        candleId: data[0].id,
        price,
        quantity: 1,
        isAvailable: null,
        sizeEnName,
        typeEnName,
        scentsEnName: enName,
        typeId,
      };

      return { status: "success", data: { ...product } };
    })
    .catch((err) => {
      return {
        status: "failed",
        err: err,
      };
    });
};

export const fetchCandleInfosFromId = (candleId) => {
  return apiInstance(`/candles/${candleId}`)
    .then(({ data }) => {
      return { status: "success", data: { ...data[0] } };
    })
    .catch((err) => {
      return {
        status: "failed",
        err: err,
      };
    });
};
