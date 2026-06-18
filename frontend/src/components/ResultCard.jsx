function ResultCard({
  probability,
  riskLevel
}) {

  const getColor = () => {

    if (riskLevel === "High")
      return "bg-red-500";

    if (riskLevel === "Medium")
      return "bg-yellow-500";

    return "bg-green-500";
  };

  return (

    <div className="bg-white shadow-lg rounded-xl p-8">

      <h2 className="text-2xl font-bold mb-5">
        Prediction Result
      </h2>

      <div className="mb-5">

        <div className="flex justify-between mb-2">

          <span>Probability</span>

          <span>{probability}%</span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">

          <div
            className={`${getColor()} h-4 rounded-full`}
            style={{
              width: `${probability}%`
            }}
          />

        </div>

      </div>

      <div
        className={`
        ${getColor()}
        text-white
        p-4
        rounded-lg
        text-center
        font-bold
      `}
      >
        {riskLevel} Risk
      </div>

    </div>

  );
}

export default ResultCard;